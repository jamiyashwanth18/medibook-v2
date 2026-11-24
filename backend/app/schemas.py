"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented. Every model is an ApiModel,
so its JSON uses camelCase names (app/api_model.py).
"""

from app.api_model import ApiModel


class StubResponse(ApiModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."


class UserCreate(ApiModel):
    email: str
    role: str


class UserRead(ApiModel):
    id: str
    email: str
    role: str


class ErrorResponse(ApiModel):
    """The body every error code in app/errors.py raises."""

    code: str
    message: str


class RegisterRequest(ApiModel):
    """POST /auth/register body (US-001). Consent must be explicitly accepted."""

    full_name: str
    email: str
    password: str
    consent_accepted: bool


class RegisteredUser(ApiModel):
    id: str
    role: str
    full_name: str


class RegisterResponse(ApiModel):
    """POST /auth/register reply: the new patient is signed in, so a token comes back
    the same way it does from /auth/login."""

    token: str
    user: RegisteredUser


class LoginRequest(ApiModel):
    """POST /auth/login body (US-002). The signed-in user's identity always comes from
    this email/password pair, never assumed from anywhere else."""

    email: str
    password: str


class SessionUser(ApiModel):
    """The signed-in user's identity, returned alongside the session token (US-002)."""

    id: str
    role: str


class LoginResponse(ApiModel):
    """POST /auth/login reply: an opaque session token plus who it belongs to (US-002)."""

    token: str
    user: SessionUser
