"""Admin view of a patient's data-handling consent status (US-024).

The consent itself is captured and stored at registration (AC-058, see
app/routers/auth.py); this endpoint lets an administrator read it back, so they can
see whether and when a given patient consented (AC-059).
"""

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import ADMIN_ROLE, PATIENT_ROLE, current_user
from app.database import get_db
from app.errors import ADMIN_ACCESS_REQUIRED, NOT_AUTHENTICATED, PATIENT_NOT_FOUND
from app.models import PatientConsent, User
from app.schemas import ErrorResponse, PatientConsentRead

router = APIRouter(prefix="/admin", tags=["Admin"])


def _require_admin(user: User) -> None:
    """AC-059: viewing a patient's consent status is an administrator-only action."""
    if user.role != ADMIN_ROLE:
        raise ADMIN_ACCESS_REQUIRED()


@router.get(
    "/patients/{id}/consent",
    response_model=PatientConsentRead,
    responses={
        NOT_AUTHENTICATED.status: {
            "model": ErrorResponse,
            "description": NOT_AUTHENTICATED.message,
        },
        ADMIN_ACCESS_REQUIRED.status: {
            "model": ErrorResponse,
            "description": ADMIN_ACCESS_REQUIRED.message,
        },
        PATIENT_NOT_FOUND.status: {
            "model": ErrorResponse,
            "description": PATIENT_NOT_FOUND.message,
        },
    },
)
def get_patient_consent(
    id: str,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[Session, Depends(get_db)],
) -> PatientConsentRead:
    """AC-059: an administrator sees whether and when the named patient's data-handling
    consent was given. `id` must name a patient account that has one (AC-058 guarantees
    every patient registered through /auth/register does)."""
    _require_admin(user)

    patient = session.get(User, id)
    if patient is None or patient.role != PATIENT_ROLE:
        raise PATIENT_NOT_FOUND()

    consent = session.scalars(
        select(PatientConsent).where(PatientConsent.user_id == patient.id)
    ).first()
    if consent is None:
        raise PATIENT_NOT_FOUND()

    return PatientConsentRead(
        patient_id=patient.id,
        consent_given=consent.consent_given,
        consent_date=consent.consent_date,
    )
