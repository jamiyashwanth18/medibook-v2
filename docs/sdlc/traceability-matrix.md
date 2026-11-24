# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run. **Tests** counts the tests written for the story, and **Result** how many last passed, how many failed and when, as of this page's generation; the Documentation tab shows them live.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Test step | Tests | Result | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Patient self-registration with consent | US-001 | 1 | POST /auth/register, api, db, patient_consents, users, web | — | — | not started | not run | 0 | No tests | 0/4 tested · 0/4 passing | — |
| US-002 | EPIC-001 | Email/password sign-in and session security | US-002 | 1 | POST /auth/login, POST /auth/logout, api, db, sessions, users, web | — | — | not started | not run | 0 | No tests | 0/4 tested · 0/4 passing | — |
| US-003 | EPIC-001 | Admin provisions doctor accounts | US-003 | 1 | POST /admin/doctors, api, db, doctor_profiles, doctor_specializations, specializations, users, web | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-001 | Role-based access enforcement | US-004 | 2 | api, sessions, users, web | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-005 | EPIC-002 | Search for care by disease, symptom, or specialization | US-005 | 3 | GET /search, api, db, doctor_profiles, mapping_specializations, specializations, symptom_mappings, web | — | — | not started | not run | 0 | No tests | 0/4 tested · 0/4 passing | — |
| US-006 | EPIC-002 | View doctors with real-time available slots | US-006 | 3 | GET /doctors/{id}/slots, api, db, doctor_profiles, slots, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-002 | Book an appointment with double-booking prevention | US-007, US-007-T1, US-007-T2, US-007-T3, US-007-T4 | 4 | POST /appointments, api, appointments, db, slots, web | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-008 | EPIC-002 | Reschedule an appointment | US-008 | 4 | PATCH /appointments/{id}/reschedule, api, appointments, db, slots, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-002 | Cancel an appointment | US-009 | 4 | PATCH /appointments/{id}/cancel, api, appointments, db, slots, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-002 | Patient view of booked appointments | US-010 | 4 | GET /me/appointments, api, appointments, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-003 | Define recurring weekly availability as fixed-length slots | US-011, US-011-T1, US-011-T2, US-011-T3, US-011-T4 | 2 | POST /doctor/availability, api, availability_patterns, db, slots, web | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-012 | EPIC-003 | Doctor dashboard of scheduled appointments | US-012 | 5 | GET /doctor/appointments, api, appointments, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-013 | EPIC-003 | Update appointment and consultation status | US-013 | 5 | PATCH /doctor/appointments/{id}/status, api, appointments, db, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-004 | Doctor records diagnosis and visit notes | US-014 | 5 | POST /appointments/{id}/consultation, api, consultation_records, db, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-015 | EPIC-004 | Doctor creates a structured prescription | US-015 | 6 | POST /consultation-records/{id}/prescriptions, api, consultation_records, db, prescription_lines, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-016 | EPIC-004 | Patient views and downloads their consultation record | US-016 | 6 | GET /consultation-records/{id}, GET /consultation-records/{id}/pdf, api, consultation_records, db, prescription_lines, web | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-017 | EPIC-005 | Manage doctors | US-017 | 2 | PATCH /admin/doctors/{id}, api, db, doctor_profiles, doctor_specializations, sessions, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-018 | EPIC-005 | Manage specializations | US-018 | 2 | POST /admin/specializations, api, db, specializations, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-019 | EPIC-005 | Manage disease/symptom-to-specialization mapping | US-019 | 3 | POST /admin/mappings, api, db, mapping_specializations, symptom_mappings, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-020 | EPIC-005 | Manage appointments via admin dashboard | US-020 | 5 | GET /admin/appointments, api, appointments, web | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-021 | EPIC-006 | Restrict access to health records | US-021 | 5 | GET /consultation-records/{id}, api, consultation_records, db | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-022 | EPIC-006 | Encrypt health data in transit and at rest | US-022 | 1 | api, db | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-023 | EPIC-006 | Audit log of health-record access | US-023 | 6 | GET /admin/audit/record-access, api, db, record_access_audit | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-024 | EPIC-006 | Capture and store patient consent | US-024 | 1 | GET /admin/patients/{id}/consent, api, db, patient_consents | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-025 | EPIC-007 | Setup documentation | US-025 | 3 | — | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-026 | EPIC-007 | Usage documentation | US-026 | 6 | — | — | — | not started | not run | 0 | No tests | 0/1 tested · 0/1 passing | — |
<!-- sdlc:auto:end matrix -->
