"""Unit tests for POST /admin/doctors (US-003)."""

from uuid import uuid4

from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import DOCTOR_ROLE, FIRST_LOGIN_PASSWORD
from app.models import DoctorProfile, DoctorSpecialization, Specialization, User


def _email() -> str:
    return f"doctor-{uuid4().hex[:12]}@example.com"


def _payload(**overrides: object) -> dict:
    payload = {
        "fullName": "Dr. Grace Hopper",
        "email": _email(),
        "credentials": "MD, PhD",
        "specializations": ["Cardiology", "Pediatrics"],
    }
    payload.update(overrides)
    return payload


def test_ac009_admin_creates_a_doctor_account(
    admin_client: TestClient, db_session: Session
) -> None:
    payload = _payload()

    response = admin_client.post("/admin/doctors", json=payload)

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["fullName"] == payload["fullName"]
    assert body["email"] == payload["email"]
    assert body["credentials"] == payload["credentials"]
    assert set(body["specializations"]) == set(payload["specializations"])

    user = db_session.scalars(select(User).where(User.email == payload["email"])).first()
    assert user is not None
    assert user.role == DOCTOR_ROLE
    assert user.full_name == payload["fullName"]
    assert str(user.id) == body["id"]

    profile = db_session.scalars(
        select(DoctorProfile).where(DoctorProfile.user_id == user.id)
    ).first()
    assert profile is not None
    assert profile.credentials == payload["credentials"]

    links = db_session.scalars(
        select(DoctorSpecialization).where(DoctorSpecialization.doctor_profile_id == profile.id)
    ).all()
    assert len(links) == 2


def test_ac009_doctor_can_sign_in_with_the_first_login_credentials(
    admin_client: TestClient, client: TestClient
) -> None:
    payload = _payload()
    created = admin_client.post("/admin/doctors", json=payload)
    assert created.status_code == 201, created.text

    login = client.post(
        "/auth/login", json={"email": payload["email"], "password": FIRST_LOGIN_PASSWORD}
    )

    assert login.status_code == 200, login.text
    assert login.json()["user"]["role"] == DOCTOR_ROLE


def test_ac009_requires_authentication(client: TestClient) -> None:
    response = client.post("/admin/doctors", json=_payload())

    assert response.status_code == 401
    assert response.json()["detail"]["code"] == "NOT_AUTHENTICATED"


def test_ac009_rejects_a_non_admin_caller(auth_client: TestClient, db_session: Session) -> None:
    payload = _payload()

    response = auth_client.post("/admin/doctors", json=payload)

    assert response.status_code == 403
    assert response.json()["detail"]["code"] == "ADMIN_ACCESS_REQUIRED"
    assert db_session.scalars(select(User).where(User.email == payload["email"])).first() is None


def test_ac009_rejects_a_duplicate_email(admin_client: TestClient) -> None:
    payload = _payload()
    first = admin_client.post("/admin/doctors", json=payload)
    assert first.status_code == 201, first.text

    second = admin_client.post("/admin/doctors", json=_payload(email=payload["email"]))

    assert second.status_code == 409
    assert second.json()["detail"]["code"] == "EMAIL_ALREADY_REGISTERED"


def test_ac010_rejects_an_empty_specialization_list(
    admin_client: TestClient, db_session: Session
) -> None:
    payload = _payload(specializations=[])

    response = admin_client.post("/admin/doctors", json=payload)

    assert response.status_code == 400
    assert response.json()["detail"]["code"] == "SPECIALIZATION_REQUIRED"
    assert db_session.scalars(select(User).where(User.email == payload["email"])).first() is None


def test_ac010_rejects_blank_specialization_names(admin_client: TestClient) -> None:
    payload = _payload(specializations=["   ", ""])

    response = admin_client.post("/admin/doctors", json=payload)

    assert response.status_code == 400
    assert response.json()["detail"]["code"] == "SPECIALIZATION_REQUIRED"


def test_ac009_reuses_an_existing_specialization_row(
    admin_client: TestClient, db_session: Session
) -> None:
    first = admin_client.post("/admin/doctors", json=_payload(specializations=["Neurology"]))
    assert first.status_code == 201, first.text

    second = admin_client.post("/admin/doctors", json=_payload(specializations=["Neurology"]))
    assert second.status_code == 201, second.text

    rows = db_session.scalars(
        select(Specialization).where(Specialization.name == "Neurology")
    ).all()
    assert len(rows) == 1
