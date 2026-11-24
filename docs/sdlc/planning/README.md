# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Patient self-registration, admin-provisioned doctor accounts, email/password authentication, consent capture at registration, and role-based access for patients, doctors, and administrators.

Assumption: patients self-register while doctor accounts are created by administrators who assign specializations/credentials (single clinic context, no multi-tenant separation).

**Related:** US-001, US-002, US-003, US-004

### EPIC-002 · approved · source: planning:EPIC-002

Patients search for care by disease, symptom, or specialization resolved through a predefined admin-maintainable mapping, view matching doctors with real-time slot availability, and book, reschedule, or cancel in-person appointments with double-booking prevention.

Assumption: reschedule/cancel are allowed subject to configurable rules such as a cut-off window. Assumption: because email was removed from this MVP scope, booking confirmations and reschedule/cancellation notices are shown on screen in-app rather than emailed.

**Related:** US-005, US-006, US-007, US-008, US-009, US-010

### EPIC-003 · approved · source: planning:EPIC-003

Doctors define recurring weekly availability broken into fixed-length consultation slots, view their scheduled appointments on a doctor dashboard, and update appointment/consultation status.

Assumption: availability is defined as a recurring weekly pattern split into fixed-length slots whose length is configured for the clinic.

**Related:** US-011, US-012, US-013

### EPIC-004 · approved · source: planning:EPIC-004

Doctors maintain per-visit consultation records containing diagnosis/visit notes and structured prescriptions, which patients can view and download. No file or document uploads are supported.

Assumption: prescriptions are structured data entered by the doctor and downloadable by the patient (e.g. as a generated PDF), not scanned/uploaded documents.

**Related:** US-014, US-015, US-016

### EPIC-005 · approved · source: planning:EPIC-005

Administrators manage doctors, specializations, the disease/symptom-to-specialization mapping, and appointments through an admin dashboard for the single clinic.

Assumption: the mapping is a predefined, admin-maintainable table with no AI/ML.

**Related:** US-017, US-018, US-019, US-020

### EPIC-006 · approved · source: planning:EPIC-006

Health data is treated as sensitive under India's DPDP Act: access is restricted to the treating doctor, the patient, and admins; data is encrypted in transit and at rest; record access is audit-logged; and consent is captured at registration.

Assumption: the exact DPDP controls are to be confirmed; the controls stated here are the agreed baseline.

**Related:** US-021, US-022, US-023, US-024

### EPIC-007 · approved · source: planning:EPIC-007

Basic documentation to install, configure, and operate the MVP.

Credentials in documentation are shown only as placeholders (e.g. <database-password>, <set-at-first-login>), never real values.

**Related:** US-025, US-026
<!-- sdlc:auto:end narrative -->
