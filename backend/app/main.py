"""Application entrypoint.

Generated from the approved architecture: one router per component that owns
endpoints, one route per endpoint the API spec declares. Every generated route
is a stub that returns a typed placeholder, so the service starts, serves its
OpenAPI document and passes its tests before a single handler is implemented.
"""

import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, Response
from sqlalchemy import inspect
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint

from app import auth
from app.database import DATABASE_URL, engine
from app.routers import admin_doctors
from app.routers import auth as auth_router
from app.seed import seed_from_env

_ALEMBIC_INI = Path(__file__).resolve().parent.parent / "alembic.ini"

# AC-054, NFR-006: health data must travel to and from the client encrypted. A year in
# seconds, applied to subdomains too, is the usual HSTS setting (it tells a browser that
# has seen it once to use HTTPS for every request from here on, never plain HTTP again).
_HSTS_HEADER = "max-age=31536000; includeSubDomains"


class EnforceHTTPSMiddleware(BaseHTTPMiddleware):
    """Sends every response a Strict-Transport-Security header, and redirects a request
    a TLS-terminating proxy forwarded over plain HTTP.

    The app itself is reached over TLS in every real deployment, so "plain HTTP" is never
    `request.url.scheme` (uvicorn behind a proxy, or behind one that terminates TLS, sees
    HTTP either way): it is the `X-Forwarded-Proto` header the proxy sets to say which
    scheme the original request used. No such header means either a direct TLS connection
    or a test client talking to the app in-process, neither of which this redirects.
    """

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        forwarded_proto = request.headers.get("x-forwarded-proto", "").split(",")[0].strip()
        if forwarded_proto and forwarded_proto.lower() != "https":
            return RedirectResponse(
                url=request.url.replace(scheme="https"), status_code=307
            )
        response = await call_next(request)
        response.headers["Strict-Transport-Security"] = _HSTS_HEADER
        return response


def prepare_database() -> None:
    """Bring the database up to the migrations when the application starts.

    The schema comes from the Alembic migrations in alembic/versions/, never from
    `create_all`, which cannot change a table that already exists. A database that
    `create_all` built before there were migrations has tables but no migration record:
    the first migration describes what it built, so it is marked as applied and only the
    later ones run.
    """
    if not _ALEMBIC_INI.is_file():
        raise RuntimeError(
            "alembic.ini is missing beside app/, so the database cannot be prepared. "
            "Restore alembic.ini and alembic/ (the Dockerfile copies both into the image)."
        )
    from alembic import command
    from alembic.config import Config
    from alembic.script import ScriptDirectory

    config = Config(str(_ALEMBIC_INI))
    config.set_main_option("script_location", str(_ALEMBIC_INI.parent / "alembic"))
    config.set_main_option("sqlalchemy.url", DATABASE_URL.replace("%", "%%"))
    tables = set(inspect(engine).get_table_names())
    if tables and "alembic_version" not in tables:
        command.stamp(config, ScriptDirectory.from_config(config).get_base())
    command.upgrade(config, "head")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Prepares the database and seeds the first users (app/seed.py) on startup and not at
    import, so importing the application never opens a connection. A test can therefore
    point `get_db` at a database of its own, and a deployment whose `DATABASE_URL` names a
    server that is not up fails where you can read the error, not while pytest collects.
    """
    prepare_database()
    seed_from_env()
    yield


_DESCRIPTION = (
    "Develop a web-based healthcare appointment management application where patients can "
    "search for doctors based on their disease, symptoms, or medical specialization, view "
    "available doctors and their consultation time slots, and book, reschedule, or cancel "
    "appointments. Doctors can manage their availability, view scheduled appointments, "
    "maintain patient consultation records, and update consultation statuses. The system "
    "should support role-based access for patients, doctors, and administrators, with an "
    "admin dashboard to manage doctors, specializations, and appointments. The application "
    "must use predefined disease-to-specialization mappings to help patients find relevant "
    "doctors, without using AI, LLMs, or machine learning. It should prevent double bookings "
    "and display real-time appointment availability. **No payment gateway or online payment "
    "functionality is required.**"
)

app = FastAPI(
    title="MediBook V2",
    description=_DESCRIPTION,
    version="0.1.0",
    lifespan=lifespan,
)

# The SPA runs on a different origin than the API, so the browser refuses its calls
# unless that origin is allowed here. In development that is the Vite dev server; when
# deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS (comma
# separated). Point ALLOWED_ORIGINS at the real thing and nothing else has to change.
_dev_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins or _dev_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(EnforceHTTPSMiddleware)
app.include_router(auth.router)
app.include_router(auth_router.router)
app.include_router(admin_doctors.router)


@app.get("/health")
async def health() -> dict[str, str]:
    """Liveness probe, and the only route here that is not a stub."""
    return {"status": "ok"}
