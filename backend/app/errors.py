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
