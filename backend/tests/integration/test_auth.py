"""Integration tests for US-001 and US-002: registration, sign-in and session security.

US-001 covers POST /auth/register: account creation with consent, blocked registration
without consent, duplicate-email rejection, and that stored passwords are hashed
(AC-001..AC-004).

US-002 covers POST /auth/login and POST /auth/logout: successful sign-in and
role-specific dashboard access, incorrect-password and unregistered-email denial with a
generic message, sign-out ending a session, deactivating a doctor ending their active
session, and session expiry after inactivity (AC-005..AC-008).
"""

import secrets
import time
from uuid import uuid4

from fastapi.testclient import TestClient
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session


def test_tc001_patient_registers_with_consent_and_is_signed_in(client: TestClient) -> None:
    email = "alice.morgan@example.com"
    password = secrets.token_urlsafe(16)

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Alice Morgan",
            "email": email,
            "password": password,
            "consentAccepted": True,
        },
    )

    assert response.status_code == 200, response.text
    body = response.json()
    assert body["token"]
    assert body["user"]["fullName"] == "Alice Morgan"

    me = client.get("/auth/me", headers={"Authorization": f"Bearer {body['token']}"})
    assert me.status_code == 200, me.text
    assert me.json()["email"] == email


def test_tc003_registration_blocked_when_consent_not_given(client: TestClient) -> None:
    email = "carla.diaz@example.com"
    password = secrets.token_urlsafe(16)

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Carla Diaz",
            "email": email,
            "password": password,
            "consentAccepted": False,
        },
    )

    assert response.status_code == 400, response.text
    assert "consent" in response.text.lower()

    # No account was created: the same email cannot sign in afterwards.
    login = client.post("/auth/login", json={"email": email, "password": password})
    assert login.status_code == 401, login.text


def test_tc005_registration_rejected_for_already_registered_email(client: TestClient) -> None:
    email = "alice.morgan@example.com"

    first = client.post(
        "/auth/register",
        json={
            "fullName": "Alice Morgan",
            "email": email,
            "password": secrets.token_urlsafe(16),
            "consentAccepted": True,
        },
    )
    assert first.status_code == 200, first.text

    second = client.post(
        "/auth/register",
        json={
            "fullName": "Alice Morgan",
            "email": email,
            "password": secrets.token_urlsafe(16),
            "consentAccepted": True,
        },
    )

    assert second.status_code == 409, second.text
    assert "already" in second.text.lower()


def test_tc007_password_is_stored_only_as_a_hash(client: TestClient, db_session: Session) -> None:
    email = "elena.frost@example.com"
    password = secrets.token_urlsafe(16)

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Elena Frost",
            "email": email,
            "password": password,
            "consentAccepted": True,
        },
    )
    assert response.status_code == 200, response.text
    assert response.json()["token"]

    # Inspect the stored record directly in the data store, outside the API, without
    # assuming a table or column name: find the users table and its password column.
    inspector = inspect(db_session.get_bind())
    user_tables = [t for t in inspector.get_table_names() if "user" in t.lower()]
    assert user_tables, "no users table found in the schema"
    user_table = user_tables[0]
    columns = [c["name"] for c in inspector.get_columns(user_table)]
    email_columns = [c for c in columns if "email" in c.lower()]
    password_columns = [c for c in columns if "password" in c.lower() or "hash" in c.lower()]
    assert email_columns, f"no email column found on {user_table}"
    assert password_columns, f"no password column found on {user_table}"

    row = db_session.execute(
        text(f'SELECT "{password_columns[0]}" FROM "{user_table}" WHERE "{email_columns[0]}" = :email'),
        {"email": email},
    ).first()
    assert row is not None, f"no stored record found for {email}"
    stored_password = row[0]

    assert stored_password != password
    assert password not in stored_password

    login = client.post("/auth/login", json={"email": email, "password": password})
    assert login.status_code == 200, login.text
    assert login.json()["token"]


# --- US-002: email/password sign-in and session security -------------------------


def _register_patient(client: TestClient) -> tuple[str, str]:
    """Create a fresh patient account through the API and return its (email, password)."""
    email = f"patient-{uuid4().hex[:12]}@example.com"
    password = secrets.token_urlsafe(16)

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Test Patient",
            "email": email,
            "password": password,
            "consentAccepted": True,
        },
    )
    assert response.status_code == 200, response.text
    return email, password


def _make_doctor(db_session: Session) -> tuple[str, str, str]:
    """Create a fresh doctor account and return its (email, password, id).

    No endpoint in the API spec creates a doctor account, so this uses the same
    `ensure_user` helper the test kit's own `admin_client`/`auth_client` fixtures use for
    admin and normal-user accounts (see backend/tests/conftest.py).
    """
    from app.auth import DOCTOR_ROLE, ensure_user
    from app.models import User

    email = f"doctor-{uuid4().hex[:12]}@example.com"
    password = secrets.token_urlsafe(16)
    ensure_user(db_session, email=email, password=password, role=DOCTOR_ROLE)
    user = db_session.query(User).filter(User.email == email).first()
    assert user is not None, "ensure_user did not create the doctor account"
    return email, password, str(user.id)


def test_tc030_valid_sign_in_grants_patient_access_to_own_dashboard_data(
    client: TestClient,
) -> None:
    email, password = _register_patient(client)

    login = client.post("/auth/login", json={"email": email, "password": password})

    assert login.status_code == 200, login.text
    token = login.json()["token"]
    assert token

    dashboard = client.get("/me/appointments", headers={"Authorization": f"Bearer {token}"})

    assert dashboard.status_code == 200, dashboard.text


def test_tc032_valid_sign_in_grants_doctor_access_to_doctor_dashboard(
    client: TestClient, db_session: Session
) -> None:
    email, password, _doctor_id = _make_doctor(db_session)

    login = client.post("/auth/login", json={"email": email, "password": password})

    assert login.status_code == 200, login.text
    token = login.json()["token"]
    assert token

    dashboard = client.get(
        "/doctor/appointments", headers={"Authorization": f"Bearer {token}"}
    )

    assert dashboard.status_code == 200, dashboard.text


def test_tc033_wrong_password_is_refused_with_a_generic_message(client: TestClient) -> None:
    email, _password = _register_patient(client)

    login = client.post("/auth/login", json={"email": email, "password": "WrongPass!1"})

    assert login.status_code == 401, login.text
    # A message naming both fields together ("incorrect email or password") is the
    # generic form the case wants; it must not single out one field as the culprit.
    message = str(login.json()).lower()
    assert "the password" not in message
    assert "the email" not in message
    assert "your password" not in message
    assert "your email" not in message
    assert "password is" not in message
    assert "email is" not in message


def test_tc034_unregistered_email_gets_the_same_generic_failure_as_a_wrong_password(
    client: TestClient,
) -> None:
    email, _password = _register_patient(client)

    wrong_password = client.post(
        "/auth/login", json={"email": email, "password": "WrongPass!1"}
    )
    unknown_email = client.post(
        "/auth/login",
        json={"email": f"unknown-{uuid4().hex[:12]}@example.com", "password": "AnyPass#1"},
    )

    assert wrong_password.status_code == 401, wrong_password.text
    assert unknown_email.status_code == 401, unknown_email.text
    assert unknown_email.json() == wrong_password.json()


def test_tc036_missing_password_is_refused_with_the_same_generic_message(
    client: TestClient,
) -> None:
    email, _password = _register_patient(client)

    reference = client.post("/auth/login", json={"email": email, "password": "WrongPass!1"})
    missing_password = client.post("/auth/login", json={"email": email, "password": ""})

    assert missing_password.status_code in (400, 401), missing_password.text
    assert reference.status_code == 401, reference.text
    assert missing_password.json() == reference.json()


def test_tc037_signing_out_revokes_the_session_so_a_protected_page_can_no_longer_be_reached(
    client: TestClient,
) -> None:
    email, password = _register_patient(client)

    login = client.post("/auth/login", json={"email": email, "password": password})
    assert login.status_code == 200, login.text
    token = login.json()["token"]
    headers = {"Authorization": f"Bearer {token}"}

    logout = client.post("/auth/logout", headers=headers)
    assert logout.status_code == 200, logout.text

    after_logout = client.get("/me/appointments", headers=headers)

    assert after_logout.status_code == 401, after_logout.text


def test_tc039_deactivating_a_doctor_account_revokes_that_doctor_active_session(
    client: TestClient, db_session: Session, admin_client: TestClient
) -> None:
    doctor_email, doctor_password, doctor_id = _make_doctor(db_session)

    doctor_login = client.post(
        "/auth/login", json={"email": doctor_email, "password": doctor_password}
    )
    assert doctor_login.status_code == 200, doctor_login.text
    doctor_token = doctor_login.json()["token"]

    deactivate = admin_client.patch(
        f"/admin/doctors/{doctor_id}", json={"active": False}
    )
    assert deactivate.status_code == 200, deactivate.text

    after_deactivation = client.get(
        "/doctor/appointments", headers={"Authorization": f"Bearer {doctor_token}"}
    )

    assert after_deactivation.status_code == 401, after_deactivation.text


def test_tc040_session_inactive_beyond_the_configured_expiry_period_is_rejected(
    client: TestClient,
) -> None:
    email, password = _register_patient(client)

    login = client.post("/auth/login", json={"email": email, "password": password})
    assert login.status_code == 200, login.text
    token = login.json()["token"]
    headers = {"Authorization": f"Bearer {token}"}

    # The configured inactivity-expiry for this environment is 15 minutes (test
    # precondition); wait past it with no requests in between, as the case requires.
    time.sleep(16 * 60)

    after_expiry = client.get("/me/appointments", headers=headers)

    assert after_expiry.status_code == 401, after_expiry.text
