"""Patient self-registration (US-001) and email/password sign-in (US-002).

Registration creates a patient account with a hashed password, records the
data-handling consent the patient ticked, and signs the new patient in the same way
`/auth/login` does. Login verifies the hashed password and hands back an opaque
session token; logout revokes the session behind the token that called it.
"""

from datetime import UTC, datetime
from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.auth import (
    PATIENT_ROLE,
    create_user,
    current_session,
    find_user,
    issue_token,
    revoke_session,
    verify_password,
)
from app.database import get_db
from app.errors import (
    CONSENT_REQUIRED,
    EMAIL_ALREADY_REGISTERED,
    INVALID_CREDENTIALS,
    NOT_AUTHENTICATED,
)
from app.models import PatientConsent, UserSession
from app.schemas import (
    ErrorResponse,
    LoginRequest,
    LoginResponse,
    RegisteredUser,
    RegisterRequest,
    RegisterResponse,
    SessionUser,
)

# The version of the consent statement shown on the registration page. Bump this
# when the statement's text changes, so each consent record names the text the
# patient actually saw.
CONSENT_TEXT_VERSION = "v1"

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_200_OK,
    responses={
        CONSENT_REQUIRED.status: {
            "model": ErrorResponse,
            "description": CONSENT_REQUIRED.message,
        },
        EMAIL_ALREADY_REGISTERED.status: {
            "model": ErrorResponse,
            "description": EMAIL_ALREADY_REGISTERED.message,
        },
    },
)
def register(
    body: RegisterRequest, session: Annotated[Session, Depends(get_db)]
) -> RegisterResponse:
    # AC-002: consent is checked first, so a registration that is also missing
    # other things is still told, first, that consent is what is blocking it.
    if not body.consent_accepted:
        raise CONSENT_REQUIRED()

    full_name = body.full_name.strip()
    email = body.email.strip()

    # AC-003: duplicate emails are rejected before any row is written.
    if find_user(session, email) is not None:
        raise EMAIL_ALREADY_REGISTERED()

    # AC-001, AC-004: the user is created with a hashed password (app.auth.create_user
    # hashes it; the plain password never reaches the database).
    user = create_user(
        session, email=email, password=body.password, role=PATIENT_ROLE, full_name=full_name
    )
    session.add(
        PatientConsent(
            id=str(uuid4()),
            user_id=user.id,
            consent_given=True,
            consent_date=datetime.now(UTC),
            consent_text_version=CONSENT_TEXT_VERSION,
        )
    )
    # AC-001: the new patient is signed in immediately, the same way /auth/login does.
    token = issue_token(session, user)
    session.commit()

    return RegisterResponse(
        token=token,
        user=RegisteredUser(id=user.id, role=user.role, full_name=user.full_name),
    )


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    responses={
        INVALID_CREDENTIALS.status: {
            "model": ErrorResponse,
            "description": INVALID_CREDENTIALS.message,
        },
    },
)
def login(body: LoginRequest, session: Annotated[Session, Depends(get_db)]) -> LoginResponse:
    """AC-005, AC-006, NFR-001, NFR-003: one generic failure for a wrong email or a wrong
    password, so a failed sign-in never says which field was wrong."""
    user = find_user(session, body.email.strip())
    if user is None or not verify_password(body.password, user.password_hash):
        raise INVALID_CREDENTIALS()

    token = issue_token(session, user)
    session.commit()
    return LoginResponse(token=token, user=SessionUser(id=user.id, role=user.role))


@router.post(
    "/logout",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        NOT_AUTHENTICATED.status: {
            "model": ErrorResponse,
            "description": NOT_AUTHENTICATED.message,
        },
    },
)
def logout(
    active: Annotated[UserSession, Depends(current_session)],
    session: Annotated[Session, Depends(get_db)],
) -> None:
    """AC-007, NFR-002: ends the session named by this request's bearer token, so a later
    request with the same token is refused like any other invalid one."""
    revoke_session(session, active)
    session.commit()
