"""SQLAlchemy models: one class per entity in the approved data model."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.encryption import EncryptedString


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, nullable=False)
    # Not encrypted (unlike full_name below): auth.find_user looks a user up by this
    # column's exact value, and Fernet ciphertext is randomised, so the same email would
    # never compare equal to itself across two writes -- sign-in would break.
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), nullable=False)
    # AC-055: a person's name is sensitive personal data, encrypted at rest. It is never
    # looked up by value, only ever read back for an already-identified user, so the
    # randomised ciphertext EncryptedString produces costs nothing here.
    full_name: Mapped[str] = mapped_column(EncryptedString, nullable=False)


class UserSession(Base):
    """An opaque session token issued at sign-in (US-002).

    The token itself never touches the database: only its hash does (`app.auth._hash_token`),
    the same reasoning as a password hash but a fast one, since the token is already a
    high-entropy secret and every authenticated request looks one up. `revoked_at` is set
    both when the user signs out (AC-007) and when a request finds the session has sat
    idle past the configured timeout (AC-008); either way, the token stops working.
    """

    __tablename__ = "sessions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, nullable=False)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    token_hash: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    last_seen_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class Specialization(Base):
    """A medical specialization a doctor can be assigned (US-003)."""

    __tablename__ = "specializations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)


class DoctorProfile(Base):
    """The doctor-specific details of a user whose role is "doctor" (US-003): the name,
    email and password hash live on `users` like every other account; `credentials` and
    the specialization links live here."""

    __tablename__ = "doctor_profiles"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, nullable=False)
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), nullable=False, unique=True
    )
    # AC-055: a doctor's qualifications are sensitive personal data, encrypted at rest
    # the same way as User.full_name above.
    credentials: Mapped[str] = mapped_column(EncryptedString, nullable=False)


class DoctorSpecialization(Base):
    """One specialization assigned to one doctor profile (US-003, AC-010): a doctor
    account must have at least one row here to have been saved at all."""

    __tablename__ = "doctor_specializations"

    doctor_profile_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("doctor_profiles.id"), primary_key=True, nullable=False
    )
    specialization_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("specializations.id"), primary_key=True, nullable=False
    )


class PatientConsent(Base):
    """A patient's acceptance of the data-handling consent statement (US-001)."""

    __tablename__ = "patient_consents"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, nullable=False)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    consent_given: Mapped[bool] = mapped_column(Boolean, nullable=False)
    consent_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    consent_text_version: Mapped[str] = mapped_column(String(50), nullable=False)
