"""Integration tests for US-003: admin provisions doctor accounts.

Covers POST /admin/doctors: an admin provisioning a doctor with name, email,
credentials and specializations with a first-login placeholder password
(AC-009), the save being blocked when no specialization is assigned
(AC-010), and confirmation that the public self-registration flow cannot be
used to create a doctor or admin account (AC-011).
"""

import secrets

from fastapi.testclient import TestClient


def test_tc023_admin_creates_doctor_account_with_all_required_fields(
    admin_client: TestClient, client: TestClient
) -> None:
    email = "meera.nair@clinic.com"

    response = admin_client.post(
        "/admin/doctors",
        json={
            "name": "Dr. Meera Nair",
            "email": email,
            "credentials": "MBBS, MD (Cardiology)",
            "specializations": ["Cardiology"],
        },
    )

    assert response.status_code == 201, response.text

    login = client.post(
        "/auth/login",
        json={"email": email, "password": "<set-at-first-login>"},
    )

    assert login.status_code == 200, login.text
    assert login.json()["token"]


def test_tc025_doctor_account_cannot_be_saved_without_a_specialization(
    admin_client: TestClient, client: TestClient
) -> None:
    email = "sana.khan@clinic.com"

    response = admin_client.post(
        "/admin/doctors",
        json={
            "name": "Dr. Sana Khan",
            "email": email,
            "credentials": "MBBS",
            "specializations": [],
        },
    )

    assert response.status_code == 400, response.text
    assert "specialization" in response.text.lower()

    login = client.post(
        "/auth/login",
        json={"email": email, "password": "<set-at-first-login>"},
    )

    assert login.status_code != 200, login.text


def test_tc027_self_registration_ignores_attempts_to_self_assign_doctor_role(
    client: TestClient,
) -> None:
    email = "priya.s@example.com"
    password = secrets.token_urlsafe(16)

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Priya S",
            "email": email,
            "password": password,
            "consentAccepted": True,
            "role": "doctor",
        },
    )

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["user"]["role"] != "doctor"
    token = body["token"]
    assert token

    availability = client.post(
        "/doctor/availability",
        json={"weeklySlots": [{"day": "Monday", "start": "09:00", "end": "12:00"}]},
        headers={"Authorization": f"Bearer {token}"},
    )

    assert availability.status_code == 403, availability.text


def test_tc029_self_registration_ignores_attempts_to_self_assign_admin_role(
    client: TestClient,
) -> None:
    email = "admin.wannabe@example.com"
    password = secrets.token_urlsafe(16)

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Alex Wannabe",
            "email": email,
            "password": password,
            "consentAccepted": True,
            "role": "admin",
        },
    )

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["user"]["role"] != "admin"
    token = body["token"]
    assert token

    create_doctor = client.post(
        "/admin/doctors",
        json={
            "name": "Dr. Fake",
            "email": "fake.doc@clinic.com",
            "credentials": "MBBS",
            "specializations": ["Cardiology"],
        },
        headers={"Authorization": f"Bearer {token}"},
    )

    assert create_doctor.status_code == 403, create_doctor.text
