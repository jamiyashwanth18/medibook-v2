"""Unit tests for POST /auth/register (US-001)."""

import secrets
from uuid import uuid4

from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import PATIENT_ROLE, verify_password
from app.models import PatientConsent, User
from app.routers.auth import CONSENT_TEXT_VERSION


def _email() -> str:
    return f"register-{uuid4().hex[:12]}@example.com"


def _payload(**overrides: object) -> dict:
    payload = {
        "fullName": "Ada Lovelace",
        "email": _email(),
        "password": secrets.token_urlsafe(16),
        "consentAccepted": True,
    }
    payload.update(overrides)
    return payload


def test_ac001_registers_a_patient_and_signs_them_in(
    client: TestClient, db_session: Session
) -> None:
    payload = _payload()

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 200, response.text
    body = response.json()
    assert body["token"]
    assert body["user"]["fullName"] == payload["fullName"]
    assert body["user"]["role"] == PATIENT_ROLE

    user = db_session.scalars(select(User).where(User.email == payload["email"])).first()
    assert user is not None
    assert user.role == PATIENT_ROLE
    assert user.full_name == payload["fullName"]
    assert str(user.id) == body["user"]["id"]

    # The token actually signs the new patient in.
    me = client.get("/auth/me", headers={"Authorization": f"Bearer {body['token']}"})
    assert me.status_code == 200
    assert me.json()["id"] == body["user"]["id"]


def test_ac001_records_the_consent_given(client: TestClient, db_session: Session) -> None:
    payload = _payload()

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 200, response.text
    user_id = response.json()["user"]["id"]
    consent = db_session.scalars(
        select(PatientConsent).where(PatientConsent.user_id == user_id)
    ).first()
    assert consent is not None
    assert consent.consent_given is True
    assert consent.consent_text_version == CONSENT_TEXT_VERSION
    assert consent.consent_date is not None


def test_ac002_blocks_registration_without_consent(client: TestClient) -> None:
    payload = _payload(consentAccepted=False)

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 400
    assert response.json()["detail"]["code"] == "CONSENT_REQUIRED"


def test_ac002_without_consent_no_user_is_created(client: TestClient, db_session: Session) -> None:
    payload = _payload(consentAccepted=False)

    client.post("/auth/register", json=payload)

    assert db_session.scalars(select(User).where(User.email == payload["email"])).first() is None


def test_ac003_rejects_a_duplicate_email(client: TestClient) -> None:
    payload = _payload()
    first = client.post("/auth/register", json=payload)
    assert first.status_code == 200, first.text

    second = client.post("/auth/register", json=_payload(email=payload["email"]))

    assert second.status_code == 409
    assert second.json()["detail"]["code"] == "EMAIL_ALREADY_REGISTERED"


def test_ac004_the_password_is_stored_only_as_a_hash(
    client: TestClient, db_session: Session
) -> None:
    payload = _payload()

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 200, response.text
    user = db_session.scalars(select(User).where(User.email == payload["email"])).first()
    assert user is not None
    assert user.password_hash != payload["password"]
    assert payload["password"] not in user.password_hash
    assert verify_password(payload["password"], user.password_hash)
