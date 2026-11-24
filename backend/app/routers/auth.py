"""Patient self-registration (US-001).

Creates a patient account with a hashed password, records the data-handling consent
the patient ticked, and signs the new patient in the same way `/auth/login` does.
"""

from datetime import UTC, datetime
from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.auth import PATIENT_ROLE, create_user, find_user, issue_token
from app.database import get_db
from app.errors import CONSENT_REQUIRED, EMAIL_ALREADY_REGISTERED
from app.models import PatientConsent
from app.schemas import ErrorResponse, RegisteredUser, RegisterRequest, RegisterResponse

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
    session.commit()

    # AC-001: the new patient is signed in immediately, the same way /auth/login does.
    return RegisterResponse(
        token=issue_token(user),
        user=RegisteredUser(id=user.id, role=user.role, full_name=user.full_name),
    )
