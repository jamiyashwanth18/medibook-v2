// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { api } from "@/api/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Checkbox, Table, THead, TBody, TR, TH, TD, Avatar, Empty } =
  UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {
  Plus,
  Check,
  X,
  User,
  Settings,
  Home,
  FileText,
  Clock,
  Filter,
  Download,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} = Icons;

const INK = brand.primaryColor;
const CREAM = brand.backgroundColor;
const GOLD = brand.accentColor;

const toRgb = (hex) => {
  const h = String(hex).replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const rgba = (hex, a) => {
  const [r, g, b] = toRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const LINE = rgba(INK, 0.13);
const MUTED = rgba(INK, 0.78);
const PANEL = rgba(INK, 0.05);

const TODAY = "2026-11-24";

const TABS = [
  { key: "doctors", label: "Doctors", wf: "i-1-0-0", testId: "doctors-tab" },
  {
    key: "specializations",
    label: "Specializations",
    wf: "i-1-0-1",
    testId: "specializations-tab",
  },
  { key: "mapping", label: "Disease mapping", wf: "i-1-0-2", testId: "disease-mapping-tab" },
  { key: "appointments", label: "Appointments", wf: "i-1-0-3", testId: "appointments-tab" },
  { key: "consent", label: "Consent & audit", wf: "i-1-0-4", testId: "consent-audit-tab" },
];

const SPEC_SEED = [
  { id: "sp-1", name: "Cardiology", doctors: 4, terms: 6 },
  { id: "sp-2", name: "Dermatology", doctors: 2, terms: 3 },
  { id: "sp-3", name: "General Medicine", doctors: 5, terms: 11 },
  { id: "sp-4", name: "Orthopaedics", doctors: 2, terms: 4 },
  { id: "sp-5", name: "Paediatrics", doctors: 3, terms: 7 },
  { id: "sp-6", name: "Pulmonology", doctors: 1, terms: 5 },
  { id: "sp-7", name: "Endocrinology", doctors: 1, terms: 4 },
  { id: "sp-8", name: "Neurology", doctors: 2, terms: 5 },
];

const DOCTOR_SEED = [
  {
    id: "d-1",
    full_name: "Dr. Ananya Rao",
    email: "ananya.rao@medibook.clinic",
    credentials: "MBBS, MD (Cardiology)",
    specializations: ["Cardiology"],
    is_active: true,
    must_reset_password: false,
  },
  {
    id: "d-2",
    full_name: "Dr. Imran Qureshi",
    email: "imran.qureshi@medibook.clinic",
    credentials: "MBBS, DNB (Dermatology)",
    specializations: ["Dermatology"],
    is_active: true,
    must_reset_password: false,
  },
  {
    id: "d-3",
    full_name: "Dr. Meera Krishnan",
    email: "meera.krishnan@medibook.clinic",
    credentials: "MBBS, MD (General Medicine)",
    specializations: ["General Medicine", "Endocrinology"],
    is_active: true,
    must_reset_password: false,
  },
  {
    id: "d-4",
    full_name: "Dr. Sanjay Pillai",
    email: "sanjay.pillai@medibook.clinic",
    credentials: "MBBS, MS (Orthopaedics)",
    specializations: ["Orthopaedics"],
    is_active: false,
    must_reset_password: false,
  },
  {
    id: "d-5",
    full_name: "Dr. Fatima Noor",
    email: "fatima.noor@medibook.clinic",
    credentials: "MBBS, DCH",
    specializations: ["Paediatrics", "General Medicine"],
    is_active: true,
    must_reset_password: false,
  },
  {
    id: "d-6",
    full_name: "Dr. Vikram Sethi",
    email: "vikram.sethi@medibook.clinic",
    credentials: "MBBS, MD (Pulmonology)",
    specializations: ["Pulmonology"],
    is_active: true,
    must_reset_password: true,
  },
  {
    id: "d-7",
    full_name: "Dr. Neelam Joshi",
    email: "neelam.joshi@medibook.clinic",
    credentials: "MBBS, DM (Neurology)",
    specializations: ["Neurology"],
    is_active: true,
    must_reset_password: false,
  },
];

const MAPPING_SEED = [
  {
    id: "m-1",
    term: "chest pain",
    term_type: "symptom",
    specializations: ["Cardiology", "Pulmonology"],
  },
  {
    id: "m-2",
    term: "hypertension",
    term_type: "disease",
    specializations: ["Cardiology", "General Medicine"],
  },
  { id: "m-3", term: "eczema", term_type: "disease", specializations: ["Dermatology"] },
  {
    id: "m-4",
    term: "persistent cough",
    term_type: "symptom",
    specializations: ["Pulmonology", "General Medicine"],
  },
  {
    id: "m-5",
    term: "type 2 diabetes",
    term_type: "disease",
    specializations: ["Endocrinology", "General Medicine"],
  },
  { id: "m-6", term: "knee pain", term_type: "symptom", specializations: ["Orthopaedics"] },
  { id: "m-7", term: "migraine", term_type: "disease", specializations: ["Neurology"] },
  { id: "m-8", term: "hair fall", term_type: "symptom", specializations: ["Dermatology"] },
  { id: "m-9", term: "fever in children", term_type: "symptom", specializations: ["Paediatrics"] },
  { id: "m-10", term: "palpitations", term_type: "symptom", specializations: ["Cardiology"] },
];

const APPT_SEED = [
  {
    id: "AP-4819",
    patient: "Farhan Ali",
    doctor: "Dr. Imran Qureshi",
    date: "2026-11-23",
    time: "14:00",
    status: "completed",
  },
  {
    id: "AP-4820",
    patient: "Ritika Bose",
    doctor: "Dr. Sanjay Pillai",
    date: "2026-11-23",
    time: "17:00",
    status: "cancelled",
  },
  {
    id: "AP-4821",
    patient: "Priya Sharma",
    doctor: "Dr. Ananya Rao",
    date: "2026-11-24",
    time: "09:30",
    status: "booked",
  },
  {
    id: "AP-4822",
    patient: "Rahul Menon",
    doctor: "Dr. Meera Krishnan",
    date: "2026-11-24",
    time: "10:00",
    status: "completed",
  },
  {
    id: "AP-4823",
    patient: "Kavya Reddy",
    doctor: "Dr. Imran Qureshi",
    date: "2026-11-24",
    time: "10:30",
    status: "booked",
  },
  {
    id: "AP-4824",
    patient: "Arjun Nair",
    doctor: "Dr. Fatima Noor",
    date: "2026-11-24",
    time: "11:15",
    status: "no-show",
  },
  {
    id: "AP-4825",
    patient: "Deepa Varma",
    doctor: "Dr. Ananya Rao",
    date: "2026-11-24",
    time: "12:00",
    status: "cancelled",
  },
  {
    id: "AP-4826",
    patient: "Sameer Bhatt",
    doctor: "Dr. Vikram Sethi",
    date: "2026-11-24",
    time: "15:45",
    status: "booked",
  },
  {
    id: "AP-4827",
    patient: "Nisha Gupta",
    doctor: "Dr. Meera Krishnan",
    date: "2026-11-25",
    time: "09:00",
    status: "booked",
  },
  {
    id: "AP-4828",
    patient: "Tarun Shetty",
    doctor: "Dr. Neelam Joshi",
    date: "2026-11-25",
    time: "16:30",
    status: "booked",
  },
];

const AUDIT = [
  {
    id: "a-1",
    user: "Dr. Ananya Rao",
    role: "doctor",
    record: "CR-10482 · Priya Sharma, 18 Nov",
    action: "viewed",
    at: "24 Nov 2026, 09:14",
  },
  {
    id: "a-2",
    user: "Priya Sharma",
    role: "patient",
    record: "CR-10482 · Priya Sharma, 18 Nov",
    action: "downloaded pdf",
    at: "24 Nov 2026, 08:47",
  },
  {
    id: "a-3",
    user: "Rahul Menon",
    role: "administrator",
    record: "CR-10455 · Arjun Nair, 11 Nov",
    action: "viewed",
    at: "23 Nov 2026, 18:02",
  },
  {
    id: "a-4",
    user: "Dr. Meera Krishnan",
    role: "doctor",
    record: "CR-10501 · Nisha Gupta, 23 Nov",
    action: "created",
    at: "23 Nov 2026, 16:35",
  },
  {
    id: "a-5",
    user: "Dr. Vikram Sethi",
    role: "doctor",
    record: "CR-10482 · Priya Sharma, 18 Nov",
    action: "access denied",
    at: "23 Nov 2026, 15:12",
  },
  {
    id: "a-6",
    user: "Dr. Imran Qureshi",
    role: "doctor",
    record: "CR-10477 · Farhan Ali, 23 Nov",
    action: "viewed",
    at: "23 Nov 2026, 14:28",
  },
];

// AC-059: the id of the patient this demo clinic's consent-audit card looks up. There is
// no patient directory in this story's scope, so the card always reads this one account's
// consent back from the server rather than from anything typed on this screen.
const CONSENT_PATIENT_ID = "pt-10482";

const CONSENT_PATIENT = {
  name: "Priya Sharma",
  email: "priya.sharma@inbox.example",
};

const fmtDate = (iso) => {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

// The consent endpoint returns a full timestamp, not a bare date, so it is parsed
// directly rather than through fmtDate's "append a time" trick.
const fmtConsentDate = (iso) => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const STATUS_META = {
  booked: { label: "booked", icon: "Clock", strong: true },
  completed: { label: "completed", icon: "CheckCircle", strong: false },
  cancelled: { label: "cancelled", icon: "X", strong: false },
  "no-show": { label: "no-show", icon: "AlertCircle", strong: false },
};

const Motif = () => (
  <svg
    width="26"
    height="30"
    viewBox="0 0 26 30"
    aria-hidden="true"
    focusable="false"
    style={{ display: "block" }}
  >
    <path
      d="M2 29V13.5a11 11 0 0 1 22 0V29"
      fill="none"
      stroke={GOLD}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path d="M13 29V8.5" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M13 16.5c-4.2 0-6.4-2.6-6.6-6.6 4.2 0 6.4 2.6 6.6 6.6Z" fill={rgba(GOLD, 0.4)} />
    <path d="M13 12.5c3.4 0 5.2-2.1 5.4-5.4-3.4 0-5.2 2.1-5.4 5.4Z" fill={rgba(GOLD, 0.25)} />
  </svg>
);

const Panel = ({ arch, className, children, ...rest }) => (
  <section
    className={"relative px-5 pb-8 pt-9 sm:px-9 sm:pb-10 sm:pt-11 " + (className || "")}
    style={{
      backgroundColor: PANEL,
      border: "1px solid " + LINE,
      borderRadius:
        (arch || 110) + "px " + (arch || 110) + "px " + brand.radius + " " + brand.radius,
    }}
    {...rest}
  >
    {children}
  </section>
);

const PanelHead = ({ title, children, id }) => (
  <header className="mb-7 flex flex-col items-center text-center">
    <Motif />
    <h2
      id={id}
      className="mt-3 text-[21px] leading-tight sm:text-[24px]"
      style={{ fontFamily: brand.fontHeading, fontStyle: "italic", color: INK }}
    >
      {title}
    </h2>
    {children ? (
      <p className="mt-2 max-w-[58ch] text-[13px] leading-relaxed" style={{ color: MUTED }}>
        {children}
      </p>
    ) : null}
  </header>
);

export default function Screen() {
  const [tab, setTab] = React.useState("doctors");
  const [notice, setNotice] = React.useState(null);

  const [doctors, setDoctors] = React.useState(DOCTOR_SEED);
  const [selDoctor, setSelDoctor] = React.useState("d-4");
  const [confirmDoctor, setConfirmDoctor] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [df, setDf] = React.useState({ full_name: "", email: "", credentials: "" });
  const [dfSpecs, setDfSpecs] = React.useState([]);
  const [dfError, setDfError] = React.useState("");
  const [savingDoctor, setSavingDoctor] = React.useState(false);
  const [newDoctorIds, setNewDoctorIds] = React.useState([]);

  const [specs, setSpecs] = React.useState(SPEC_SEED);
  const [specName, setSpecName] = React.useState("");
  const [specError, setSpecError] = React.useState("");
  const [confirmSpec, setConfirmSpec] = React.useState(null);

  const [mappings, setMappings] = React.useState(MAPPING_SEED);
  const [confirmMap, setConfirmMap] = React.useState(null);

  const [appts, setAppts] = React.useState(APPT_SEED);
  const [fDoctor, setFDoctor] = React.useState("all");
  const [fDate, setFDate] = React.useState(TODAY);
  const [fStatus, setFStatus] = React.useState("all");
  const [selAppt, setSelAppt] = React.useState("AP-4821");
  const [confirmAppt, setConfirmAppt] = React.useState(false);

  // AC-059: whether and when CONSENT_PATIENT_ID's consent was given, read from the
  // account record itself rather than assumed from anything on this screen.
  const [consentState, setConsentState] = React.useState({ status: "loading", data: null });

  const nameRef = React.useRef(null);
  const timers = React.useRef([]);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => clearTimeout(t));
  }, []);

  React.useEffect(() => {
    if (formOpen && nameRef.current) nameRef.current.focus();
  }, [formOpen]);

  // AC-059: fetched once the admin opens the consent & audit tab, through the generated
  // client only, never assumed from the patient registration flow.
  React.useEffect(() => {
    if (tab !== "consent" || consentState.status !== "loading") return;
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await api.GET("/admin/patients/{id}/consent", {
          params: { path: { id: CONSENT_PATIENT_ID } },
        });
        if (cancelled) return;
        if (error || !data) {
          setConsentState({ status: "error", data: null });
          return;
        }
        setConsentState({ status: "loaded", data });
      } catch {
        if (!cancelled) setConsentState({ status: "error", data: null });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tab, consentState.status]);

  const retryConsentLoad = () => setConsentState({ status: "loading", data: null });

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const goTab = (key) => {
    setTab(key);
    setNotice(null);
    setConfirmDoctor(false);
    setConfirmAppt(false);
    setConfirmSpec(null);
    setConfirmMap(null);
  };

  const onTabKey = (e, idx) => {
    let next = null;
    if (e.key === "ArrowRight") next = (idx + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    goTab(TABS[next].key);
    const el = document.getElementById("atr-tab-" + TABS[next].key);
    if (el) el.focus();
  };

  /* ---------- doctors ---------- */
  const selectedDoctor = doctors.find((d) => d.id === selDoctor) || null;

  const toggleDfSpec = (name) => {
    setDfSpecs((cur) => (cur.includes(name) ? cur.filter((s) => s !== name) : cur.concat(name)));
    setDfError("");
  };

  const submitDoctor = async (e) => {
    e.preventDefault();
    if (savingDoctor) return;
    const full_name = df.full_name.trim();
    const email = df.email.trim();
    const credentials = df.credentials.trim();
    if (!full_name || !email || !credentials) {
      setDfError("name, email and credentials are all needed before this account can be saved.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDfError("that email address does not look complete — check for a missing @ or domain.");
      return;
    }
    // AC-010: the account cannot be saved until at least one specialization is assigned.
    if (dfSpecs.length === 0) {
      setDfError("Assign at least one specialization before saving");
      return;
    }
    setDfError("");
    setSavingDoctor(true);
    try {
      // AC-009: name, email, credentials and specializations are provisioned through the
      // real API; the server sets the first-login password, never this form.
      const { data, error } = await api.POST("/admin/doctors", {
        body: {
          fullName: full_name,
          email,
          credentials,
          specializations: dfSpecs.slice(),
        },
      });
      if (error || !data) {
        const code = error?.detail?.code;
        if (code === "SPECIALIZATION_REQUIRED") {
          setDfError("Assign at least one specialization before saving");
        } else if (code === "EMAIL_ALREADY_REGISTERED") {
          setDfError(email + " is already in use by another account on this clinic.");
        } else {
          setDfError("we could not create this account — try again.");
        }
        setSavingDoctor(false);
        return;
      }
      setDoctors((cur) =>
        [
          {
            id: data.id,
            full_name: data.fullName,
            email: data.email,
            credentials: data.credentials,
            specializations: data.specializations.slice(),
            is_active: true,
            must_reset_password: true,
          },
        ].concat(cur),
      );
      setSpecs((cur) =>
        cur.map((s) =>
          dfSpecs.includes(s.name) ? Object.assign({}, s, { doctors: s.doctors + 1 }) : s,
        ),
      );
      setNewDoctorIds((cur) => cur.concat(data.id));
      setSelDoctor(data.id);
      setSavingDoctor(false);
      setFormOpen(false);
      setDf({ full_name: "", email: "", credentials: "" });
      setDfSpecs([]);
      setNotice({ tone: "success", text: "Doctor account created" });
    } catch {
      setSavingDoctor(false);
      setDfError("we could not create this account — try again.");
    }
  };

  const doDeactivate = () => {
    if (!selectedDoctor) return;
    setDoctors((cur) =>
      cur.map((d) => (d.id === selectedDoctor.id ? Object.assign({}, d, { is_active: false }) : d)),
    );
    setConfirmDoctor(false);
    setNotice({ tone: "success", text: "Doctor deactivated and sessions ended" });
  };

  /* ---------- specializations ---------- */
  const submitSpec = (e) => {
    e.preventDefault();
    const name = specName.trim();
    if (!name) {
      setSpecError('give the specialization a name, for example "Nephrology".');
      return;
    }
    if (specs.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      setSpecError(name + " is already on the list.");
      return;
    }
    setSpecError("");
    setSpecs((cur) =>
      cur.concat({ id: "sp-" + Date.now().toString(36), name, doctors: 0, terms: 0, isNew: true }),
    );
    setSpecName("");
    setNotice({
      tone: "success",
      text: name + " added — it can now be assigned to doctors and mapping terms.",
    });
  };

  const removeSpec = (id) => {
    const s = specs.find((x) => x.id === id);
    setSpecs((cur) => cur.filter((x) => x.id !== id));
    setConfirmSpec(null);
    setNotice({
      tone: "success",
      text: (s ? s.name : "the specialization") + " removed from the list.",
    });
  };

  const removeMapping = (id) => {
    const m = mappings.find((x) => x.id === id);
    setMappings((cur) => cur.filter((x) => x.id !== id));
    setConfirmMap(null);
    setNotice({
      tone: "success",
      text:
        "“" +
        (m ? m.term : "term") +
        "” removed — patient searches for it will now return no results.",
    });
  };

  /* ---------- appointments ---------- */
  const filtered = appts.filter((a) => {
    if (fDoctor !== "all" && a.doctor !== fDoctor) return false;
    if (fDate && a.date !== fDate) return false;
    if (fStatus !== "all" && a.status !== fStatus) return false;
    return true;
  });

  const selectedAppt = appts.find((a) => a.id === selAppt) || null;
  const apptIsPast = selectedAppt ? selectedAppt.date < TODAY : false;
  const cancelBlockReason = !selectedAppt
    ? "choose an appointment row to cancel it."
    : selectedAppt.status !== "booked"
      ? "only booked appointments can be cancelled — " +
        selectedAppt.id +
        " is already " +
        selectedAppt.status +
        "."
      : apptIsPast
        ? "past the cut-off window: " +
          selectedAppt.id +
          " was on " +
          fmtDate(selectedAppt.date) +
          " and can no longer be cancelled."
        : "";

  const doCancelAppt = () => {
    if (!selectedAppt) return;
    setAppts((cur) =>
      cur.map((a) =>
        a.id === selectedAppt.id ? Object.assign({}, a, { status: "cancelled" }) : a,
      ),
    );
    setConfirmAppt(false);
    setNotice({ tone: "success", text: "Appointment cancelled and slot released" });
  };

  /* ---------- shared bits ---------- */
  const Icon = (name, cls) => {
    const C = Icons[name];
    return C ? <C className={cls || "h-4 w-4"} aria-hidden="true" /> : null;
  };

  const statusBadge = (status) => {
    const meta = STATUS_META[status] || { label: status, icon: "Clock" };
    return (
      <span
        className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1 text-[12px] font-medium"
        style={{
          borderRadius: "999px",
          backgroundColor: meta.strong ? rgba(GOLD, 0.26) : rgba(INK, 0.07),
          color: INK,
          border: "1px solid " + (meta.strong ? rgba(GOLD, 0.5) : LINE),
        }}
      >
        {Icon(meta.icon, "h-3.5 w-3.5")}
        {meta.label}
      </span>
    );
  };

  const pill = (text, key) => (
    <span
      key={key}
      className="inline-block px-3 py-1 text-[12px]"
      style={{ borderRadius: "999px", backgroundColor: rgba(INK, 0.08), color: INK }}
    >
      {text}
    </span>
  );

  const primaryBtnStyle = {
    backgroundColor: INK,
    color: CREAM,
    borderRadius: "999px",
    border: "1px solid " + INK,
    minHeight: "44px",
  };
  const quietBtnStyle = {
    backgroundColor: "transparent",
    color: INK,
    borderRadius: "999px",
    border: "1px solid " + rgba(INK, 0.3),
    minHeight: "44px",
  };

  const ConfirmBar = ({ title, body, confirmLabel, onConfirm, onCancel }) => (
    <div
      className="atr-rise mt-5 flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
      style={{
        backgroundColor: rgba(GOLD, 0.16),
        border: "1px solid " + rgba(GOLD, 0.5),
        borderRadius: brand.radius,
      }}
      role="group"
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === "Escape") onCancel();
      }}
    >
      <div className="flex items-start gap-3">
        <span style={{ color: INK }}>{Icon("AlertCircle", "h-5 w-5 mt-0.5")}</span>
        <div>
          <p className="text-[14px] font-semibold" style={{ color: INK }}>
            {title}
          </p>
          <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed" style={{ color: MUTED }}>
            {body}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-3">
        <UIButtonSafe
          className="atr-focus px-5 text-[13px]"
          style={quietBtnStyle}
          onClick={onCancel}
        >
          keep as is
        </UIButtonSafe>
        <UIButtonSafe
          className="atr-focus px-5 text-[13px]"
          style={primaryBtnStyle}
          onClick={onConfirm}
          autoFocus
        >
          {confirmLabel}
        </UIButtonSafe>
      </div>
    </div>
  );

  function UIButtonSafe(props) {
    return <Button {...props} />;
  }

  const css = `
    .atr-scope { --atr-ink: ${INK}; --atr-line: ${LINE}; --atr-cream: ${CREAM}; --atr-gold: ${GOLD}; }
    .atr-scope table { font-variant-numeric: tabular-nums; width: 100%; border-collapse: collapse; }
    .atr-scope .atr-num { font-variant-numeric: tabular-nums; }
    .atr-scope .atr-field {
      width: 100%; height: 44px; padding: 0 18px; font-size: 14px;
      border-radius: 999px; border: 1px solid var(--atr-line);
      background: var(--atr-cream); color: var(--atr-ink);
    }
    .atr-scope select.atr-field { padding-right: 36px; }
    .atr-scope .atr-field::placeholder { color: ${rgba(INK, 0.45)}; }
    .atr-scope .atr-field:hover { border-color: ${rgba(GOLD, 0.55)}; }
    .atr-scope .atr-field:focus, .atr-scope .atr-field:focus-visible {
      outline: 2px solid var(--atr-gold); outline-offset: 2px; border-color: var(--atr-gold);
    }
    .atr-scope .atr-focus:focus-visible { outline: 2px solid var(--atr-gold); outline-offset: 3px; }
    .atr-scope .atr-row { border-top: 1px solid var(--atr-line); transition: background-color .18s ease; }
    .atr-scope .atr-row:hover { background: ${rgba(INK, 0.045)}; }
    .atr-scope .atr-row-sel { background: ${rgba(GOLD, 0.14)}; }
    .atr-scope .atr-row-sel:hover { background: ${rgba(GOLD, 0.18)}; }
    .atr-scope .atr-th { text-align: left; font-size: 11.5px; letter-spacing: .09em; text-transform: uppercase; color: ${MUTED}; font-weight: 600; padding: 0 0 12px 0; }
    .atr-scope .atr-td { padding: 16px 16px 16px 0; font-size: 14px; color: var(--atr-ink); vertical-align: middle; }
    .atr-scope .atr-rise { animation: atr-rise .34s cubic-bezier(.22,.61,.36,1) both; }
    @keyframes atr-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    .atr-scope .atr-dot { width: 7px; height: 7px; border-radius: 999px; background: ${GOLD}; animation: atr-pulse 2.6s ease-in-out infinite; }
    @keyframes atr-pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      .atr-scope *, .atr-scope *::before, .atr-scope *::after {
        animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important;
      }
    }
  `;

  const noticeBlock = notice ? (
    <div
      role="status"
      className="atr-rise mb-7 flex items-start gap-3 px-6 py-4"
      style={{
        backgroundColor: notice.tone === "error" ? rgba(GOLD, 0.18) : rgba(INK, 0.07),
        border: "1px solid " + (notice.tone === "error" ? rgba(GOLD, 0.5) : LINE),
        borderRadius: brand.radius,
      }}
    >
      <span style={{ color: INK }} className="mt-0.5">
        {Icon(notice.tone === "error" ? "AlertCircle" : "CheckCircle", "h-5 w-5")}
      </span>
      <p className="flex-1 text-[13.5px] leading-relaxed" style={{ color: INK }}>
        {notice.text}
      </p>
      <button
        type="button"
        className="atr-focus shrink-0 rounded-full p-1.5"
        aria-label="dismiss message"
        style={{ color: INK }}
        onClick={() => setNotice(null)}
      >
        {Icon("X", "h-4 w-4")}
      </button>
    </div>
  ) : null;

  /* ================= panels ================= */

  const doctorsPanel = (
    <div className="grid grid-cols-12 gap-7">
      <div className="col-span-12">
        <Panel data-wf="b-2-0" aria-labelledby="h-doctors">
          <PanelHead title="Doctor accounts" id="h-doctors">
            seven accounts on the roster. select a row to act on it — doctors never self-register.
          </PanelHead>
          {doctors.length === 0 ? (
            <Empty
              title="the roster is empty"
              description="add the clinic's first doctor account to start listing consultation slots to patients."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table data-testid="doctor-accounts-table" aria-label="Doctor accounts">
                <THead>
                  <TR>
                    <TH className="atr-th w-12">
                      <span className="sr-only">select</span>
                    </TH>
                    <TH className="atr-th" data-wf="i-2-0-0">
                      Full name
                    </TH>
                    <TH className="atr-th" data-wf="i-2-0-1">
                      Email
                    </TH>
                    <TH className="atr-th" data-wf="i-2-0-2">
                      Credentials
                    </TH>
                    <TH className="atr-th" data-wf="i-2-0-3">
                      Specializations
                    </TH>
                    <TH className="atr-th" data-wf="i-2-0-4">
                      Active
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {doctors.map((d) => (
                    <TR
                      key={d.id}
                      className={
                        "atr-row " +
                        (selDoctor === d.id ? "atr-row-sel " : "") +
                        (newDoctorIds.includes(d.id) ? "atr-rise" : "")
                      }
                    >
                      <TD className="atr-td pl-4">
                        <input
                          type="radio"
                          name="doctor-select"
                          className="atr-focus h-4 w-4"
                          style={{ accentColor: GOLD }}
                          checked={selDoctor === d.id}
                          onChange={() => {
                            setSelDoctor(d.id);
                            setConfirmDoctor(false);
                          }}
                          aria-label={"select " + d.full_name}
                        />
                      </TD>
                      <TD className="atr-td">
                        <div className="flex items-center gap-3">
                          <Avatar name={d.full_name} className="h-9 w-9" />
                          <div>
                            <span className="font-semibold">{d.full_name}</span>
                            {d.must_reset_password ? (
                              <span className="block text-[12px]" style={{ color: MUTED }}>
                                first-login reset pending
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </TD>
                      <TD className="atr-td" style={{ color: MUTED }}>
                        {d.email}
                      </TD>
                      <TD className="atr-td">{d.credentials}</TD>
                      <TD className="atr-td">
                        <span className="flex flex-wrap gap-1.5">
                          {d.specializations.map((s) => pill(s, d.id + s))}
                        </span>
                      </TD>
                      <TD className="atr-td">
                        <span
                          className="inline-flex items-center gap-1.5 text-[13px]"
                          style={{ color: INK }}
                        >
                          {Icon(d.is_active ? "Check" : "X", "h-4 w-4")}
                          {d.is_active ? "Yes" : "No"}
                        </span>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          )}
        </Panel>
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-3">
        <Button
          data-wf="b-3-0"
          className="atr-focus w-full justify-center gap-2 px-6 text-[14px] font-semibold"
          style={primaryBtnStyle}
          aria-expanded={formOpen}
          aria-controls="new-doctor-form"
          onClick={() => {
            setFormOpen(true);
            setNotice(null);
            if (formOpen && nameRef.current) nameRef.current.focus();
          }}
        >
          {Icon("Plus", "h-4 w-4")}
          Add doctor
        </Button>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-3">
        <Button
          data-wf="b-3-1"
          data-testid="deactivate-doctor-btn"
          className="atr-focus w-full justify-center px-6 text-[14px]"
          style={Object.assign({}, quietBtnStyle, {
            opacity: !selectedDoctor || !selectedDoctor.is_active ? 0.5 : 1,
            cursor: !selectedDoctor || !selectedDoctor.is_active ? "not-allowed" : "pointer",
          })}
          disabled={!selectedDoctor || !selectedDoctor.is_active}
          onClick={() => {
            setNotice(null);
            setConfirmDoctor(true);
          }}
        >
          Deactivate doctor
        </Button>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <p className="text-[13px] leading-relaxed" aria-live="polite" style={{ color: MUTED }}>
          {!selectedDoctor
            ? "select a doctor in the roster above to deactivate them."
            : !selectedDoctor.is_active
              ? selectedDoctor.full_name + " is already deactivated — nothing to do here."
              : "deactivating " +
                selectedDoctor.full_name +
                " hides them from patient search and ends their sessions."}
        </p>
      </div>

      {confirmDoctor && selectedDoctor ? (
        <div className="col-span-12">
          <ConfirmBar
            title={"deactivate " + selectedDoctor.full_name + "?"}
            body="they drop out of patient search immediately, their open sessions end, and already-booked appointments stay on the schedule for you to reassign."
            confirmLabel="deactivate doctor"
            onConfirm={doDeactivate}
            onCancel={() => setConfirmDoctor(false)}
          />
        </div>
      ) : null}

      <div className="col-span-12 lg:col-span-6">
        <Panel data-wf="b-4-0" arch={90} aria-labelledby="h-newdoc">
          <PanelHead title="New doctor account" id="h-newdoc">
            created by an administrator only — the public registration flow makes patient accounts
            and nothing else.
          </PanelHead>

          {!formOpen ? (
            <div className="flex flex-col items-center gap-4 pb-2 text-center">
              <p className="max-w-[46ch] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
                choose <span style={{ color: INK, fontWeight: 600 }}>add doctor</span> above to open
                the form. you will need their credentials and at least one specialization.
              </p>
            </div>
          ) : (
            <form
              id="new-doctor-form"
              data-testid="new-doctor-account-form"
              className="atr-rise space-y-6"
              onSubmit={submitDoctor}
              noValidate
            >
              {dfError ? (
                <div
                  className="flex items-start gap-3 px-5 py-4"
                  role="alert"
                  style={{
                    backgroundColor: rgba(GOLD, 0.18),
                    border: "1px solid " + rgba(GOLD, 0.5),
                    borderRadius: brand.radius,
                  }}
                >
                  <span style={{ color: INK }} className="mt-0.5">
                    {Icon("AlertCircle", "h-4 w-4")}
                  </span>
                  <p className="text-[13px] leading-relaxed" style={{ color: INK }}>
                    {dfError}
                  </p>
                </div>
              ) : null}

              <div>
                <Label
                  htmlFor="nd-name"
                  className="mb-2 block text-[13px] font-semibold"
                  style={{ color: INK }}
                >
                  Full name
                </Label>
                <Input
                  id="nd-name"
                  data-wf="i-4-0-0"
                  data-testid="full-name-input"
                  ref={nameRef}
                  className="atr-field"
                  placeholder="Dr. Leela Mathew"
                  value={df.full_name}
                  onChange={(e) => setDf(Object.assign({}, df, { full_name: e.target.value }))}
                />
              </div>

              <div>
                <Label
                  htmlFor="nd-email"
                  className="mb-2 block text-[13px] font-semibold"
                  style={{ color: INK }}
                >
                  Email
                </Label>
                <Input
                  id="nd-email"
                  data-wf="i-4-0-1"
                  data-testid="email-input"
                  type="email"
                  className="atr-field"
                  placeholder="leela.mathew@medibook.clinic"
                  value={df.email}
                  onChange={(e) => setDf(Object.assign({}, df, { email: e.target.value }))}
                />
              </div>

              <div>
                <Label
                  htmlFor="nd-creds"
                  className="mb-2 block text-[13px] font-semibold"
                  style={{ color: INK }}
                >
                  Credentials
                </Label>
                <Input
                  id="nd-creds"
                  data-wf="i-4-0-2"
                  data-testid="credentials-input"
                  className="atr-field"
                  placeholder="MBBS, MD (Nephrology)"
                  value={df.credentials}
                  onChange={(e) => setDf(Object.assign({}, df, { credentials: e.target.value }))}
                />
              </div>

              <fieldset
                data-wf="i-4-0-3"
                data-testid="specializations-input"
                className="border-0 p-0"
              >
                <legend className="mb-3 text-[13px] font-semibold" style={{ color: INK }}>
                  Specializations
                </legend>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {specs.map((s) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <Checkbox
                        id={"nd-sp-" + s.id}
                        className="atr-focus"
                        style={{ accentColor: GOLD }}
                        checked={dfSpecs.includes(s.name)}
                        onChange={() => toggleDfSpec(s.name)}
                      />
                      <Label
                        htmlFor={"nd-sp-" + s.id}
                        className="text-[13.5px]"
                        style={{ color: INK }}
                      >
                        {s.name}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[12.5px]" style={{ color: MUTED }}>
                  at least one is required — it is how patient searches reach this doctor.
                </p>
              </fieldset>

              <div>
                <Label
                  htmlFor="nd-pw"
                  className="mb-2 block text-[13px] font-semibold"
                  style={{ color: INK }}
                >
                  First-login password
                </Label>
                <Input
                  id="nd-pw"
                  data-wf="i-4-0-4"
                  data-testid="first-login-password-set-at-first-input"
                  className="atr-field"
                  readOnly
                  value="<set-at-first-login>"
                  style={{ backgroundColor: rgba(INK, 0.06), color: MUTED }}
                  aria-describedby="nd-pw-hint"
                />
                <p id="nd-pw-hint" className="mt-2 text-[12.5px]" style={{ color: MUTED }}>
                  the doctor chooses their own password at first sign-in. nothing is stored in plain
                  text.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  type="submit"
                  data-testid="add-doctor-btn"
                  className="atr-focus px-7 text-[14px] font-semibold"
                  style={Object.assign({}, primaryBtnStyle, { opacity: savingDoctor ? 0.7 : 1 })}
                  disabled={savingDoctor}
                >
                  {savingDoctor ? "saving account…" : "create doctor account"}
                </Button>
                <Button
                  type="button"
                  className="atr-focus px-6 text-[13px]"
                  style={quietBtnStyle}
                  onClick={() => {
                    setFormOpen(false);
                    setDfError("");
                  }}
                >
                  close form
                </Button>
              </div>
            </form>
          )}
        </Panel>
      </div>
    </div>
  );

  const specsPanel = (
    <div className="grid grid-cols-12 gap-7">
      <div className="col-span-12 lg:col-span-6">
        <Panel data-wf="b-4-1" arch={90} aria-labelledby="h-spec-form">
          <PanelHead title="Specializations" id="h-spec-form">
            the list doctors and mapping terms both draw from. keep the wording the way patients
            would read it.
          </PanelHead>
          <form
            data-testid="specializations-form"
            className="space-y-5"
            onSubmit={submitSpec}
            noValidate
          >
            {specError ? (
              <div
                role="alert"
                className="flex items-start gap-3 px-5 py-4"
                style={{
                  backgroundColor: rgba(GOLD, 0.18),
                  border: "1px solid " + rgba(GOLD, 0.5),
                  borderRadius: brand.radius,
                }}
              >
                <span style={{ color: INK }} className="mt-0.5">
                  {Icon("AlertCircle", "h-4 w-4")}
                </span>
                <p className="text-[13px] leading-relaxed" style={{ color: INK }}>
                  {specError}
                </p>
              </div>
            ) : null}
            <div>
              <Label
                htmlFor="sp-name"
                className="mb-2 block text-[13px] font-semibold"
                style={{ color: INK }}
              >
                Specialization name
              </Label>
              <Input
                id="sp-name"
                data-wf="i-4-1-0"
                data-testid="specialization-name-input"
                className="atr-field"
                placeholder="Nephrology"
                value={specName}
                onChange={(e) => {
                  setSpecName(e.target.value);
                  setSpecError("");
                }}
              />
            </div>
            <Button
              type="submit"
              className="atr-focus px-7 text-[14px] font-semibold"
              style={primaryBtnStyle}
            >
              add specialization
            </Button>
          </form>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-6">
        <Panel data-wf="b-5-0" arch={90} aria-labelledby="h-spec-list">
          <PanelHead title="Specialization list" id="h-spec-list">
            counts show what depends on each entry before you remove it.
          </PanelHead>
          {specs.length === 0 ? (
            <Empty
              title="no specializations yet"
              description="add the first specialization on the left — doctors and mapping terms both need one to exist."
            />
          ) : (
            <ul data-testid="specialization-list" className="atr-num">
              {specs.map((s, i) => (
                <li
                  key={s.id}
                  data-wf={i < 3 ? "i-5-0-" + i : undefined}
                  className={
                    "atr-row flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between " +
                    (s.isNew ? "atr-rise" : "")
                  }
                >
                  <div>
                    <p className="text-[15px] font-semibold" style={{ color: INK }}>
                      {s.name}
                    </p>
                    <p className="mt-1 text-[12.5px]" style={{ color: MUTED }}>
                      {s.doctors === 0 && s.terms === 0
                        ? "not yet assigned to a doctor or mapping term"
                        : s.doctors + " doctors, " + s.terms + " mapping terms"}
                    </p>
                  </div>
                  <Button
                    className="atr-focus shrink-0 px-5 text-[13px]"
                    style={quietBtnStyle}
                    onClick={() => {
                      if (s.doctors > 0 || s.terms > 0) {
                        setConfirmSpec(null);
                        setNotice({
                          tone: "error",
                          text: "Specialization is in use by doctors or mapping entries",
                        });
                        return;
                      }
                      setConfirmSpec(confirmSpec === s.id ? null : s.id);
                    }}
                    aria-label={"remove " + s.name}
                  >
                    remove
                  </Button>
                  {confirmSpec === s.id ? (
                    <div className="w-full sm:w-auto sm:basis-full">
                      <ConfirmBar
                        title={"remove " + s.name + "?"}
                        body={
                          s.doctors === 0 && s.terms === 0
                            ? "nothing depends on this entry, so removing it is safe."
                            : s.name +
                              " is used by " +
                              s.doctors +
                              " doctor accounts and " +
                              s.terms +
                              " mapping terms. removing it unlinks all of them and those searches stop resolving."
                        }
                        confirmLabel="remove anyway"
                        onConfirm={() => removeSpec(s.id)}
                        onCancel={() => setConfirmSpec(null)}
                      />
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );

  const mappingPanel = (
    <div className="grid grid-cols-12 gap-7">
      <div className="col-span-12 lg:col-span-7">
        <Panel data-wf="b-5-1" arch={90} aria-labelledby="h-map">
          <PanelHead title="Disease / symptom mapping" id="h-map">
            the fixed lookup behind patient search. a term resolves to specializations from this
            table only — no prediction, no guessing.
          </PanelHead>
          {mappings.length === 0 ? (
            <Empty
              title="the mapping table is empty"
              description="until a term is listed here, patient searches by disease or symptom return nothing."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table
                data-testid="disease-symptom-mapping-table"
                aria-label="Disease and symptom mapping"
              >
                <THead>
                  <TR>
                    <TH className="atr-th" data-wf="i-5-1-0">
                      Term
                    </TH>
                    <TH className="atr-th" data-wf="i-5-1-1">
                      Term type
                    </TH>
                    <TH className="atr-th" data-wf="i-5-1-2">
                      Specializations
                    </TH>
                    <TH className="atr-th text-right">
                      <span className="sr-only">row actions</span>
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {mappings.map((m) => (
                    <TR key={m.id} className="atr-row">
                      <TD className="atr-td font-medium">{m.term}</TD>
                      <TD className="atr-td">
                        <span
                          className="inline-flex items-center px-3 py-1 text-[12px]"
                          style={{
                            borderRadius: "999px",
                            backgroundColor: rgba(INK, 0.07),
                            color: INK,
                            border: "1px solid " + LINE,
                          }}
                        >
                          {m.term_type}
                        </span>
                      </TD>
                      <TD className="atr-td">
                        <span className="flex flex-wrap gap-1.5">
                          {m.specializations.map((s) => pill(s, m.id + s))}
                        </span>
                      </TD>
                      <TD className="atr-td text-right">
                        <Button
                          className="atr-focus px-4 text-[12.5px]"
                          style={quietBtnStyle}
                          onClick={() => setConfirmMap(confirmMap === m.id ? null : m.id)}
                          aria-label={"remove mapping term " + m.term}
                        >
                          remove
                        </Button>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          )}
          {confirmMap ? (
            <ConfirmBar
              title={
                "remove “" +
                (mappings.find((m) => m.id === confirmMap) || {}).term +
                "” from the mapping?"
              }
              body="patients typing this term will see the no-results message instead of a doctor list. you can add it again later."
              confirmLabel="remove term"
              onConfirm={() => removeMapping(confirmMap)}
              onCancel={() => setConfirmMap(null)}
            />
          ) : null}
        </Panel>
      </div>
    </div>
  );

  const apptPanel = (
    <div className="grid grid-cols-12 gap-7">
      <div className="col-span-12">
        <div
          data-wf="b-6-0"
          className="flex flex-col gap-5 px-6 py-6 sm:px-8 lg:flex-row lg:items-end lg:gap-8"
          style={{
            backgroundColor: rgba(INK, 0.07),
            border: "1px solid " + LINE,
            borderRadius: "999px",
          }}
        >
          <div className="flex items-center gap-2 pb-1" style={{ color: INK }}>
            {Icon("Filter", "h-4 w-4")}
            <span className="text-[12px] font-semibold uppercase tracking-[0.09em]">filter</span>
          </div>
          <div className="flex-1">
            <Label
              htmlFor="f-doctor"
              className="mb-2 block text-[12.5px] font-semibold"
              style={{ color: INK }}
            >
              Doctor
            </Label>
            <Select
              id="f-doctor"
              data-wf="i-6-0-0"
              data-testid="doctor-all-select"
              className="atr-field"
              value={fDoctor}
              onChange={(e) => {
                setFDoctor(e.target.value);
                setConfirmAppt(false);
              }}
            >
              <option value="all">All</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.full_name}>
                  {d.full_name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex-1">
            <Label
              htmlFor="f-date"
              className="mb-2 block text-[12.5px] font-semibold"
              style={{ color: INK }}
            >
              Date
            </Label>
            <Input
              id="f-date"
              data-wf="i-6-0-1"
              data-testid="date-24-nov-2026-select"
              type="date"
              className="atr-field atr-num"
              value={fDate}
              onChange={(e) => {
                setFDate(e.target.value);
                setConfirmAppt(false);
              }}
              aria-describedby="f-date-hint"
            />
            <p id="f-date-hint" className="mt-2 text-[12px]" style={{ color: MUTED }}>
              clear the date to see every day
            </p>
          </div>
          <div className="flex-1">
            <Label
              htmlFor="f-status"
              className="mb-2 block text-[12.5px] font-semibold"
              style={{ color: INK }}
            >
              Status
            </Label>
            <Select
              id="f-status"
              data-wf="i-6-0-2"
              data-testid="status-all-select"
              className="atr-field"
              value={fStatus}
              onChange={(e) => {
                setFStatus(e.target.value);
                setConfirmAppt(false);
              }}
            >
              <option value="all">All</option>
              <option value="booked">Booked</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No-show</option>
            </Select>
          </div>
          <div className="flex items-center gap-2 pb-3 lg:pb-4">
            <span className="atr-dot" aria-hidden="true" />
            <p
              className="atr-num text-[12.5px] whitespace-nowrap"
              style={{ color: MUTED }}
              aria-live="polite"
            >
              {filtered.length} of {appts.length} · synced 09:42
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <Panel data-wf="b-7-0" aria-labelledby="h-appts">
          <PanelHead title="Appointments across doctors" id="h-appts">
            {fDate ? "showing " + fmtDate(fDate) : "showing every date on the books"} · all
            consultations are in person at the clinic.
          </PanelHead>
          {filtered.length === 0 ? (
            <Empty
              title="nothing on the books for these filters"
              description="no appointment matches this doctor, date and status together. widen one of them to see more."
              action={
                <Button
                  className="atr-focus px-6 text-[13px] font-semibold"
                  style={primaryBtnStyle}
                  onClick={() => {
                    setFDoctor("all");
                    setFDate("");
                    setFStatus("all");
                  }}
                >
                  show all appointments
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <Table
                data-testid="appointments-across-doctors-table"
                aria-label="Appointments across doctors"
              >
                <THead>
                  <TR>
                    <TH className="atr-th w-12">
                      <span className="sr-only">select</span>
                    </TH>
                    <TH className="atr-th" data-wf="i-7-0-0">
                      Patient
                    </TH>
                    <TH className="atr-th" data-wf="i-7-0-1">
                      Doctor
                    </TH>
                    <TH className="atr-th" data-wf="i-7-0-2">
                      Date &amp; time
                    </TH>
                    <TH className="atr-th" data-wf="i-7-0-3">
                      Status
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {filtered.map((a) => (
                    <TR key={a.id} className={"atr-row " + (selAppt === a.id ? "atr-row-sel" : "")}>
                      <TD className="atr-td pl-4">
                        <input
                          type="radio"
                          name="appt-select"
                          className="atr-focus h-4 w-4"
                          style={{ accentColor: GOLD }}
                          checked={selAppt === a.id}
                          onChange={() => {
                            setSelAppt(a.id);
                            setConfirmAppt(false);
                          }}
                          aria-label={"select appointment " + a.id + " for " + a.patient}
                        />
                      </TD>
                      <TD className="atr-td">
                        <span className="font-semibold">{a.patient}</span>
                        <span className="atr-num block text-[12px]" style={{ color: MUTED }}>
                          {a.id}
                        </span>
                      </TD>
                      <TD className="atr-td">{a.doctor}</TD>
                      <TD className="atr-td atr-num">
                        {fmtDate(a.date)} · {a.time}
                      </TD>
                      <TD className="atr-td">{statusBadge(a.status)}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          )}
        </Panel>
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-3">
        <Button
          data-wf="b-8-0"
          data-testid="cancel-appointment-btn"
          className="atr-focus w-full justify-center px-6 text-[14px] font-semibold"
          style={Object.assign({}, primaryBtnStyle, {
            opacity: cancelBlockReason ? 0.5 : 1,
            cursor: cancelBlockReason ? "not-allowed" : "pointer",
          })}
          disabled={!!cancelBlockReason}
          onClick={() => {
            setNotice(null);
            setConfirmAppt(true);
          }}
        >
          Cancel appointment
        </Button>
      </div>
      <div className="col-span-12 lg:col-span-9">
        <p className="text-[13px] leading-relaxed" aria-live="polite" style={{ color: MUTED }}>
          {cancelBlockReason
            ? cancelBlockReason
            : "cancelling " +
              selectedAppt.id +
              " releases the " +
              selectedAppt.time +
              " slot back to " +
              selectedAppt.doctor +
              " and tells the patient in-app."}
        </p>
      </div>

      {confirmAppt && selectedAppt ? (
        <div className="col-span-12">
          <ConfirmBar
            title={"cancel " + selectedAppt.id + " for " + selectedAppt.patient + "?"}
            body={
              "the " +
              selectedAppt.time +
              " slot on " +
              fmtDate(selectedAppt.date) +
              " with " +
              selectedAppt.doctor +
              " becomes bookable again straight away. the patient sees the cancellation on their appointments screen."
            }
            confirmLabel="cancel appointment"
            onConfirm={doCancelAppt}
            onCancel={() => setConfirmAppt(false)}
          />
        </div>
      ) : null}
    </div>
  );

  const consentPanel = (
    <div className="grid grid-cols-12 gap-7">
      <div className="col-span-12 lg:col-span-5">
        <Panel
          data-wf="b-9-0"
          data-testid="patient-consent-priya-sharma-card"
          arch={90}
          aria-labelledby="h-consent"
        >
          <PanelHead title={"Patient consent — " + CONSENT_PATIENT.name} id="h-consent">
            captured at registration and kept with the account, as the DPDP baseline requires.
          </PanelHead>
          <div className="flex items-center gap-4 pb-6">
            <Avatar name={CONSENT_PATIENT.name} className="h-12 w-12" />
            <div>
              <p className="text-[15px] font-semibold" style={{ color: INK }}>
                {CONSENT_PATIENT.name}
              </p>
              <p className="text-[12.5px]" style={{ color: MUTED }}>
                {CONSENT_PATIENT.email}
              </p>
            </div>
          </div>
          {consentState.status === "loading" ? (
            <p
              role="status"
              className="py-6 text-[13px]"
              style={{ borderTop: "1px solid " + LINE, color: MUTED }}
            >
              loading consent status…
            </p>
          ) : consentState.status === "error" ? (
            <div className="py-6" style={{ borderTop: "1px solid " + LINE }}>
              <p role="alert" className="text-[13px]" style={{ color: INK }}>
                we could not load this patient&apos;s consent status — try again.
              </p>
              <button
                type="button"
                onClick={retryConsentLoad}
                className="atr-focus mt-3 px-4 py-2 text-[12.5px] font-medium"
                style={{
                  borderRadius: "999px",
                  border: "1px solid " + rgba(INK, 0.3),
                  color: INK,
                  minHeight: "40px",
                }}
              >
                try again
              </button>
            </div>
          ) : (
            <div style={{ borderTop: "1px solid " + LINE }}>
              <dl className="atr-num">
                <div
                  data-wf="i-9-0-0"
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: "1px solid " + LINE }}
                >
                  <dt className="text-[13px]" style={{ color: MUTED }}>
                    Consent given
                  </dt>
                  <dd
                    className="flex items-center gap-1.5 text-[14px] font-semibold"
                    style={{ color: INK }}
                  >
                    {Icon(consentState.data.consentGiven ? "CheckCircle" : "X", "h-4 w-4")}
                    {consentState.data.consentGiven ? "Yes" : "No"}
                  </dd>
                </div>
                <div data-wf="i-9-0-1" className="flex items-center justify-between py-4">
                  <dt className="text-[13px]" style={{ color: MUTED }}>
                    Consent date
                  </dt>
                  <dd className="text-[14px] font-semibold" style={{ color: INK }}>
                    {consentState.data.consentGiven
                      ? fmtConsentDate(consentState.data.consentDate)
                      : "—"}
                  </dd>
                </div>
              </dl>
            </div>
          )}
          <p className="mt-5 text-[12.5px] leading-relaxed" style={{ color: MUTED }}>
            consent is read-only here. a patient who withdraws it is handled off-screen by the data
            protection officer.
          </p>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <Panel data-wf="b-9-1" arch={90} aria-labelledby="h-audit">
          <PanelHead title="Record-access audit log" id="h-audit">
            every read, download and refused attempt on a consultation record, newest first.
          </PanelHead>
          <div className="overflow-x-auto">
            <Table data-testid="record-access-audit-log-table" aria-label="Record-access audit log">
              <THead>
                <TR>
                  <TH className="atr-th" data-wf="i-9-1-0">
                    User
                  </TH>
                  <TH className="atr-th" data-wf="i-9-1-1">
                    Consultation record
                  </TH>
                  <TH className="atr-th" data-wf="i-9-1-2">
                    Action
                  </TH>
                  <TH className="atr-th" data-wf="i-9-1-3">
                    Accessed at
                  </TH>
                </TR>
              </THead>
              <TBody>
                {AUDIT.map((e) => {
                  const denied = e.action === "access denied";
                  return (
                    <TR key={e.id} className="atr-row">
                      <TD className="atr-td">
                        <span className="font-semibold">{e.user}</span>
                        <span className="block text-[12px]" style={{ color: MUTED }}>
                          {e.role}
                        </span>
                      </TD>
                      <TD className="atr-td atr-num" style={{ color: MUTED }}>
                        {e.record}
                      </TD>
                      <TD className="atr-td">
                        <span
                          className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1 text-[12px] font-medium"
                          style={{
                            borderRadius: "999px",
                            backgroundColor: denied ? rgba(GOLD, 0.26) : rgba(INK, 0.07),
                            border: "1px solid " + (denied ? rgba(GOLD, 0.5) : LINE),
                            color: INK,
                          }}
                        >
                          {Icon(
                            denied
                              ? "AlertCircle"
                              : e.action === "downloaded pdf"
                                ? "Download"
                                : e.action === "created"
                                  ? "Plus"
                                  : "FileText",
                            "h-3.5 w-3.5",
                          )}
                          {e.action}
                        </span>
                      </TD>
                      <TD className="atr-td atr-num">{e.at}</TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </div>
        </Panel>
      </div>
    </div>
  );

  return (
    <div
      className="atr-scope min-h-full px-5 py-10 sm:px-8 sm:py-12"
      style={{ backgroundColor: CREAM, color: INK, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>
      <div className="mx-auto max-w-[1160px]">
        <header
          data-wf="b-0-0"
          className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h1
              data-testid="admin-console-title"
              className="text-[34px] leading-[1.15] sm:text-[40px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", color: INK }}
            >
              Admin Console
            </h1>
            <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed" style={{ color: MUTED }}>
              the roster, the lookup table and the day's bookings for Atrium Clinic — all in one
              place, all offline-paid at the desk.
            </p>
          </div>
          <span
            className="inline-flex items-center gap-2 self-start px-4 py-2 text-[12.5px] sm:self-auto"
            style={{
              borderRadius: "999px",
              backgroundColor: rgba(INK, 0.07),
              border: "1px solid " + LINE,
              color: INK,
            }}
          >
            {Icon("Settings", "h-3.5 w-3.5")}
            administrator access · single clinic
          </span>
        </header>

        <div data-wf="b-1-0" className="mb-9">
          <div
            data-testid="tabs-1"
            role="tablist"
            aria-label="Admin sections"
            className="flex flex-wrap gap-2 p-2"
            style={{
              backgroundColor: rgba(INK, 0.06),
              border: "1px solid " + LINE,
              borderRadius: "999px",
            }}
          >
            {TABS.map((t, i) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  id={"atr-tab-" + t.key}
                  data-wf={t.wf}
                  data-testid={t.testId}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={"atr-panel-" + t.key}
                  tabIndex={active ? 0 : -1}
                  onClick={() => goTab(t.key)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className="atr-focus px-5 py-2.5 text-[13.5px] font-medium transition-colors"
                  style={{
                    borderRadius: "999px",
                    minHeight: "44px",
                    backgroundColor: active ? INK : "transparent",
                    color: active ? CREAM : MUTED,
                    border: "1px solid " + (active ? INK : "transparent"),
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={"atr-panel-" + tab}
          role="tabpanel"
          aria-labelledby={"atr-tab-" + tab}
          tabIndex={-1}
          className="atr-rise"
        >
          {noticeBlock}
          {tab === "doctors" ? doctorsPanel : null}
          {tab === "specializations" ? specsPanel : null}
          {tab === "mapping" ? mappingPanel : null}
          {tab === "appointments" ? apptPanel : null}
          {tab === "consent" ? consentPanel : null}
        </div>
      </div>
    </div>
  );
}
