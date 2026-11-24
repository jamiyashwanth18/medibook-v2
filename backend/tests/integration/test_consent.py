"""Integration tests for US-024: patient consent is captured at registration and the
admin consent-status endpoint shows whether and when a patient gave it.

Covers POST /auth/register storing consent with its date (AC-058) and
GET /admin/patients/{id}/consent letting an admin see the stored consent status,
denying it to a non-admin caller and failing cleanly for an unknown patient id
(AC-059).
"""

import secrets
from datetime import date

from fastapi.testclient import TestClient


def test_tc009_consent_stored_with_date_when_patient_registers_and_accepts_consent(
    client: TestClient, admin_client: TestClient
) -> None:
    email = "priya.sharma@example.com"
    password = secrets.token_urlsafe(16)

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Priya Sharma",
            "email": email,
            "password": password,
            "consentAccepted": True,
        },
    )

    assert response.status_code == 200, response.text
    body = response.json()
    assert body["token"]
    patient_id = body["user"]["id"]

    consent = admin_client.get(f"/admin/patients/{patient_id}/consent")

    assert consent.status_code == 200, consent.text
    consent_body = consent.json()
    assert consent_body["consentGiven"] is True
    assert consent_body["consentDate"] == date.today().isoformat()


def test_tc010_registration_rejected_when_consent_is_missing(client: TestClient) -> None:
    email = "raj.verma@example.com"
    password = secrets.token_urlsafe(16)

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Raj Verma",
            "email": email,
            "password": password,
            "consentAccepted": False,
        },
    )

    assert response.status_code == 400, response.text
    assert "consent" in response.text.lower()

    # No account was created: the same email cannot sign in afterwards.
    login = client.post("/auth/login", json={"email": email, "password": password})
    assert login.status_code == 401, login.text


def test_tc013_admin_views_consent_status_for_a_patient_who_gave_consent(
    client: TestClient, admin_client: TestClient
) -> None:
    register = client.post(
        "/auth/register",
        json={
            "fullName": "Priya Sharma",
            "email": "priya.sharma@example.com",
            "password": secrets.token_urlsafe(16),
            "consentAccepted": True,
        },
    )
    assert register.status_code == 200, register.text
    patient_id = register.json()["user"]["id"]

    response = admin_client.get(f"/admin/patients/{patient_id}/consent")

    assert response.status_code == 200, response.text
    body = response.json()
    assert body["consentGiven"] is True
    assert body["consentDate"] == date.today().isoformat()


def test_tc014_admin_views_consent_status_for_a_patient_that_does_not_exist(
    admin_client: TestClient,
) -> None:
    response = admin_client.get("/admin/patients/non-existent-id-999/consent")

    assert response.status_code == 404, response.text


def test_tc016_non_admin_caller_denied_access_to_patient_consent_status(
    client: TestClient,
) -> None:
    patient = client.post(
        "/auth/register",
        json={
            "fullName": "Priya Sharma",
            "email": "priya.sharma@example.com",
            "password": secrets.token_urlsafe(16),
            "consentAccepted": True,
        },
    )
    assert patient.status_code == 200, patient.text
    patient_id = patient.json()["user"]["id"]

    other_password = secrets.token_urlsafe(16)
    other = client.post(
        "/auth/register",
        json={
            "fullName": "Neha Kapoor",
            "email": "neha.kapoor@example.com",
            "password": other_password,
            "consentAccepted": True,
        },
    )
    assert other.status_code == 200, other.text

    login = client.post(
        "/auth/login",
        json={"email": "neha.kapoor@example.com", "password": other_password},
    )
    assert login.status_code == 200, login.text
    token = login.json()["token"]

    response = client.get(
        f"/admin/patients/{patient_id}/consent",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403, response.text
