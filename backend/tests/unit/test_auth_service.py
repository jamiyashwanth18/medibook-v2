"""Unit tests for POST /auth/login, POST /auth/logout and session security (US-002)."""

import secrets
from datetime import UTC, datetime, timedelta
from uuid import uuid4

from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import SESSION_INACTIVITY_TIMEOUT, USER_ROLE, ensure_user
from app.models import UserSession


def _email() -> str:
    return f"login-{uuid4().hex[:12]}@example.com"


def _make_user(db_session: Session, **overrides: object) -> dict:
    email = overrides.get("email", _email())
    password = overrides.get("password", secrets.token_urlsafe(16))
    role = overrides.get("role", USER_ROLE)
    ensure_user(db_session, email=email, password=password, role=role)
    db_session.commit()
    return {"email": email, "password": password, "role": role}


def _login(client: TestClient, user: dict) -> dict:
    response = client.post(
        "/auth/login", json={"email": user["email"], "password": user["password"]}
    )
    assert response.status_code == 200, response.text
    return response.json()


def test_ac005_grants_a_token_and_role_on_correct_credentials(
    client: TestClient, db_session: Session
) -> None:
    user = _make_user(db_session)

    body = _login(client, user)

    assert body["token"]
    assert body["user"]["role"] == user["role"]

    # AC-005: the token actually grants access to a protected page.
    me = client.get("/auth/me", headers={"Authorization": f"Bearer {body['token']}"})
    assert me.status_code == 200, me.text
    assert me.json()["id"] == body["user"]["id"]


def test_ac006_rejects_wrong_password_without_revealing_field(
    client: TestClient, db_session: Session
) -> None:
    user = _make_user(db_session)

    wrong_password = client.post(
        "/auth/login", json={"email": user["email"], "password": "not-the-password"}
    )
    wrong_email = client.post("/auth/login", json={"email": _email(), "password": user["password"]})

    # Both failures look identical: nothing here lets a caller learn which field was
    # wrong (AC-006, NFR-003).
    assert wrong_password.status_code == 401
    assert wrong_email.status_code == 401
    assert wrong_password.json() == wrong_email.json()
    assert wrong_password.json()["detail"]["code"] == "INVALID_CREDENTIALS"


def test_ac006_wrong_password_grants_no_access(client: TestClient, db_session: Session) -> None:
    user = _make_user(db_session)

    response = client.post(
        "/auth/login", json={"email": user["email"], "password": "not-the-password"}
    )

    assert response.status_code == 401
    assert "token" not in response.json()


def test_ac007_logout_ends_the_session(client: TestClient, db_session: Session) -> None:
    user = _make_user(db_session)
    body = _login(client, user)
    headers = {"Authorization": f"Bearer {body['token']}"}

    assert client.get("/auth/me", headers=headers).status_code == 200

    logout = client.post("/auth/logout", headers=headers)
    assert logout.status_code == 204

    # AC-007: the ended session no longer reaches a protected page; signing in again
    # is the only way back.
    after_logout = client.get("/auth/me", headers=headers)
    assert after_logout.status_code == 401
    assert after_logout.json()["detail"]["code"] == "NOT_AUTHENTICATED"


def test_ac007_logout_without_a_session_is_refused(client: TestClient) -> None:
    response = client.post("/auth/logout", headers={"Authorization": "Bearer not-a-real-token"})

    assert response.status_code == 401
    assert response.json()["detail"]["code"] == "NOT_AUTHENTICATED"


def test_ac008_an_idle_session_past_the_timeout_requires_sign_in_again(
    client: TestClient, db_session: Session
) -> None:
    user = _make_user(db_session)
    body = _login(client, user)
    headers = {"Authorization": f"Bearer {body['token']}"}
    assert client.get("/auth/me", headers=headers).status_code == 200

    # Simulate inactivity past the configured timeout by backdating the session's last
    # activity, the only thing a real clock would otherwise take care of.
    row = db_session.scalars(
        select(UserSession).where(UserSession.user_id == body["user"]["id"])
    ).first()
    assert row is not None
    row.last_seen_at = datetime.now(UTC) - SESSION_INACTIVITY_TIMEOUT - timedelta(seconds=1)
    db_session.flush()

    # AC-008: the expired session is refused like any other, and must sign in again.
    response = client.get("/auth/me", headers=headers)
    assert response.status_code == 401
    assert response.json()["detail"]["code"] == "NOT_AUTHENTICATED"

    second_login = _login(client, user)
    new_headers = {"Authorization": f"Bearer {second_login['token']}"}
    assert client.get("/auth/me", headers=new_headers).status_code == 200


def test_ac008_activity_within_the_timeout_keeps_the_session_alive(
    client: TestClient, db_session: Session
) -> None:
    user = _make_user(db_session)
    body = _login(client, user)
    headers = {"Authorization": f"Bearer {body['token']}"}

    row = db_session.scalars(
        select(UserSession).where(UserSession.user_id == body["user"]["id"])
    ).first()
    assert row is not None
    row.last_seen_at = datetime.now(UTC) - (SESSION_INACTIVITY_TIMEOUT / 2)
    db_session.flush()

    response = client.get("/auth/me", headers=headers)
    assert response.status_code == 200


def test_nfr001_the_session_token_is_not_stored_in_the_clear(
    client: TestClient, db_session: Session
) -> None:
    user = _make_user(db_session)
    body = _login(client, user)

    row = db_session.scalars(
        select(UserSession).where(UserSession.user_id == body["user"]["id"])
    ).first()
    assert row is not None
    assert row.token_hash != body["token"]
    assert body["token"] not in row.token_hash
