<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-24

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQL Server

## Decision Outcome

Chosen option: PostgreSQL 16, because Approved stack. Row-level locking and transactions make the no-double-booking guarantee real; one consistent store holds the disease/symptom mapping, slots, consultation records, consent and audit log, and term search runs as a direct normalized query with no added search engine.

## Consequences

Correctness-first single instance means no read-replica scaling, which matches the dozens-of-doctors scope; encryption at rest is provided by RDS rather than per-column by default.
<!-- sdlc:auto:end adr -->