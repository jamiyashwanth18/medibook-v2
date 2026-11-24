"""Admin provisioning of doctor accounts (US-003).

An administrator creates a doctor account with name, email, credentials and one or
more specializations (AC-009); the account cannot be saved without at least one
specialization (AC-010). The doctor's first-login password is set by the server, never
supplied by the admin, so the API never accepts a password for this endpoint.
"""

from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import (
    ADMIN_ROLE,
    DOCTOR_ROLE,
    FIRST_LOGIN_PASSWORD,
    create_user,
    current_user,
    find_user,
)
from app.database import get_db
from app.errors import (
    ADMIN_ACCESS_REQUIRED,
    EMAIL_ALREADY_REGISTERED,
    NOT_AUTHENTICATED,
    SPECIALIZATION_REQUIRED,
)
from app.models import DoctorProfile, DoctorSpecialization, Specialization, User
from app.schemas import DoctorCreateRequest, DoctorRead, ErrorResponse

router = APIRouter(prefix="/admin", tags=["Admin"])


def _require_admin(user: User) -> None:
    """AC-009: provisioning a doctor account is an administrator-only action."""
    if user.role != ADMIN_ROLE:
        raise ADMIN_ACCESS_REQUIRED()


def _distinct_specialization_names(raw: list[str]) -> list[str]:
    """Trims each name, drops blanks, and keeps the first occurrence of a repeat. AC-010:
    the caller must then be left with at least one name, or the account cannot be saved."""
    names: list[str] = []
    for name in raw:
        trimmed = name.strip()
        if trimmed and trimmed not in names:
            names.append(trimmed)
    return names


def _get_or_create_specialization(session: Session, name: str) -> Specialization:
    """Reuses the specialization row this name already names, so the same specialization
    assigned to two doctors is one row, not two."""
    existing = session.scalars(
        select(Specialization).where(Specialization.name == name)
    ).first()
    if existing is not None:
        return existing
    specialization = Specialization(id=str(uuid4()), name=name)
    session.add(specialization)
    session.flush()
    return specialization


@router.post(
    "/doctors",
    response_model=DoctorRead,
    status_code=status.HTTP_201_CREATED,
    responses={
        NOT_AUTHENTICATED.status: {
            "model": ErrorResponse,
            "description": NOT_AUTHENTICATED.message,
        },
        ADMIN_ACCESS_REQUIRED.status: {
            "model": ErrorResponse,
            "description": ADMIN_ACCESS_REQUIRED.message,
        },
        SPECIALIZATION_REQUIRED.status: {
            "model": ErrorResponse,
            "description": SPECIALIZATION_REQUIRED.message,
        },
        EMAIL_ALREADY_REGISTERED.status: {
            "model": ErrorResponse,
            "description": EMAIL_ALREADY_REGISTERED.message,
        },
    },
)
def create_doctor(
    body: DoctorCreateRequest,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[Session, Depends(get_db)],
) -> DoctorRead:
    _require_admin(user)

    # AC-010: checked before anything is written, so an incomplete submission never
    # leaves a partial account behind.
    names = _distinct_specialization_names(body.specializations)
    if not names:
        raise SPECIALIZATION_REQUIRED()

    full_name = body.full_name.strip()
    email = body.email.strip()
    credentials = body.credentials.strip()

    if find_user(session, email) is not None:
        raise EMAIL_ALREADY_REGISTERED()

    # AC-009: the server sets the first-login password; the admin never supplies one.
    doctor_user = create_user(
        session,
        email=email,
        password=FIRST_LOGIN_PASSWORD,
        role=DOCTOR_ROLE,
        full_name=full_name,
    )
    profile = DoctorProfile(id=str(uuid4()), user_id=doctor_user.id, credentials=credentials)
    session.add(profile)
    session.flush()

    for name in names:
        specialization = _get_or_create_specialization(session, name)
        session.add(
            DoctorSpecialization(
                doctor_profile_id=profile.id, specialization_id=specialization.id
            )
        )
    session.commit()

    return DoctorRead(
        id=doctor_user.id,
        full_name=doctor_user.full_name,
        email=doctor_user.email,
        credentials=profile.credentials,
        specializations=names,
    )
