"""Engine, session factory and the request-scoped session dependency.

SQLite by default so a fresh clone starts with nothing but `pip install -r
requirements.txt`. The tests need PostgreSQL (tests/conftest.py), and a deployment
points `DATABASE_URL` at its own database; nothing else has to change. The schema
comes from the Alembic migrations (alembic/versions/), which the app runs on startup.
"""

import os
from collections.abc import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")


def _connect_args(url: str) -> dict[str, object]:
    """Connection options for `url`: SQLite needs one, PostgreSQL another.

    SQLite rejects a connection made on one thread and used on another, which is
    exactly what happens when FastAPI runs a sync dependency in its threadpool.

    AC-054, NFR-006: health data must not travel to the database unencrypted, so a
    PostgreSQL connection requires TLS (DATABASE_SSL_MODE, default "require") unless the
    URL already names an sslmode of its own -- a deployment whose DATABASE_URL already
    says `?sslmode=verify-full` is left alone rather than overridden.
    """
    if url.startswith("sqlite"):
        return {"check_same_thread": False}
    if "sslmode=" in url:
        return {}
    return {"sslmode": os.getenv("DATABASE_SSL_MODE", "require")}


engine = create_engine(DATABASE_URL, connect_args=_connect_args(DATABASE_URL), future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    """Declarative base that every generated model inherits."""


def get_db() -> Iterator[Session]:
    """One session per request, closed even when the handler raises."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
