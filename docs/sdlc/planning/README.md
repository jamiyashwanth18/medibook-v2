# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Covers patient self-registration, admin-provisioned doctor accounts, email/password authentication with session security, consent capture at registration, and role-based access enforcement for patients, doctors, and administrators.

Scope: patient self-registration; admin-provisioned doctor accounts (admins assign specialization/credentials); email/password auth; consent capture at registration; role-based access control. Assumption stated in input: patients self-register while doctor accounts are created by administrators who assign specializations/credentials; single clinic context, no multi-tenant separation. Stories: US-001 (critical), US-002 (critical), US-003 (critical), US-004 (high).

**Related:** US-001, US-002, US-003, US-004

### EPIC-002 · approved · source: planning:EPIC-002

Patients search for care by disease, symptom, or specialization via a predefined mapping, view doctors with real-time slot availability, and book, reschedule, or cancel in-person appointments with double-booking prevention.

Scope: search resolved through predefined admin-maintainable disease/symptom-to-specialization mapping (no AI/LLM/ML); real-time slot display; booking with concurrency-safe double-booking prevention; reschedule/cancel subject to configurable cut-off rules. Assumptions stated in input: reschedule/cancel allowed subject to configurable rules such as a cut-off window; because email was removed from MVP scope, booking confirmations and reschedule/cancellation notices are shown on-screen in-app rather than emailed. Stories: US-005 (critical), US-006 (critical), US-007 (critical), US-008 (high), US-009 (high), US-010 (high).

**Related:** US-005, US-006, US-007, US-008, US-009, US-010

### EPIC-003 · approved · source: planning:EPIC-003

Doctors define recurring weekly availability broken into fixed-length consultation slots, view a scheduled-appointments dashboard, and update appointment/consultation status.

Scope: recurring weekly availability pattern split into fixed-length slots (length configured for the clinic); doctor dashboard of upcoming/past appointments; status updates (completed, no-show) with invalid-transition prevention. Assumption stated in input: availability is defined as a recurring weekly pattern split into fixed-length slots whose length is configured for the clinic. Stories: US-011 (critical), US-012 (high), US-013 (high).

**Related:** US-011, US-012, US-013

### EPIC-004 · approved · source: planning:EPIC-004

Doctors maintain per-visit consultation records with diagnosis/visit notes and structured prescriptions, which patients can view and download; no file/document uploads are supported.

Scope: diagnosis/visit notes entry; structured prescription entry (medicine, dosage, frequency, duration) with required-field validation; patient viewing and PDF-style download of records. Explicitly out of scope: file or document uploads (test reports, scans). Assumption stated in input: prescriptions are structured data entered by the doctor and downloadable by the patient (e.g. as a generated PDF), not scanned/uploaded documents. Stories: US-014 (high), US-015 (high), US-016 (high).

**Related:** US-014, US-015, US-016

### EPIC-005 · approved · source: planning:EPIC-005

Administrators manage doctors, specializations, the disease/symptom-to-specialization mapping, and appointments across the clinic through an admin dashboard.

Scope: doctor roster management (edit, deactivate) with search/session impact; specialization CRUD with dependency warnings before removal; mapping CRUD affecting subsequent patient searches; cross-doctor appointment oversight with filtering and admin cancellation. Assumption stated in input: the mapping is a predefined, admin-maintainable table with no AI/ML; single-clinic scope. Stories: US-017 (high), US-018 (medium), US-019 (high), US-020 (medium).

**Related:** US-017, US-018, US-019, US-020

### EPIC-006 · approved · source: planning:EPIC-006

Health data is treated as sensitive under India's DPDP Act: access restricted to the treating doctor, patient, and admins; data encrypted in transit and at rest; record access audit-logged; and consent captured at registration.

Scope: record-access restriction to patient/treating doctor/admins only; encryption in transit and at rest for health data; audit logging of record access (who, which record, when) with admin review; consent capture and retention with date, viewable by admins. Assumption stated in input: the exact DPDP controls are to be confirmed; the controls stated here are the agreed baseline. Stories: US-021 (critical), US-022 (critical), US-023 (high), US-024 (high).

**Related:** US-021, US-022, US-023, US-024

### EPIC-007 · approved · source: planning:EPIC-007

Basic documentation to install, configure, and operate the MVP, including a setup guide and a role-based usage guide.

Scope: setup guide covering environment, database, and initial admin account so the application can be run end to end; usage guide covering core tasks per role (patient: search and book; doctor: set availability and record consultations; admin: manage doctors, specializations, and mapping). Explicit rule: credentials in documentation are shown only as placeholders (e.g. <database-password>, <set-at-first-login>), never real values. Stories: US-025 (medium), US-026 (low).

**Related:** US-025, US-026

### SPRINT-1 · draft · source: planning:SPRINT-1

Establish authentication foundation: patient self-registration with consent, secure login/session handling, admin-provisioned doctor accounts, and baseline encryption.

Capacity: 20 points. Plan status is 'generated, version 1' (not yet marked approved). Story membership inferred from goal wording (not an explicit input mapping): US-001 (patient self-registration with consent, 5 pts, backend-agent), US-002 (sign-in/session security, 5 pts, backend-agent), US-003 (admin-provisioned doctor accounts, 5 pts, backend-agent), US-024 (capture/store patient consent, 2 pts, backend-agent) as the consent portion of the goal, and US-022 (encrypt health data in transit/at rest, 3 pts, devops-agent) as the 'baseline encryption' portion.

**Related:** US-001, US-002, US-003, US-022, US-024

### SPRINT-2 · draft · source: planning:SPRINT-2

Enforce role-based access, let doctors define recurring weekly availability, and give admins control over doctors and specializations.

Capacity: 20 points. Story membership inferred from goal wording: US-004 (role-based access enforcement, 3 pts, security-agent), US-011 (recurring weekly availability as fixed-length slots, 8 pts, backend-agent; includes sub-tasks US-011-T1 schema design, US-011-T2 slot-generation endpoint, US-011-T3 guard against silent deletion of booked slots, US-011-T4 availability editor UI), US-017 (manage doctors, 5 pts, backend-agent), US-018 (manage specializations, 3 pts, backend-agent).

**Related:** US-004, US-011, US-017, US-018

### SPRINT-3 · draft · source: planning:SPRINT-3

Deliver patient search for care, real-time doctor slot visibility, the disease/symptom mapping admin tool, and setup documentation.

Capacity: 20 points. Story membership inferred from goal wording: US-005 (search by disease/symptom/specialization, 5 pts, backend-agent), US-006 (real-time available slots view, 5 pts, frontend-agent), US-019 (manage disease/symptom-to-specialization mapping, 3 pts, backend-agent), US-025 (setup documentation, 2 pts, devops-agent).

**Related:** US-005, US-006, US-019, US-025

### SPRINT-4 · draft · source: planning:SPRINT-4

Deliver concurrency-safe booking, reschedule, cancel, and the patient appointments dashboard.

Capacity: 20 points. Story membership inferred from goal wording: US-007 (book an appointment with double-booking prevention, 8 pts, backend-agent; includes sub-tasks US-007-T1 slot locking/transactional booking logic, US-007-T2 POST /appointments concurrency-safe endpoint, US-007-T3 booking confirmation screen (frontend-agent), US-007-T4 concurrency test for simultaneous booking (qa-agent)), US-008 (reschedule, 5 pts, backend-agent), US-009 (cancel, 3 pts, backend-agent), US-010 (patient view of booked appointments, 3 pts, frontend-agent).

**Related:** US-007, US-008, US-009, US-010

### SPRINT-5 · draft · source: planning:SPRINT-5

Deliver the doctor appointment dashboard, status updates, diagnosis/notes, admin appointment oversight, and health-record access restriction.

Capacity: 20 points. Story membership inferred from goal wording: US-012 (doctor dashboard of scheduled appointments, 3 pts, frontend-agent), US-013 (update appointment/consultation status, 3 pts, backend-agent), US-014 (record diagnosis and visit notes, 3 pts, backend-agent), US-020 (manage appointments via admin dashboard, 3 pts, frontend-agent), US-021 (restrict access to health records, 3 pts, security-agent).

**Related:** US-012, US-013, US-014, US-020, US-021

### SPRINT-6 · draft · source: planning:SPRINT-6

Complete structured prescriptions, patient record viewing/PDF download, access audit logging, and usage documentation.

Capacity: 20 points. Story membership inferred from goal wording: US-015 (structured prescription creation, 3 pts, backend-agent), US-016 (patient views and downloads consultation record, 5 pts, backend-agent), US-023 (audit log of health-record access, 3 pts, security-agent), US-026 (usage documentation, 1 pt, frontend-agent).

**Related:** US-015, US-016, US-023, US-026
<!-- sdlc:auto:end narrative -->
