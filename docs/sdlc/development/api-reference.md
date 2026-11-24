# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| POST | /auth/login | login | `backend/app/auth.py:130` | — |
| GET | /auth/me | me | `backend/app/auth.py:138` | — |
| GET | /health | health | `backend/app/main.py:87` | Liveness probe, and the only route here that is not a stub. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- GET /admin/appointments
- GET /admin/audit/record-access
- GET /admin/patients/{id}/consent
- GET /consultation-records/{id}
- GET /consultation-records/{id}/pdf
- GET /doctor/appointments
- GET /doctors/{id}/slots
- GET /me/appointments
- GET /search
- PATCH /admin/doctors/{id}
- PATCH /appointments/{id}/cancel
- PATCH /appointments/{id}/reschedule
- PATCH /doctor/appointments/{id}/status
- POST /admin/doctors
- POST /admin/mappings
- POST /admin/specializations
- POST /appointments
- POST /appointments/{id}/consultation
- POST /auth/logout
- POST /auth/register
- POST /consultation-records/{id}/prescriptions
- POST /doctor/availability

**Code only:**

- GET /auth/me
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `5738a62`
<!-- sdlc:auto:end source -->
