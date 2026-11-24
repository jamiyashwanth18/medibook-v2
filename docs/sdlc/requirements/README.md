# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECH-STACK-001 · approved · source: requirements:technology-stack

Product owner approved an exact technology stack to build against: FastAPI backend, AWS cloud, PostgreSQL database, React frontend.

- Backend: FastAPI 0.115 -- chosen for clean control over DB transactions/locking for the one-patient-per-slot booking rule, audit logging, role checks, and PDF prescription generation; platform default for this scale.
- Cloud: AWS -- chosen because AWS has in-country data-centre regions (Mumbai, Hyderabad) needed for DPDP data residency, and provides compute, managed PostgreSQL and email delivery at single-clinic scale; platform default.
- Database: PostgreSQL 16 -- chosen for row-level locking/transactions that make the no-double-booking guarantee real, and for storing the disease-to-specialization mapping, consultation records and audit log consistently, with encryption at rest; platform default.
- Frontend: React 19 -- chosen to build the three distinct role-based views (patient booking/search, doctor schedule/record editor, admin dashboard) and support real-time slot availability; platform default.
Design must use exactly these; no substitutions.

### REQ-SERVICES-001 · approved · source: requirements:capabilities-in-scope

Capabilities approved as in scope for the MVP, covering patient, doctor and admin needs plus documentation.

In scope: patient self-registration and login; search for care by disease, symptom or specialization; predefined disease/symptom-to-specialization mapping lookup; doctor listing with available consultation time slots; real-time slot availability display; appointment booking with double-booking prevention (one booking per slot); doctor consultation slot setup; patient view of their own booked appointments; patient and doctor dashboards; basic setup and usage documentation; fixed-length consultation slots generated from recurring weekly availability; no online payments (fees settled offline at the clinic).

### REQ-SCOPE-001 · approved · source: requirements:scope

Delivery scope is lightweight; several capabilities were explicitly excluded from design and build.

Delivery scope: lightweight. Requirements version: 1.
Out of scope -- not to be designed or built: live video / telemedicine consultations; uploading or attaching medical documents such as test reports or scans; email (SendGrid removed from the stack); queue (Redis as a queue removed from the stack). No payment gateway or online payment functionality is required anywhere in the system.

### REQ-FEAT-SIGNIN-001 · approved · source: requirements:sign-in-and-accounts

Covers how patients self-register and how all roles sign in and out.

- Patient self-registration with consent: visitor creates a patient account with name, email and password, must tick the data-handling consent statement (consent and its date stored against the account); registration blocked without consent and rejected if email already registered; public flow can only create patient accounts.
- Email and password sign-in: registered patients, doctors and admins sign in with email/password and land on their role's dashboard; users can sign out to end their session.

**Related:** NFR-001, NFR-002, NFR-003, NFR-004, NFR-008

### REQ-FEAT-FINDCARE-001 · approved · source: requirements:finding-care-and-booking

Covers searching for care, viewing doctor slots, and booking, rescheduling and cancelling appointments.

- Search for care: signed-in patient searches by disease, symptom or specialization; disease/symptom resolved via predefined, admin-maintained mapping (no AI/ML) to one or more specializations; matching doctors listed; unknown term shows a clear no-results message.
- View doctors and available slots: patient opens a matching doctor and sees available fixed-length consultation slots reflecting current availability; already-booked slots not shown as available.
- Book an appointment: patient selects an available slot and confirms; appointment created, slot marked booked, on-screen confirmation states consultation is in person at the clinic and any fee is settled offline.
- Reschedule an appointment: within the configured reschedule window, patient moves an upcoming appointment to another available slot, old slot released, on-screen confirmation shown; past the cut-off, action is blocked with an explanatory message.
- Cancel an appointment: within the configured cancellation window, patient cancels an upcoming appointment, marked cancelled, slot freed, on-screen confirmation shown; past the cut-off, cancellation is blocked with an explanatory message.

**Related:** NFR-010, NFR-011

### REQ-FEAT-MYAPPTS-001 · approved · source: requirements:my-appointments-and-records

Covers the patient's appointments dashboard and access to their own consultation record.

- Patient appointments dashboard: lists upcoming and past appointments with doctor, specialization, date/time and status (booked, completed, cancelled, no-show); empty-state message prompts search for care when there are none.
- View and download consultation record: patient opens their own completed consultation to see diagnosis, visit notes and structured prescription, and can download a generated document (e.g. PDF) of the record and prescription.

**Related:** NFR-005, NFR-006, NFR-007

### REQ-FEAT-DOCSCHEDULE-001 · approved · source: requirements:doctor-schedule-and-records

Covers how doctors set availability, manage their appointment list, update status, and record consultations and prescriptions.

- Define recurring weekly availability: doctor sets available days and start/end times for a recurring week, split into fixed-length bookable slots; removing a period with no bookings stops offering those slots; attempting to remove availability with a booked appointment gives a warning and does not silently delete the booked slot.
- Doctor appointments dashboard: upcoming and past appointments in one place with patient name, date/time and current status; reflects patient bookings, reschedules and cancellations on refresh.
- Update appointment status: doctor marks a today/past appointment as completed or no-show; status saved and visible to patient and admins; invalid changes (e.g. altering an already-cancelled appointment) are prevented.
- Record diagnosis and visit notes: treating doctor enters diagnosis and visit notes saved as the consultation record against that appointment and patient; no upload/attach option for test reports or scans.
- Create structured prescription: treating doctor adds prescription lines (medicine, dosage, frequency, duration) stored with the consultation record; saving a line is blocked until required fields are provided.

**Related:** NFR-005, NFR-006, NFR-007

### REQ-FEAT-ADMIN-001 · approved · source: requirements:admin-dashboard

Covers admin management of doctors, specializations, the disease/symptom mapping, cross-doctor appointments, the audit log, and patient consent visibility.

- Provision doctor accounts: admin creates a doctor account with name, email, credentials and one or more specializations, first-login credentials set to <set-at-first-login>; cannot be saved without at least one specialization.
- Manage doctors: admin views, edits and deactivates doctor accounts; edits to specializations/credentials reflected in patient search; deactivated doctor no longer appears in search and sessions are ended.
- Manage specializations: admin creates, edits and removes specializations; removing one assigned to doctors or mapping entries warns about dependencies first.
- Manage disease and symptom mapping: admin adds, edits and deletes mapping entries; subsequent patient searches reflect updates.
- Manage appointments across doctors: admin views appointments across all doctors with patient, doctor, date/time and status, filterable by doctor or date; can cancel within allowed rules, releasing the slot.
- Review record-access audit log: admin reviews who viewed which consultation record and when.
- View patient consent status: admin reviewing a patient account can see whether and when data-handling consent was given.

**Related:** NFR-007, NFR-008, NFR-014

### REQ-FEAT-DOCS-001 · approved · source: requirements:setup-and-usage-guides

Covers the setup guide for operators and the role-based usage guide for patients, doctors and admins.

- Setup documentation: covers environment, database, configuration and the initial admin account so an operator can stand up and run the application end to end, with any secrets shown only as placeholders.
- Usage documentation: role-based guide giving patients, doctors and admins steps for core tasks such as searching and booking, setting availability and recording consultations, and managing doctors, specializations and the mapping.

**Related:** NFR-014

### NFR-001 · approved · source: requirements:NFR-001

[security] Passwords must be stored only as hashes, never in plain text.

Account passwords for patients, doctors and admins are stored only in hashed form and never in plain text.

### NFR-002 · approved · source: requirements:NFR-002

[security] Sessions expire after inactivity and can be explicitly ended.

A signed-in session expires after a configured period of inactivity; signing out ends the session; deactivating a doctor's account ends that doctor's active sessions. In every case the user must sign in again to reach any protected page.

### NFR-003 · approved · source: requirements:NFR-003

[security] Sign-in failures must not reveal which field was wrong.

When sign-in fails, access is refused without indicating whether the email or the password was wrong.

### NFR-004 · approved · source: requirements:NFR-004

[security] Role-based access must be enforced across patients, doctors and admins.

Each user can reach only the functions allowed for their role: patients, doctors and admins cannot open pages or act outside their permissions even via a direct address; anyone not signed in is redirected to sign in when requesting a protected page.

### NFR-005 · approved · source: requirements:NFR-005

[privacy] Consultation records are restricted to the patient, treating doctor, and admins only.

A consultation record can be opened only by its patient, its treating doctor, or an admin; any other user, including a doctor who did not treat that patient, is denied access.

### NFR-006 · approved · source: requirements:NFR-006

[security] Health data must be encrypted in transit and at rest.

Health data is encrypted while travelling over the network, and consultation records and other sensitive personal data are encrypted when stored in the database.

### NFR-007 · approved · source: requirements:NFR-007

[compliance] Every consultation-record view must be audit-logged and reviewable by admins.

Every time a user views a consultation record, an audit entry capturing who accessed it, which record, and when is recorded; admins can review these record-access entries.

### NFR-008 · approved · source: requirements:NFR-008

[compliance] Patient data-handling consent and its date must be captured and retained.

A patient's data-handling consent, including the date it was given, is captured at registration and retained with the account so admins can later see whether and when consent was given, in line with DPDP expectations.

### NFR-009 · approved · source: requirements:NFR-009

[compliance] Patient health data must be hosted and stored within India (DPDP alignment).

Because the clinic serves patients in India and must align with the DPDP Act, patient records and other sensitive health data are hosted and stored within India. Target: stored within India.

### NFR-010 · approved · source: requirements:NFR-010

[performance] Slot availability shown to patients must be real-time.

The slots a patient sees for a doctor reflect current availability, so a slot that has just been booked by someone else is no longer shown as available.

### NFR-011 · approved · source: requirements:NFR-011

[performance] Exactly one booking can succeed per slot under concurrent requests.

When two patients submit for the same slot at the same time, only one booking succeeds and the other is told the slot is no longer available, with no double booking.

### NFR-012 · approved · source: requirements:NFR-012

[scalability] System is sized for a single clinic, correctness over high-volume scale.

Built for one clinic of roughly dozens of doctors and hundreds to thousands of patients, with correctness prioritised over high-volume scaling. Target: dozens of doctors and hundreds to thousands of patients.

### NFR-013 · approved · source: requirements:NFR-013

[compatibility] The app must be a responsive web app across common desktop and mobile sizes.

Patient, doctor and admin screens work across common desktop and mobile browser sizes.

### NFR-014 · approved · source: requirements:NFR-014

[security] Documentation must show secrets only as placeholders, never real values.

Where documentation references credentials or secrets, they are shown only as placeholders such as <database-password> or <set-at-first-login>, never as real values.

### NFR-015 · approved · source: requirements:NFR-015

[usability] Accepted risk: no email/SMS notifications; confirmations are on-screen only.

Email was removed from scope, so there are no emailed or texted notifications; booking confirmations and reschedule or cancellation notices are shown to the patient on screen in the app only. Marked as an accepted risk.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-24

**Capabilities in scope:** Patient self-registration and login, Search for care by disease, symptom, or specialization, Predefined disease/symptom-to-specialization mapping lookup, Doctor listing with available consultation time slots, Real-time slot availability display, Appointment booking with double-booking prevention (one booking per slot), Doctor consultation slot setup, Patient view of their own booked appointments, Patient and doctor dashboards, Basic setup and usage documentation, Fixed-length consultation slots from recurring weekly availability, No online payments; consultation fees settled offline at the clinic

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The booking rule that matters most -- one patient per slot, no double bookings under concurrent requests -- lives in the backend, and FastAPI gives you clean control over the database transaction and locking that enforces it. It also fits the audit logging of record access and the role checks (patient/doctor/admin) that DPDP alignment requires, and generating downloadable prescription PDFs is straightforward from it. It is the platform default and matches your small, correctness-first scale. |
| cloud | AWS | Because this is health data under India's DPDP Act, hosting region matters, and AWS runs data-centre regions inside India (Mumbai and Hyderabad), letting you keep patient records in-country and support encryption in transit and at rest. It is the platform default and covers everything this build needs -- compute, a managed PostgreSQL, and email delivery -- at a small single-clinic footprint. |
| database | PostgreSQL | This is the choice that makes your no-double-booking guarantee real: PostgreSQL's row-level locking and transactions let the system hold a slot atomically while a booking completes, so two patients cannot take the same slot. It also stores the disease-to-specialization mapping, consultation records and audit log in one consistent place, and supports encryption at rest for the sensitive health data DPDP expects. It is the platform default and the right fit. |
| frontend | React | Your product is a responsive web app with three quite different screens -- a patient booking/search flow, a doctor's daily schedule and consultation-record editor, and an admin dashboard for doctors, specializations and the mapping table. React handles these role-based, interactive views well and is the platform default, so it builds cleanly here. The real-time slot availability patients see as they book is comfortably within what it does. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Accounts, Roles & Access Control

Patient self-registration, admin-provisioned doctor accounts, email/password authentication, consent capture at registration, and role-based access for patients, doctors, and administrators. Assumption: patients self-register while doctor accounts are created by administrators who assign specializations/credentials (a single clinic context, no multi-tenant separation).

### US-001: Patient self-registration with consent

**Priority:** critical

> As a prospective patient, I want to create my own account and give consent for my health data to be handled, so that I can search for doctors and book appointments.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the registration page | I enter my name, email, a password, and tick the consent statement, then submit | my patient account is created and I am signed in |
| AC-002 | I am completing registration | I do not accept the data-handling consent statement | registration is blocked and I am told consent is required to proceed |
| AC-003 | an email address is already registered | I try to register again with that same email | registration is rejected with a message that the email is already in use |
| AC-004 | I have successfully registered | my account is stored | my password is stored only in hashed form and never in plain text |

### US-002: Email/password sign-in and session security

**Priority:** critical

> As a registered user (patient, doctor, or admin), I want to sign in with my email and password and have my session protected, so that only I can access my account.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | I have a valid account | I sign in with the correct email and password | I am granted access to the dashboard for my role |
| AC-006 | I enter an incorrect password | I attempt to sign in | access is denied and no indication is given of which field was wrong |
| AC-007 | I am signed in | I choose to sign out | my session ends and I must sign in again to access any protected page |
| AC-008 | I am signed in | my session has been inactive beyond the configured expiry period | the session expires and I am required to sign in again |

### US-003: Admin provisions doctor accounts

**Priority:** critical

> As a administrator, I want to create doctor accounts and assign their specialization(s) and credentials, so that doctors can be listed and managed internally without self-registering.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | I am signed in as an administrator | I create a doctor account with name, email, credentials, and one or more specializations | the doctor account is created and the doctor can sign in with first-login credentials set to <set-at-first-login> |
| AC-010 | a doctor account is being created | I omit a required specialization assignment | the account cannot be saved until at least one specialization is assigned |
| AC-011 | a patient attempts to register as a doctor | they use the public self-registration flow | only a patient account can be created and no doctor/admin role can be self-assigned |

### US-004: Role-based access enforcement

**Priority:** high

> As a clinic operator, I want each user to only reach the functions allowed for their role, so that patients, doctors, and admins cannot act outside their permissions.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | I am signed in as a patient | I try to open a doctor-only or admin-only page by its direct address | access is denied |
| AC-013 | I am signed in as a doctor | I try to reach administrator management screens | access is denied |
| AC-014 | I am not signed in | I request any protected page | I am redirected to sign in |

## EPIC-002: Finding Care & Booking Appointments

Patients search for care by disease, symptom, or specialization resolved through a predefined admin-maintainable mapping, view matching doctors with real-time slot availability, and book, reschedule, or cancel in-person appointments with double-booking prevention. Assumption: reschedule/cancel are allowed subject to configurable rules such as a cut-off window. Assumption: because email was removed from this MVP scope, booking confirmations and reschedule/cancellation notices are shown on screen in-app rather than emailed.

### US-005: Search for care by disease, symptom, or specialization

**Priority:** critical

> As a patient, I want to search using a disease, symptom, or specialization, so that I can find the right kind of doctor without medical knowledge.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | I am signed in as a patient | I enter a disease or symptom that exists in the mapping | the system resolves it via the predefined mapping to one or more specializations and lists matching doctors |
| AC-016 | I search by a specialization name directly | I submit the search | doctors with that specialization are listed |
| AC-017 | my search term is not found in the mapping | I submit the search | I see a clear no-results message and no doctors are listed |
| AC-018 | the system performs the search | resolving my term | no AI, LLM, or machine learning is used — only the predefined mapping table |

### US-006: View doctors with real-time available slots

**Priority:** critical

> As a patient, I want to see matching doctors and their currently available consultation slots, so that I can choose an available time.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | a list of matching doctors is shown | I open a doctor | I see their available fixed-length consultation slots reflecting current real-time availability |
| AC-020 | a slot has just been booked by someone else | I view that doctor's slots | the booked slot is no longer shown as available |

### US-007: Book an appointment with double-booking prevention

**Priority:** critical

> As a patient, I want to book an available slot and be prevented from clashing with another booking, so that my appointment is confirmed for exactly one patient.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | I select an available slot | I confirm the booking | the appointment is created, the slot is marked booked, and I see an on-screen confirmation |
| AC-022 | two patients attempt to book the same slot at the same time | both submit | only one booking succeeds and the other is told the slot is no longer available (one booking per slot, concurrency-safe) |
| AC-023 | I view a booking confirmation | it is displayed | it states the consultation is in person at the clinic and that any fee is settled offline at the clinic |

### US-008: Reschedule an appointment

**Priority:** high

> As a patient, I want to move my appointment to another available slot within the allowed rules, so that I can adjust to changes in my plans.

| ID | Given | When | Then |
|---|---|---|---|
| AC-024 | I have an upcoming appointment within the configured reschedule window | I select another available slot and confirm | my appointment moves to the new slot, the old slot is released, and I see an on-screen confirmation |
| AC-025 | my appointment is past the configured cut-off window | I attempt to reschedule | the action is blocked with a message explaining the cut-off rule |

### US-009: Cancel an appointment

**Priority:** high

> As a patient, I want to cancel an upcoming appointment within the allowed rules, so that the slot is freed and I am not expected at the clinic.

| ID | Given | When | Then |
|---|---|---|---|
| AC-026 | I have an upcoming appointment within the configured cancellation window | I cancel it | the appointment is marked cancelled, the slot becomes available again, and I see an on-screen confirmation |
| AC-027 | my appointment is past the configured cut-off window | I attempt to cancel | the action is blocked with a message explaining the cut-off rule |

### US-010: Patient view of booked appointments

**Priority:** high

> As a patient, I want a dashboard listing my upcoming and past appointments, so that I can keep track of my visits.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I am signed in as a patient | I open my dashboard | I see my appointments with doctor, specialization, date/time, and status (e.g. booked, completed, cancelled, no-show) |
| AC-029 | I have no appointments | I open my dashboard | I see an empty-state message prompting me to search for care |

## EPIC-003: Doctor Availability & Schedule Management

Doctors define recurring weekly availability broken into fixed-length consultation slots, view their scheduled appointments on a doctor dashboard, and update appointment/consultation status. Assumption: availability is defined as a recurring weekly pattern split into fixed-length slots whose length is configured for the clinic.

### US-011: Define recurring weekly availability as fixed-length slots

**Priority:** critical

> As a doctor, I want to set my recurring weekly availability, which the system splits into fixed-length consultation slots, so that patients can book me only when I am available.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I am signed in as a doctor | I set available days and start/end times for a recurring week | the system generates fixed-length bookable slots for those periods |
| AC-031 | I change my weekly availability | I remove a period that has no existing bookings | the corresponding slots stop being offered to patients |
| AC-032 | I try to remove availability that already has a booked appointment | I save the change | I am warned and the booked slot is not silently deleted |

### US-012: Doctor dashboard of scheduled appointments

**Priority:** high

> As a doctor, I want to view my upcoming and past appointments in one place, so that I can prepare for and manage my consultations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-033 | I am signed in as a doctor | I open my dashboard | I see my appointments with patient name, date/time, and current status |
| AC-034 | a patient books, reschedules, or cancels | I refresh my dashboard | the change is reflected in my appointment list |

### US-013: Update appointment and consultation status

**Priority:** high

> As a doctor, I want to mark an appointment's outcome, so that records reflect what happened at the visit.

| ID | Given | When | Then |
|---|---|---|---|
| AC-035 | I have an appointment for today or in the past | I set its status to completed or no-show | the status is saved and visible to the patient and admins |
| AC-036 | an appointment is already cancelled | I attempt to change its status | the invalid transition is prevented |

## EPIC-004: Consultation Records & Prescriptions

Doctors maintain per-visit consultation records containing diagnosis/visit notes and structured prescriptions, which patients can view and download. No file or document uploads (test reports, scans) are supported — out of scope. Assumption: prescriptions are structured data entered by the doctor and downloadable by the patient (e.g. as a generated PDF), not scanned/uploaded documents.

### US-014: Doctor records diagnosis and visit notes

**Priority:** high

> As a doctor, I want to enter diagnosis and visit notes for a consultation, so that there is a record of the visit.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | I am the treating doctor for an appointment | I enter diagnosis and visit notes and save | the consultation record is stored against that appointment and patient |
| AC-038 | I am viewing the consultation screen | I look for an attachment/upload option for test reports or scans | no upload capability is offered |

### US-015: Doctor creates a structured prescription

**Priority:** high

> As a doctor, I want to enter a structured prescription (medicine, dosage, frequency, duration), so that the patient has clear medication instructions.

| ID | Given | When | Then |
|---|---|---|---|
| AC-039 | I am the treating doctor for a consultation | I add prescription lines with medicine, dosage, frequency, and duration and save | the structured prescription is stored with the consultation record |
| AC-040 | a required prescription field is empty on a line | I try to save that line | saving is blocked until the required fields are provided |

### US-016: Patient views and downloads their consultation record

**Priority:** high

> As a patient, I want to view and download my consultation record and prescription, so that I can follow my treatment and keep a copy.

| ID | Given | When | Then |
|---|---|---|---|
| AC-041 | I am the patient of a completed consultation | I open that record | I see the diagnosis/visit notes and the structured prescription |
| AC-042 | I am viewing my consultation record | I choose to download it | a generated document (e.g. PDF) of the record and prescription is produced for me |
| AC-043 | I am a patient | I try to open a consultation record that is not mine | access is denied |

## EPIC-005: Administration

Administrators manage doctors, specializations, the disease/symptom-to-specialization mapping, and appointments through an admin dashboard for the single clinic. Assumption: the mapping is a predefined, admin-maintainable table with no AI/ML.

### US-017: Manage doctors

**Priority:** high

> As a administrator, I want to view, edit, and deactivate doctor accounts, so that the clinic's doctor roster stays accurate.

| ID | Given | When | Then |
|---|---|---|---|
| AC-044 | I am signed in as an administrator | I edit a doctor's specializations or credentials | the changes are saved and reflected in patient search results |
| AC-045 | I deactivate a doctor | the change is saved | the doctor no longer appears in patient search and their sessions are ended |

### US-018: Manage specializations

**Priority:** medium

> As a administrator, I want to create, edit, and remove specializations, so that doctors and the mapping can reference a correct list.

| ID | Given | When | Then |
|---|---|---|---|
| AC-046 | I am signed in as an administrator | I add a new specialization | it becomes available for assigning to doctors and mapping entries |
| AC-047 | a specialization is assigned to doctors or mapping entries | I attempt to remove it | I am warned about the dependencies before it can be removed |

### US-019: Manage disease/symptom-to-specialization mapping

**Priority:** high

> As a administrator, I want to maintain the predefined mapping from diseases/symptoms to specializations, so that patient searches resolve to the right doctors.

| ID | Given | When | Then |
|---|---|---|---|
| AC-048 | I am signed in as an administrator | I add a disease/symptom and link it to one or more specializations | a patient searching that term is shown doctors of those specializations |
| AC-049 | I edit or delete a mapping entry | I save the change | subsequent patient searches reflect the updated mapping |

### US-020: Manage appointments via admin dashboard

**Priority:** medium

> As a administrator, I want to view and manage appointments across doctors, so that I can oversee clinic scheduling.

| ID | Given | When | Then |
|---|---|---|---|
| AC-050 | I am signed in as an administrator | I open the appointments dashboard | I see appointments across doctors with patient, doctor, date/time, and status, filterable by doctor or date |
| AC-051 | I cancel an appointment as admin within the allowed rules | I confirm | the appointment is cancelled and the slot is released |

## EPIC-006: Health Data Protection & DPDP Alignment

Health data is treated as sensitive under India's Digital Personal Data Protection (DPDP) Act: access is restricted to the treating doctor, the patient, and admins; data is encrypted in transit and at rest; record access is audit-logged; and consent is captured at registration. Assumption: the exact DPDP controls are to be confirmed; the controls stated here are the agreed baseline.

### US-021: Restrict access to health records

**Priority:** critical

> As a clinic operator responsible for data protection, I want consultation records accessible only to the treating doctor, the patient, and admins, so that sensitive health data is not exposed to unauthorized users.

| ID | Given | When | Then |
|---|---|---|---|
| AC-052 | a consultation record exists | any user other than its patient, its treating doctor, or an admin requests it | access is denied |
| AC-053 | a doctor who did not treat the patient | they attempt to open that patient's consultation record | access is denied |

### US-022: Encrypt health data in transit and at rest

**Priority:** critical

> As a clinic operator responsible for data protection, I want health data protected by encryption in transit and at rest, so that data stays confidential even if intercepted or storage is accessed.

| ID | Given | When | Then |
|---|---|---|---|
| AC-054 | a user exchanges health data with the system | data travels over the network | the connection is encrypted in transit |
| AC-055 | consultation records and other sensitive personal data are stored | they are written to the database | they are protected by encryption at rest |

### US-023: Audit log of health-record access

**Priority:** high

> As a administrator, I want access to consultation records to be audit-logged, so that we can demonstrate who viewed sensitive data and when.

| ID | Given | When | Then |
|---|---|---|---|
| AC-056 | a user views a consultation record | the record is accessed | an audit entry capturing who, which record, and when is recorded |
| AC-057 | I am an administrator | I review the audit log | I can see record-access entries |

### US-024: Capture and store patient consent

**Priority:** high

> As a patient, I want my data-handling consent captured at registration and retained, so that the clinic has a record aligned with DPDP expectations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-058 | I register as a patient and accept the consent statement | my account is created | the consent, including its date, is stored with my account |
| AC-059 | an administrator reviews a patient account | they view consent status | they can see whether and when consent was given |

## EPIC-007: Setup & Usage Documentation

Basic documentation to install, configure, and operate the MVP. Credentials in documentation are shown only as placeholders (e.g. <database-password>, <set-at-first-login>), never real values.

### US-025: Setup documentation

**Priority:** medium

> As a operator deploying the system, I want a setup guide covering installation, database, and configuration, so that I can stand up the application for the clinic.

| ID | Given | When | Then |
|---|---|---|---|
| AC-060 | I have the setup documentation | I follow the steps for environment, database, and the initial admin account | I can run the application end to end |
| AC-061 | the documentation references credentials | I read configuration examples | secrets are shown only as placeholders such as <database-password>, never as real values |

### US-026: Usage documentation

**Priority:** low

> As a patient, doctor, or administrator, I want a usage guide for my role, so that I can perform the core tasks without hand-holding.

| ID | Given | When | Then |
|---|---|---|---|
| AC-062 | I have the usage documentation | I look up my role | I find steps for the core tasks (e.g. patient: search and book; doctor: set availability and record consultations; admin: manage doctors, specializations, and mapping) |
<!-- sdlc:auto:end epics -->
