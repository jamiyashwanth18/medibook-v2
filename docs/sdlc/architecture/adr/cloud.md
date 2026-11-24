<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-24

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Approved stack. The Mumbai (ap-south-1) region keeps patient health data inside India for DPDP alignment (NFR-009), provides TLS for encryption in transit, managed RDS PostgreSQL with encryption at rest, and compute for the API — covering the whole footprint without a separate email or queue service, both of which are out of scope.

## Consequences

Region pinning to India is a deployment constraint that must be enforced in IaC; no managed email service is used since notifications are on-screen only.
<!-- sdlc:auto:end adr -->