# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Establish authentication foundation: patient self-registration with consent, secure login/session handling, admin-provisioned doctor accounts, and baseline encryption.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Patient self-registration with consent | 5 | backend-agent | — |
| US-002 | Story | Email/password sign-in and session security | 5 | backend-agent | US-001 |
| US-003 | Story | Admin provisions doctor accounts | 5 | backend-agent | US-002 |
| US-022 | Story | Encrypt health data in transit and at rest | 3 | devops-agent | — |
| US-024 | Story | Capture and store patient consent | 2 | backend-agent | US-001 |

## Sprint 2: Sprint 2

Enforce role-based access, let doctors define recurring weekly availability, and give admins control over doctors and specializations.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Role-based access enforcement | 3 | security-agent | US-002, US-003 |
| US-011 | Story | Define recurring weekly availability as fixed-length slots | 8 | backend-agent | US-003 |
| ↳ US-011-T1 | Task | Design availability_patterns and slots schema with recurring generation | — | backend-agent | — |
| ↳ US-011-T2 | Task | Implement POST /doctor/availability slot-generation endpoint | — | backend-agent | — |
| ↳ US-011-T3 | Task | Add guard preventing silent deletion of booked slots on availability change | — | backend-agent | — |
| ↳ US-011-T4 | Task | Build doctor weekly availability editor UI | — | frontend-agent | — |
| US-017 | Story | Manage doctors | 5 | backend-agent | US-003 |
| US-018 | Story | Manage specializations | 3 | backend-agent | US-003 |

## Sprint 3: Sprint 3

Deliver patient search for care, real-time doctor slot visibility, the disease/symptom mapping admin tool, and setup documentation.

Capacity: 20 points · Committed: 15

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Search for care by disease, symptom, or specialization | 5 | backend-agent | US-004 |
| US-006 | Story | View doctors with real-time available slots | 5 | frontend-agent | US-005, US-011 |
| US-019 | Story | Manage disease/symptom-to-specialization mapping | 3 | backend-agent | US-018 |
| US-025 | Story | Setup documentation | 2 | devops-agent | US-022 |

## Sprint 4: Sprint 4

Deliver concurrency-safe booking, reschedule, cancel, and the patient appointments dashboard.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-007 | Story | Book an appointment with double-booking prevention | 8 | backend-agent | US-006 |
| ↳ US-007-T1 | Task | Implement slot locking and transactional booking logic | — | backend-agent | — |
| ↳ US-007-T2 | Task | Add POST /appointments endpoint with concurrency-safe slot reservation | — | backend-agent | — |
| ↳ US-007-T3 | Task | Build booking confirmation screen | — | frontend-agent | — |
| ↳ US-007-T4 | Task | Add concurrency test for simultaneous booking attempts | — | qa-agent | — |
| US-008 | Story | Reschedule an appointment | 5 | backend-agent | US-007 |
| US-009 | Story | Cancel an appointment | 3 | backend-agent | US-007 |
| US-010 | Story | Patient view of booked appointments | 3 | frontend-agent | US-007 |

## Sprint 5: Sprint 5

Deliver the doctor appointment dashboard, status updates, diagnosis/notes, admin appointment oversight, and health-record access restriction.

Capacity: 20 points · Committed: 15

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | Doctor dashboard of scheduled appointments | 3 | frontend-agent | US-007 |
| US-013 | Story | Update appointment and consultation status | 3 | backend-agent | US-012 |
| US-014 | Story | Doctor records diagnosis and visit notes | 3 | backend-agent | US-012 |
| US-020 | Story | Manage appointments via admin dashboard | 3 | frontend-agent | US-007, US-013 |
| US-021 | Story | Restrict access to health records | 3 | security-agent | US-014 |

## Sprint 6: Sprint 6

Complete structured prescriptions, patient record viewing/PDF download, access audit logging, and usage documentation.

Capacity: 20 points · Committed: 12

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-015 | Story | Doctor creates a structured prescription | 3 | backend-agent | US-014 |
| US-016 | Story | Patient views and downloads their consultation record | 5 | backend-agent | US-014, US-015 |
| US-023 | Story | Audit log of health-record access | 3 | security-agent | US-016, US-021 |
| US-026 | Story | Usage documentation | 1 | frontend-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
