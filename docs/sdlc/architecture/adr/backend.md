<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-24

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because Approved stack. Hosts the booking transaction with PostgreSQL row-level locking for the one-patient-per-slot guarantee, the patient/doctor/admin role checks, audit logging of record access, and server-side PDF generation of prescriptions.

## Consequences

Business-logic-heavy endpoints (booking concurrency, cut-off windows, authorization) must be carefully unit- and concurrency-tested; FastAPI's explicit transaction control makes this tractable at single-clinic scale.
<!-- sdlc:auto:end adr -->