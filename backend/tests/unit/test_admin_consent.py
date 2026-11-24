"""Unit tests for GET /admin/patients/{id}/consent (US-024.2, AC-059)."""

import secrets
from uuid import uuid4

from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import DOCTOR_ROLE, ensure_user
from app.models import User


def _register_patient(client: TestClient) -> dict:
    payload = {
        "fullName": "Grace Hopper",
        "email": f"patient-{uuid4().hex[:12]}@example.com",
        "password": secrets.token_urlsafe(16),
        "consentAccepted": True,
    }
    response = client.post("/auth/register", json=payload)
    assert response.status_code == 200, response.text
    return response.json()["user"]


def test_ac059_admin_sees_that_consent_was_given_and_when(
    admin_client: TestClient, client: TestClient
) -> None:
    patient = _register_patient(client)

    response = admin_client.get(f"/admin/patients/{patient['id']}/consent")

    assert response.status_code == 200, response.text
    body = response.json()
    assert body["patientId"] == patient["id"]
    assert body["consentGiven"] is True
    assert body["consentDate"]


def test_ac059_requires_authentication(client: TestClient) -> None:
    patient = _register_patient(client)

    response = client.get(f"/admin/patients/{patient['id']}/consent")

    assert response.status_code == 401
    assert response.json()["detail"]["code"] == "NOT_AUTHENTICATED"


def test_ac059_rejects_a_non_admin_caller(auth_client: TestClient, client: TestClient) -> None:
    patient = _register_patient(client)

    response = auth_client.get(f"/admin/patients/{patient['id']}/consent")

    assert response.status_code == 403
    assert response.json()["detail"]["code"] == "ADMIN_ACCESS_REQUIRED"


def test_ac059_unknown_patient_id_is_not_found(admin_client: TestClient) -> None:
    response = admin_client.get(f"/admin/patients/{uuid4()}/consent")

    assert response.status_code == 404
    assert response.json()["detail"]["code"] == "PATIENT_NOT_FOUND"


def test_ac059_a_non_patient_account_is_not_found(
    admin_client: TestClient, db_session: Session
) -> None:
    """A doctor account has no patient consent to view; the id simply does not name a
    patient, the same error as an id that names no account at all."""
    email = f"doctor-{uuid4().hex[:12]}@example.com"
    password = secrets.token_urlsafe(16)
    ensure_user(db_session, email=email, password=password, role=DOCTOR_ROLE)
    db_session.commit()

    doctor = db_session.scalars(select(User).where(User.email == email)).first()
    assert doctor is not None

    response = admin_client.get(f"/admin/patients/{doctor.id}/consent")

    assert response.status_code == 404
    assert response.json()["detail"]["code"] == "PATIENT_NOT_FOUND"
