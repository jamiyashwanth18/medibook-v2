<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-24

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Angular

## Decision Outcome

Chosen option: React 19, because Approved stack. Drives the three role-based interactive views (patient search/booking, doctor schedule and record editor, admin dashboard) as a responsive SPA served from its own CloudFront origin, reading the API base URL from VITE_API_BASE_URL and sending an Authorization: Bearer token on every call.

## Consequences

A SPA needs an explicit client-side auth/token store and route guards for role-based access since there is no shared-origin cookie session; handled with the opaque bearer token pattern.
<!-- sdlc:auto:end adr -->