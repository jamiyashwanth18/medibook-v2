"""Integration tests for US-022: health data encrypted in transit and at rest.

This story adds no endpoint of its own (NFR-006): it covers the connection the API is
reached over (AC-054) and the storage of consultation records and prescriptions already
created through other stories' endpoints (AC-055). Because of that, the tests below that
need a completed appointment or a signed-in doctor cannot build them from an endpoint this
story's spec documents; they are built the same way `test_auth.py`'s own fixtures build a
doctor account that has no provisioning endpoint either: through `ensure_user` and direct,
name-discovered access to the schema the migrations built, never by assuming a column name
this story has no contract for.
"""

import secrets
from datetime import UTC, datetime

from fastapi.testclient import TestClient
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

from app.auth import DOCTOR_ROLE, ensure_user
from app.main import app
from app.models import User

# --- shared setup helpers ---------------------------------------------------------


def _register_patient(client: TestClient, email: str) -> tuple[str, str]:
    """Register the patient the case names and return (id, password)."""
    password = secrets.token_urlsafe(16)
    response = client.post(
        "/auth/register",
        json={
            "fullName": "Alice",
            "email": email,
            "password": password,
            "consentAccepted": True,
        },
    )
    assert response.status_code == 200, response.text
    return response.json()["user"]["id"], password


def _signed_in_doctor(db_session: Session, email: str) -> tuple[TestClient, str]:
    """A doctor account signed in, the same way `test_auth.py`'s `_make_doctor` does it:
    no endpoint in this story's spec provisions a doctor."""
    password = secrets.token_urlsafe(16)
    ensure_user(db_session, email=email, password=password, role=DOCTOR_ROLE)
    doctor_client = TestClient(app)
    login = doctor_client.post("/auth/login", json={"email": email, "password": password})
    assert login.status_code == 200, login.text
    doctor_client.headers["Authorization"] = f"Bearer {login.json()['token']}"
    user = db_session.query(User).filter(User.email == email).first()
    assert user is not None, "ensure_user did not create the doctor account"
    return doctor_client, str(user.id)


def _status_value_for(column: dict) -> str:
    """Pick a 'completed'-looking value for a status column, using its enum labels
    when the column is a native enum, since this story has no contract naming one."""
    enum_values = getattr(column["type"], "enums", None)
    if enum_values:
        for value in enum_values:
            if "complet" in value.lower():
                return value
        return enum_values[0]
    return "completed"


def _generic_value_for(column: dict) -> object:
    """A safe filler for a NOT NULL column with no default, this story has no contract
    for, picked from its reflected type rather than a name this story does not own."""
    try:
        python_type = column["type"].python_type
    except (NotImplementedError, AttributeError):
        return "test"
    if python_type is bool:
        return False
    if python_type is int:
        return 0
    if python_type is float:
        return 0.0
    if python_type.__name__ in ("datetime", "date"):
        return datetime.now(UTC)
    return "test"


def _completed_appointment(db_session: Session, patient_id: str, doctor_id: str) -> str:
    """Write a completed appointment straight into the table the migrations built,
    discovered by name the way `test_tc007` discovers the users table: this story's
    endpoints list is empty, so no booking or completion endpoint is its contract."""
    inspector = inspect(db_session.get_bind())
    tables = [t for t in inspector.get_table_names() if "appointment" in t.lower()]
    assert tables, "no appointments table found in the schema"
    table = tables[0]
    by_name = {c["name"]: c for c in inspector.get_columns(table)}

    def _find(*keywords: str) -> str | None:
        for name in by_name:
            lower = name.lower()
            if all(keyword in lower for keyword in keywords):
                return name
        return None

    patient_col = _find("patient")
    doctor_col = _find("doctor")
    status_col = _find("status")
    assert patient_col, f"no patient column found on {table}"
    assert doctor_col, f"no doctor column found on {table}"

    values: dict[str, object] = {patient_col: patient_id, doctor_col: doctor_id}
    if status_col:
        values[status_col] = _status_value_for(by_name[status_col])

    for name, column in by_name.items():
        if name in values or name == "id" or column.get("nullable", True):
            continue
        if column.get("default") is not None:
            continue
        values[name] = _generic_value_for(column)

    assignments = ", ".join(f'"{name}"' for name in values)
    placeholders = ", ".join(f":{name}" for name in values)
    row = db_session.execute(
        text(f'INSERT INTO "{table}" ({assignments}) VALUES ({placeholders}) RETURNING "id"'),
        values,
    ).first()
    assert row is not None, f"insert into {table} did not return an id"
    return str(row[0])


def _raw_row(db_session: Session, table_keyword: str, record_id: str) -> dict[str, object]:
    """The raw stored row for `record_id`, found the way `test_tc007` finds the users
    table: by a keyword in its name, never by a name this story does not own."""
    inspector = inspect(db_session.get_bind())
    tables = [t for t in inspector.get_table_names() if table_keyword in t.lower()]
    assert tables, f"no table with '{table_keyword}' found in the schema"
    table = tables[0]
    row = (
        db_session.execute(text(f'SELECT * FROM "{table}" WHERE "id" = :id'), {"id": record_id})
        .mappings()
        .first()
    )
    assert row is not None, f"no stored record found in {table} for id {record_id}"
    return dict(row)


# --- AC-054: transport security ---------------------------------------------------


def test_tc017_sign_in_succeeds_only_over_an_encrypted_https_connection(
    client: TestClient,
) -> None:
    _patient_id, password = _register_patient(client, "alice@example.com")

    # `client` is the app under test, with `get_db` already pointed at this test's
    # session; a second client against the same app, reached with an https:// base
    # URL, is the closest this in-process ASGI transport can get to "the service's
    # HTTPS endpoint" the case asks for (see risk: no real socket or certificate is
    # involved here).
    https_client = TestClient(app, base_url="https://testserver")

    response = https_client.post(
        "/auth/login", json={"email": "alice@example.com", "password": password}
    )

    assert response.status_code == 200, response.text
    assert response.json()["token"]
    assert response.request.url.scheme == "https"


def test_tc018_plain_http_connection_to_the_api_is_refused(client: TestClient) -> None:
    _patient_id, password = _register_patient(client, "alice@example.com")

    # Best effort within this test kit: an in-process ASGI TestClient has no real
    # socket to refuse, so this asks the app the same question over an explicit
    # http:// base URL and expects the sign-in to not complete successfully (see
    # risk: this cannot observe a genuine connection-level refusal).
    http_client = TestClient(app, base_url="http://testserver")

    response = http_client.post(
        "/auth/login", json={"email": "alice@example.com", "password": password}
    )

    assert response.status_code != 200, response.text
    body = response.json() if response.content else {}
    assert "token" not in body


# --- AC-055: encryption at rest ---------------------------------------------------


def test_tc020_consultation_record_diagnosis_and_notes_are_stored_encrypted_at_rest(
    client: TestClient, db_session: Session
) -> None:
    patient_id, _password = _register_patient(client, "alice@example.com")
    doctor_client, doctor_id = _signed_in_doctor(db_session, "drrao@example.com")
    appointment_id = _completed_appointment(db_session, patient_id, doctor_id)

    create = doctor_client.post(
        f"/appointments/{appointment_id}/consultation",
        json={"diagnosis": "Hypertension", "notes": "Patient advised to reduce salt intake"},
    )
    assert create.status_code == 201, create.text
    record = create.json()
    assert record["diagnosis"] == "Hypertension"
    assert record["notes"] == "Patient advised to reduce salt intake"
    record_id = record["id"]

    read_back = doctor_client.get(f"/consultation-records/{record_id}")
    assert read_back.status_code == 200, read_back.text
    assert read_back.json()["diagnosis"] == "Hypertension"
    assert read_back.json()["notes"] == "Patient advised to reduce salt intake"

    raw = _raw_row(db_session, "consultation", record_id)
    diagnosis_columns = [k for k in raw if "diagnos" in k.lower()]
    notes_columns = [k for k in raw if "note" in k.lower()]
    assert diagnosis_columns, "no diagnosis column found on the consultation record table"
    assert notes_columns, "no notes column found on the consultation record table"
    stored_diagnosis = str(raw[diagnosis_columns[0]])
    stored_notes = str(raw[notes_columns[0]])

    assert stored_diagnosis != "Hypertension"
    assert "Hypertension" not in stored_diagnosis
    assert stored_notes != "Patient advised to reduce salt intake"
    assert "Patient advised to reduce salt intake" not in stored_notes


def test_tc021_prescription_details_are_stored_encrypted_at_rest(
    client: TestClient, db_session: Session
) -> None:
    patient_id, _password = _register_patient(client, "alice@example.com")
    doctor_client, doctor_id = _signed_in_doctor(db_session, "drrao@example.com")
    appointment_id = _completed_appointment(db_session, patient_id, doctor_id)

    create_record = doctor_client.post(
        f"/appointments/{appointment_id}/consultation",
        json={"diagnosis": "Hypertension", "notes": "Patient advised to reduce salt intake"},
    )
    assert create_record.status_code == 201, create_record.text
    record_id = create_record.json()["id"]

    create_prescription = doctor_client.post(
        f"/consultation-records/{record_id}/prescriptions",
        json={
            "medicine": "Amlodipine",
            "dosage": "5mg",
            "frequency": "Once daily",
            "duration": "30 days",
        },
    )
    assert create_prescription.status_code == 201, create_prescription.text
    prescription = create_prescription.json()
    assert prescription["medicine"] == "Amlodipine"
    assert prescription["dosage"] == "5mg"
    assert prescription["frequency"] == "Once daily"
    assert prescription["duration"] == "30 days"
    prescription_id = prescription["id"]

    read_back = doctor_client.get(f"/consultation-records/{record_id}")
    assert read_back.status_code == 200, read_back.text
    prescriptions = read_back.json().get("prescriptions", [])
    assert any(
        p.get("medicine") == "Amlodipine"
        and p.get("dosage") == "5mg"
        and p.get("frequency") == "Once daily"
        and p.get("duration") == "30 days"
        for p in prescriptions
    ), prescriptions

    raw = _raw_row(db_session, "prescription", prescription_id)
    medicine_columns = [k for k in raw if "medicine" in k.lower()]
    dosage_columns = [k for k in raw if "dosage" in k.lower()]
    frequency_columns = [k for k in raw if "frequency" in k.lower()]
    duration_columns = [k for k in raw if "duration" in k.lower()]
    assert medicine_columns, "no medicine column found on the prescription table"
    assert dosage_columns, "no dosage column found on the prescription table"
    assert frequency_columns, "no frequency column found on the prescription table"
    assert duration_columns, "no duration column found on the prescription table"

    stored_medicine = str(raw[medicine_columns[0]])
    stored_dosage = str(raw[dosage_columns[0]])
    stored_frequency = str(raw[frequency_columns[0]])
    stored_duration = str(raw[duration_columns[0]])

    assert stored_medicine != "Amlodipine"
    assert "Amlodipine" not in stored_medicine
    assert stored_dosage != "5mg"
    assert "5mg" not in stored_dosage
    assert stored_frequency != "Once daily"
    assert "Once daily" not in stored_frequency
    assert stored_duration != "30 days"
    assert "30 days" not in stored_duration
