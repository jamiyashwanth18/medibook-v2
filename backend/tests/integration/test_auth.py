"""Integration tests for US-001: patient self-registration with consent.

Covers POST /auth/register: account creation with consent, blocked registration without
consent, duplicate-email rejection, and that stored passwords are hashed (AC-001..AC-004).
"""

import secrets

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
