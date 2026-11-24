"""Unit tests for app/encryption.py (US-022.1, AC-055)."""

import secrets
from uuid import uuid4

import pytest
from cryptography.fernet import Fernet
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.encryption import decrypt_value, encrypt_value
from app.models import DoctorProfile, User


def test_ac055_round_trips_a_value_through_encryption() -> None:
    plaintext = f"Dr. {uuid4().hex}"

    ciphertext = encrypt_value(plaintext)

    assert ciphertext != plaintext
    assert decrypt_value(ciphertext) == plaintext


def test_ac055_ciphertext_does_not_contain_the_plaintext() -> None:
    plaintext = "Jordan Alexis Patient"

    ciphertext = encrypt_value(plaintext)

    assert plaintext not in ciphertext
    for word in plaintext.split():
        assert word not in ciphertext


def test_ac055_none_passes_through_both_directions_unchanged() -> None:
    assert encrypt_value(None) is None
    assert decrypt_value(None) is None


def test_ac055_rejects_ciphertext_from_a_different_key() -> None:
    other_key_ciphertext = Fernet(Fernet.generate_key()).encrypt(b"secret").decode()

    with pytest.raises(ValueError):
        decrypt_value(other_key_ciphertext)


def test_ac055_a_users_full_name_is_encrypted_at_rest(db_session: Session) -> None:
    full_name = f"Patient {uuid4().hex[:8]}"
    user = User(
        id=str(uuid4()),
        email=f"{uuid4().hex[:12]}@example.com",
        password_hash=secrets.token_urlsafe(16),
        role="user",
        full_name=full_name,
    )
    db_session.add(user)
    db_session.flush()

    # Bypasses the ORM's column type, so this sees exactly what the database stored.
    raw_value = db_session.execute(
        text("SELECT full_name FROM users WHERE id = :id"), {"id": user.id}
    ).scalar_one()
    assert raw_value != full_name
    assert full_name not in raw_value

    db_session.expire(user)
    assert user.full_name == full_name


def test_ac055_a_doctor_profiles_credentials_are_encrypted_at_rest(db_session: Session) -> None:
    credentials = "MBBS, MD (Cardiology)"
    user = User(
        id=str(uuid4()),
        email=f"{uuid4().hex[:12]}@example.com",
        password_hash=secrets.token_urlsafe(16),
        role="doctor",
        full_name="Dr. Encrypted",
    )
    db_session.add(user)
    db_session.flush()
    profile = DoctorProfile(id=str(uuid4()), user_id=user.id, credentials=credentials)
    db_session.add(profile)
    db_session.flush()

    raw_value = db_session.execute(
        text("SELECT credentials FROM doctor_profiles WHERE id = :id"), {"id": profile.id}
    ).scalar_one()
    assert raw_value != credentials
    assert credentials not in raw_value

    db_session.expire(profile)
    assert profile.credentials == credentials
