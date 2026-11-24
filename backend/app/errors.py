"""Error codes the API's endpoints can return, one constant per error.

Each error is declared once, with the HTTP status and message a route raises it with, so
the exported OpenAPI document and every route that returns it stay in sync. Raise it with
`raise SOME_ERROR()`, or `raise SOME_ERROR("detail")` when the message should carry
something specific to this call.
"""

from dataclasses import dataclass

from fastapi import HTTPException


@dataclass(frozen=True)
class ErrorCode:
    status: int
    code: str
    message: str

    def __call__(self, detail: str | None = None) -> HTTPException:
        return HTTPException(self.status, {"code": self.code, "message": detail or self.message})


# POST /auth/register (US-001)
EMAIL_ALREADY_REGISTERED = ErrorCode(
    409, "EMAIL_ALREADY_REGISTERED", "That email is already registered."
)
CONSENT_REQUIRED = ErrorCode(400, "CONSENT_REQUIRED", "Consent is required to register.")

# POST /auth/login (US-002): one generic message for both a wrong email and a wrong
# password (AC-006, NFR-003), so a failed sign-in never says which field was wrong.
INVALID_CREDENTIALS = ErrorCode(401, "INVALID_CREDENTIALS", "Incorrect email or password.")

# Any route that requires a signed-in session, including POST /auth/logout (US-002):
# no credentials, an expired session (AC-008), or a revoked one all refuse the same way.
NOT_AUTHENTICATED = ErrorCode(401, "NOT_AUTHENTICATED", "Sign in first.")
