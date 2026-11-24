"""Sign-in: an email and a password in, an opaque session token out.

Part of the scaffold's test kit, so the seed script, the signed-in test client and the
smoke check have a real login from the first commit. The token is opaque (US-002): it
names nothing on its own, the sessions table says who it belongs to and whether it is
still good, so signing out (AC-007) or letting it sit idle past SESSION_INACTIVITY_TIMEOUT
(AC-008) revokes it there, and everywhere else that checks `Authorization: Bearer <token>`
simply stops accepting it.

The frontend and the API are on different origins once deployed, so the token travels in
the response body and comes back as a header, never as a cookie.
"""

import os
import secrets
from datetime import UTC, datetime, timedelta
from hashlib import sha256
from typing import Annotated, Any
from uuid import uuid4

import bcrypt
from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api_model import ApiModel
from app.database import get_db
from app.errors import NOT_AUTHENTICATED
from app.models import User, UserSession

ADMIN_ROLE = "admin"
USER_ROLE = "user"
PATIENT_ROLE = "patient"
DOCTOR_ROLE = "doctor"

# AC-009: every doctor account an administrator provisions starts with this password,
# a sentinel the product spec defines, not a secret generated per account. It is hashed
# like any other password; the doctor is expected to change it on first sign-in.
FIRST_LOGIN_PASSWORD = "<set-at-first-login>"

# AC-008, NFR-002: a session that has sat idle this long must sign in again to reach any
# protected page. Configurable so ops can tune it without a code change; 30 minutes is the
# default everywhere the setting is not set (local runs, tests).
SESSION_INACTIVITY_TIMEOUT = timedelta(minutes=int(os.getenv("SESSION_INACTIVITY_MINUTES", "30")))

bearer_scheme = HTTPBearer(auto_error=False)
# The users table may come from the approved data model, so its key is read, not assumed:
# an integer key is made by the database, a text key here.
_KEY_COLUMN = User.__mapper__.primary_key[0]
_KEY = User.__mapper__.get_property_by_column(_KEY_COLUMN).key

router = APIRouter(prefix="/auth", tags=["Auth"])


class CurrentUser(ApiModel):
    id: str
    email: str
    role: str


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode(), hashed.encode())
    except ValueError:  # not a bcrypt hash
        return False


def find_user(session: Session, email: str) -> User | None:
    return session.scalars(select(User).where(User.email == email)).first()


def create_user(session: Session, *, email: str, password: str, role: str, full_name: str) -> User:
    """Create and flush a new user row. The caller checks the email is free first."""
    values: dict[str, Any] = {
        "email": email,
        "password_hash": hash_password(password),
        "role": role,
        "full_name": full_name,
    }
    if _KEY_COLUMN.type.python_type is str:
        values[_KEY] = str(uuid4())
    user = User(**values)
    session.add(user)
    session.flush()
    return user


def ensure_user(
    session: Session, *, email: str, password: str, role: str, full_name: str | None = None
) -> bool:
    """Create the user unless one with this email exists. True when it was created."""
    if find_user(session, email) is not None:
        return False
    create_user(
        session,
        email=email,
        password=password,
        role=role,
        full_name=full_name or email.split("@")[0],
    )
    return True


def _hash_token(token: str) -> str:
    """The token is already a high-entropy secret, so a fast hash (not bcrypt, whose whole
    point is to be slow) is enough: a leaked database row cannot be replayed as a bearer
    token, and every authenticated request still only pays for one sha256."""
    return sha256(token.encode()).hexdigest()


def _aware(moment: datetime) -> datetime:
    """SQLite forgets a column's timezone; PostgreSQL does not. Either way, treat a naive
    stamp read back from the database as UTC, since every stamp is written as UTC."""
    return moment if moment.tzinfo is not None else moment.replace(tzinfo=UTC)


def issue_token(session: Session, user: User) -> str:
    """Open a new session for `user` and return its opaque token (AC-005)."""
    token = secrets.token_urlsafe(32)
    now = datetime.now(UTC)
    session.add(
        UserSession(
            id=str(uuid4()),
            user_id=str(getattr(user, _KEY)),
            token_hash=_hash_token(token),
            created_at=now,
            last_seen_at=now,
        )
    )
    session.flush()
    return token


def _find_active_session(session: Session, token: str) -> UserSession | None:
    """The session the token names, if it exists, was never ended, and has not sat idle
    past SESSION_INACTIVITY_TIMEOUT (AC-008). A session found idle is revoked on the spot,
    so it cannot be mistaken for active again later."""
    row = session.scalars(
        select(UserSession).where(UserSession.token_hash == _hash_token(token))
    ).first()
    if row is None or row.revoked_at is not None:
        return None
    now = datetime.now(UTC)
    if now - _aware(row.last_seen_at) > SESSION_INACTIVITY_TIMEOUT:
        row.revoked_at = now
        session.flush()
        return None
    row.last_seen_at = now
    session.flush()
    return row


def revoke_session(session: Session, active: UserSession) -> None:
    """End this session now (AC-007): a later request bearing the same token is refused
    the same way an expired or unknown one is."""
    active.revoked_at = datetime.now(UTC)
    session.flush()


def current_token(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
) -> str:
    """This request's bearer token, or NOT_AUTHENTICATED when it did not send one."""
    if credentials is None:
        raise NOT_AUTHENTICATED()
    return credentials.credentials


def current_session(
    token: Annotated[str, Depends(current_token)],
    session: Annotated[Session, Depends(get_db)],
) -> UserSession:
    """The active session this request's bearer token names (AC-008): looked up, checked
    against the inactivity timeout, and its `last_seen_at` refreshed. Add
    `Depends(current_session)` where the session row itself is needed (logout); most
    routes want `current_user` instead."""
    active = _find_active_session(session, token)
    if active is None:
        raise NOT_AUTHENTICATED()
    return active


def current_user(
    active: Annotated[UserSession, Depends(current_session)],
    session: Annotated[Session, Depends(get_db)],
) -> User:
    """The signed-in user. Add `Depends(current_user)` to any route that needs one."""
    user = session.get(User, active.user_id)
    if user is None:
        raise NOT_AUTHENTICATED()
    return user


@router.get("/me")
def me(user: Annotated[User, Depends(current_user)]) -> CurrentUser:
    return CurrentUser(id=str(getattr(user, _KEY)), email=user.email, role=user.role)
