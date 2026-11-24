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


class PatientConsent(Base):
    """A patient's acceptance of the data-handling consent statement (US-001)."""

    __tablename__ = "patient_consents"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, nullable=False)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    consent_given: Mapped[bool] = mapped_column(Boolean, nullable=False)
    consent_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    consent_text_version: Mapped[str] = mapped_column(String(50), nullable=False)
