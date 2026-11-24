"""SQLAlchemy models: one class per entity in the approved data model."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), nullable=False)
    full_name: Mapped[str] = mapped_column(String(200), nullable=False)


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


class PatientConsent(Base):
    """A patient's acceptance of the data-handling consent statement (US-001)."""

    __tablename__ = "patient_consents"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, nullable=False)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    consent_given: Mapped[bool] = mapped_column(Boolean, nullable=False)
    consent_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    consent_text_version: Mapped[str] = mapped_column(String(50), nullable=False)
