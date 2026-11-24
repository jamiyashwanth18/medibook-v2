"""Unit tests for US-022.2: TLS enforced for client and database connections (AC-054)."""

import secrets

import pytest
from fastapi.testclient import TestClient

from app.database import _connect_args
from app.main import app


def _postgres_url(query: str = "") -> str:
    """A syntactically valid DATABASE_URL with a password made at run time, never typed."""
    return f"postgresql+psycopg://app:{secrets.token_urlsafe(12)}@db:5432/app{query}"


def test_ac054_every_response_carries_an_hsts_header() -> None:
    client = TestClient(app)

    response = client.get("/health")

    assert response.status_code == 200
    header = response.headers["strict-transport-security"]
    assert "max-age=" in header
    assert "includesubdomains" in header.lower()


def test_ac054_redirects_a_request_a_proxy_forwarded_over_plain_http() -> None:
    client = TestClient(app)

    response = client.get("/health", headers={"X-Forwarded-Proto": "http"}, follow_redirects=False)

    assert response.status_code == 307
    assert response.headers["location"].startswith("https://")


def test_ac054_leaves_a_request_already_forwarded_as_https_alone() -> None:
    client = TestClient(app)

    response = client.get("/health", headers={"X-Forwarded-Proto": "https"}, follow_redirects=False)

    assert response.status_code == 200


def test_ac054_leaves_a_request_with_no_forwarded_proto_alone() -> None:
    # No X-Forwarded-Proto header at all: a direct TLS connection, or (as here) a test
    # client talking to the app in-process. Either way, nothing here is redirected.
    client = TestClient(app)

    response = client.get("/health", follow_redirects=False)

    assert response.status_code == 200


def test_ac054_database_connection_requires_tls_by_default() -> None:
    args = _connect_args(_postgres_url())

    assert args["sslmode"] == "require"


def test_ac054_database_connection_honours_an_explicit_ssl_mode_setting(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("DATABASE_SSL_MODE", "verify-full")

    args = _connect_args(_postgres_url())

    assert args["sslmode"] == "verify-full"


def test_ac054_database_connection_url_that_already_names_an_ssl_mode_is_left_alone() -> None:
    args = _connect_args(_postgres_url(query="?sslmode=disable"))

    assert args == {}


def test_ac054_sqlite_connection_is_unaffected() -> None:
    args = _connect_args("sqlite:///./app.db")

    assert args == {"check_same_thread": False}
    assert "sslmode" not in args
