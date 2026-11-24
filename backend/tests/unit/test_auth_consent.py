"""Unit tests for consent capture on patient registration (US-024.1, AC-058)."""

import secrets
from datetime import UTC, datetime
from uuid import uuid4

from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import PatientConsent, User
from app.routers.auth import CONSENT_TEXT_VERSION


def _email() -> str:
    return f"consent-{uuid4().hex[:12]}@example.com"


def _payload(**overrides: object) -> dict:
    payload = {
        "fullName": "Ada Lovelace",
        "email": _email(),
        "password": secrets.token_urlsafe(16),
        "consentAccepted": True,
    }
    payload.update(overrides)
    return payload


def test_ac058_consent_is_stored_with_the_new_account(
    client: TestClient, db_session: Session
) -> None:
    """When the account is created, the consent is stored with it: one patient_consents
    row, naming the new user, recording that consent was given."""
    before = datetime.now(UTC)
    payload = _payload()

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 200, response.text
    user_id = response.json()["user"]["id"]
    user = db_session.get(User, user_id)
    assert user is not None

    consent = db_session.scalars(
        select(PatientConsent).where(PatientConsent.user_id == user_id)
    ).first()
    assert consent is not None
    assert consent.consent_given is True
    assert consent.consent_date >= before.replace(tzinfo=consent.consent_date.tzinfo)


def test_ac058_consent_date_records_when_consent_was_given(
    client: TestClient, db_session: Session
) -> None:
    """The consent's date is captured, not left blank or defaulted far in the past."""
    before = datetime.now(UTC)
    payload = _payload()

    response = client.post("/auth/register", json=payload)
    after = datetime.now(UTC)

    assert response.status_code == 200, response.text
    user_id = response.json()["user"]["id"]
    consent = db_session.scalars(
        select(PatientConsent).where(PatientConsent.user_id == user_id)
    ).first()
    assert consent is not None
    consent_date = consent.consent_date
    if consent_date.tzinfo is None:
        consent_date = consent_date.replace(tzinfo=UTC)
    assert before <= consent_date <= after


def test_ac058_consent_names_the_text_version_shown(
    client: TestClient, db_session: Session
) -> None:
    """Which version of the consent statement the patient accepted is recorded too, so a
    later change to the statement's text does not retroactively change what was agreed."""
    payload = _payload()

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 200, response.text
    user_id = response.json()["user"]["id"]
    consent = db_session.scalars(
        select(PatientConsent).where(PatientConsent.user_id == user_id)
    ).first()
    assert consent is not None
    assert consent.consent_text_version == CONSENT_TEXT_VERSION


def test_ac058_each_registration_gets_its_own_consent_row(
    client: TestClient, db_session: Session
) -> None:
    """Two different patients registering end up with two distinct consent records, each
    naming its own account."""
    first = client.post("/auth/register", json=_payload())
    second = client.post("/auth/register", json=_payload())

    assert first.status_code == 200, first.text
    assert second.status_code == 200, second.text
    first_id = first.json()["user"]["id"]
    second_id = second.json()["user"]["id"]
    assert first_id != second_id

    first_consent = db_session.scalars(
        select(PatientConsent).where(PatientConsent.user_id == first_id)
    ).first()
    second_consent = db_session.scalars(
        select(PatientConsent).where(PatientConsent.user_id == second_id)
    ).first()
    assert first_consent is not None
    assert second_consent is not None
    assert first_consent.id != second_consent.id
