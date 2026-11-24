// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Switch, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {
  Check,
  X,
  ChevronRight,
  FileText,
  Calendar,
  Clock,
  Trash,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} = Icons;

const WEEKDAYS = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 0, label: "Sunday" },
];

const SLOT_LENGTHS = [15, 20, 30, 45, 60];

const INITIAL_PATTERNS = [
  {
    id: "ap_01",
    weekday: 1,
    start_time: "09:00",
    end_time: "13:00",
    slot_length_minutes: 30,
    is_active: true,
    booked: 3,
  },
  {
    id: "ap_02",
    weekday: 3,
    start_time: "10:00",
    end_time: "14:00",
    slot_length_minutes: 30,
    is_active: true,
    booked: 1,
  },
  {
    id: "ap_03",
    weekday: 5,
    start_time: "09:00",
    end_time: "12:00",
    slot_length_minutes: 30,
    is_active: false,
    booked: 0,
  },
];

// now = Tue 24 Nov 2026, 10:45 at the clinic
const NOW = "2026-11-24T10:45";

const INITIAL_APPOINTMENTS = [
  // upcoming
  {
    id: "apt_1042",
    slot_id: "sl_7781",
    patient_id: "pt_310",
    patient_name: "Kavita Rane",
    start_at: "2026-11-24T11:30",
    status: "booked",
    record: null,
    note: "first visit",
  },
  {
    id: "apt_1043",
    slot_id: "sl_7782",
    patient_id: "pt_145",
    patient_name: "Imran Qureshi",
    start_at: "2026-11-24T12:00",
    status: "booked",
    record: null,
    note: "follow-up, 3 months",
  },
  {
    id: "apt_1047",
    slot_id: "sl_7810",
    patient_id: "pt_402",
    patient_name: "Deepa Iyer",
    start_at: "2026-11-25T10:00",
    status: "booked",
    record: null,
    note: "first visit",
  },
  {
    id: "apt_1049",
    slot_id: "sl_7811",
    patient_id: "pt_288",
    patient_name: "Sanjay Pillai",
    start_at: "2026-11-25T10:30",
    status: "booked",
    record: null,
    note: "moved from 18 nov",
  },
  {
    id: "apt_1051",
    slot_id: "sl_7840",
    patient_id: "pt_377",
    patient_name: "Farhan Shaikh",
    start_at: "2026-11-27T09:30",
    status: "cancelled",
    record: null,
    note: "cancelled by patient, 21 nov",
  },
  {
    id: "apt_1055",
    slot_id: "sl_7902",
    patient_id: "pt_219",
    patient_name: "Nithya Balan",
    start_at: "2026-11-30T09:00",
    status: "booked",
    record: null,
    note: "follow-up",
  },
  // past
  {
    id: "apt_1038",
    slot_id: "sl_7742",
    patient_id: "pt_101",
    patient_name: "Meera Krishnan",
    start_at: "2026-11-23T09:30",
    status: "completed",
    record: "cr_880",
    note: "",
  },
  {
    id: "apt_1039",
    slot_id: "sl_7743",
    patient_id: "pt_264",
    patient_name: "Vikram Sethi",
    start_at: "2026-11-23T10:00",
    status: "completed",
    record: "cr_881",
    note: "",
  },
  {
    id: "apt_1040",
    slot_id: "sl_7744",
    patient_id: "pt_355",
    patient_name: "Aarti Pawar",
    start_at: "2026-11-23T10:30",
    status: "no_show",
    record: null,
    note: "",
  },
  {
    id: "apt_1031",
    slot_id: "sl_7701",
    patient_id: "pt_077",
    patient_name: "Joseph Mathew",
    start_at: "2026-11-20T09:00",
    status: "completed",
    record: "cr_872",
    note: "",
  },
  {
    id: "apt_1032",
    slot_id: "sl_7704",
    patient_id: "pt_198",
    patient_name: "Shalini Gupta",
    start_at: "2026-11-20T11:00",
    status: "completed",
    record: "cr_873",
    note: "",
  },
  {
    id: "apt_1033",
    slot_id: "sl_7705",
    patient_id: "pt_240",
    patient_name: "Ravi Chandran",
    start_at: "2026-11-20T11:30",
    status: "cancelled",
    record: null,
    note: "cancelled by patient, 19 nov",
  },
  {
    id: "apt_1025",
    slot_id: "sl_7660",
    patient_id: "pt_312",
    patient_name: "Priya Nambiar",
    start_at: "2026-11-18T10:00",
    status: "completed",
    record: "cr_864",
    note: "",
  },
  {
    id: "apt_1026",
    slot_id: "sl_7661",
    patient_id: "pt_158",
    patient_name: "Tanvi Desai",
    start_at: "2026-11-18T10:30",
    status: "completed",
    record: "cr_865",
    note: "",
  },
  {
    id: "apt_1027",
    slot_id: "sl_7663",
    patient_id: "pt_291",
    patient_name: "Harish Kulkarni",
    start_at: "2026-11-18T12:00",
    status: "no_show",
    record: null,
    note: "",
  },
  {
    id: "apt_1019",
    slot_id: "sl_7612",
    patient_id: "pt_333",
    patient_name: "Zoya Khan",
    start_at: "2026-11-16T09:30",
    status: "completed",
    record: "cr_858",
    note: "",
  },
  {
    id: "apt_1020",
    slot_id: "sl_7614",
    patient_id: "pt_126",
    patient_name: "Ananya Rao",
    start_at: "2026-11-16T10:30",
    status: "completed",
    record: null,
    note: "notes still open",
  },
  {
    id: "apt_1012",
    slot_id: "sl_7570",
    patient_id: "pt_064",
    patient_name: "Suresh Patel",
    start_at: "2026-11-13T09:00",
    status: "completed",
    record: "cr_849",
    note: "",
  },
  {
    id: "apt_1013",
    slot_id: "sl_7571",
    patient_id: "pt_205",
    patient_name: "Lakshmi Venkat",
    start_at: "2026-11-13T09:30",
    status: "cancelled",
    record: null,
    note: "cancelled by clinic, 12 nov",
  },
  {
    id: "apt_1006",
    slot_id: "sl_7522",
    patient_id: "pt_172",
    patient_name: "Nilesh Jadhav",
    start_at: "2026-11-11T11:00",
    status: "completed",
    record: "cr_841",
    note: "",
  },
  {
    id: "apt_1007",
    slot_id: "sl_7523",
    patient_id: "pt_283",
    patient_name: "Fatima Ansari",
    start_at: "2026-11-11T11:30",
    status: "completed",
    record: "cr_842",
    note: "",
  },
  {
    id: "apt_0998",
    slot_id: "sl_7480",
    patient_id: "pt_319",
    patient_name: "Gopal Reddy",
    start_at: "2026-11-09T10:00",
    status: "no_show",
    record: null,
    note: "",
  },
  {
    id: "apt_0990",
    slot_id: "sl_7431",
    patient_id: "pt_088",
    patient_name: "Rekha Sharma",
    start_at: "2026-11-06T09:30",
    status: "completed",
    record: "cr_830",
    note: "",
  },
  {
    id: "apt_0984",
    slot_id: "sl_7402",
    patient_id: "pt_251",
    patient_name: "Arjun Bhatia",
    start_at: "2026-11-04T12:00",
    status: "completed",
    record: "cr_824",
    note: "",
  },
];

// A late booking that arrives when the doctor refreshes the schedule.
const INCOMING_BOOKING = {
  id: "apt_1058",
  slot_id: "sl_7812",
  patient_id: "pt_466",
  patient_name: "Rohit Menon",
  start_at: "2026-11-25T11:00",
  status: "booked",
  record: null,
  note: "booked 2 minutes ago",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function withAlpha(hex, alpha) {
  const h = String(hex).replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
}

function toMinutes(t) {
  const [h, m] = String(t).split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}

function parseStamp(iso) {
  const [datePart, timePart] = String(iso).split("T");
  const [y, mo, d] = datePart.split("-").map(Number);
  const [h, mi] = timePart.split(":").map(Number);
  return new Date(y, mo - 1, d, h, mi);
}

function formatStamp(iso) {
  const dt = parseStamp(iso);
  return (
    DAY_SHORT[dt.getDay()] +
    " " +
    dt.getDate() +
    " " +
    MONTHS[dt.getMonth()] +
    " · " +
    String(dt.getHours()).padStart(2, "0") +
    ":" +
    String(dt.getMinutes()).padStart(2, "0")
  );
}

function weekdayLabel(value) {
  const found = WEEKDAYS.find((w) => w.value === value);
  return found ? found.label : "";
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const brass = brand.accentColor;
  const neutral = brand.neutralColor;
  const canvas = brand.backgroundColor;

  // status tokens: botanical sage for completed, clay/terracotta for a missed visit
  const SAGE = "#3f5c42";
  const CLAY = "#8f4a2f";

  const hairline = withAlpha(ink, 0.14);
  const tintSoft = withAlpha(ink, 0.05);
  const tintPanel = withAlpha(ink, 0.07);

  const [patterns, setPatterns] = React.useState(INITIAL_PATTERNS);
  const [appointments, setAppointments] = React.useState(INITIAL_APPOINTMENTS);
  const [form, setForm] = React.useState({
    weekday: 2,
    start_time: "14:00",
    end_time: "17:00",
    slot_length_minutes: 30,
    is_active: true,
  });
  const [saveState, setSaveState] = React.useState("idle"); // idle | saving | error
  const [formError, setFormError] = React.useState("");
  const [patternNotice, setPatternNotice] = React.useState(null);
  const [confirmRemove, setConfirmRemove] = React.useState(null);
  const [tab, setTab] = React.useState("upcoming");
  const [selectedId, setSelectedId] = React.useState("apt_1042");
  const [feedback, setFeedback] = React.useState(null);
  const [syncing, setSyncing] = React.useState(false);
  const [syncLabel, setSyncLabel] = React.useState("synced 4 minutes ago");
  const [fresh, setFresh] = React.useState([]);

  const timers = React.useRef([]);
  React.useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
    };
  }, []);
  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const nowTs = parseStamp(NOW).getTime();
  const upcoming = appointments
    .filter((a) => parseStamp(a.start_at).getTime() >= nowTs)
    .sort((a, b) => parseStamp(a.start_at) - parseStamp(b.start_at));
  const past = appointments
    .filter((a) => parseStamp(a.start_at).getTime() < nowTs)
    .sort((a, b) => parseStamp(b.start_at) - parseStamp(a.start_at));
  const rows = tab === "upcoming" ? upcoming : past;
  const selected = appointments.find((a) => a.id === selectedId) || null;
  const selectedVisible = selected && rows.some((r) => r.id === selected.id) ? selected : null;

  // ---- availability maths -------------------------------------------------
  const startMin = toMinutes(form.start_time || "00:00");
  const endMin = toMinutes(form.end_time || "00:00");
  const span = endMin - startMin;
  const len = Number(form.slot_length_minutes);
  const slotCount = span > 0 ? Math.floor(span / len) : 0;
  const leftover = span > 0 ? span % len : 0;
  const previewSlots = [];
  for (let i = 0; i < Math.min(slotCount, 5); i += 1) {
    previewSlots.push(fromMinutes(startMin + i * len));
  }

  function validate() {
    if (!form.start_time || !form.end_time) return "add a start and an end time before saving.";
    if (span <= 0) return "the end time has to be later than the start time.";
    if (slotCount < 1) return "that window is shorter than one " + len + " minute consultation.";
    const clash = patterns.find(
      (p) =>
        p.weekday === Number(form.weekday) &&
        p.is_active &&
        startMin < toMinutes(p.end_time) &&
        endMin > toMinutes(p.start_time),
    );
    if (clash) {
      return (
        "you already see patients on " +
        weekdayLabel(clash.weekday).toLowerCase() +
        " " +
        clash.start_time +
        "–" +
        clash.end_time +
        ". overlapping windows would double-book you."
      );
    }
    return "";
  }

  function handleSave(event) {
    event.preventDefault();
    const problem = validate();
    if (problem) {
      setSaveState("error");
      setFormError(problem);
      return;
    }
    setFormError("");
    setSaveState("saving");
    later(() => {
      const id = "ap_" + String(patterns.length + 1).padStart(2, "0");
      setPatterns((prev) =>
        prev.concat([
          {
            id,
            weekday: Number(form.weekday),
            start_time: form.start_time,
            end_time: form.end_time,
            slot_length_minutes: len,
            is_active: !!form.is_active,
            booked: 0,
            isNew: true,
          },
        ]),
      );
      setSaveState("idle");
      setPatternNotice({
        tone: "success",
        text:
          "saved. " +
          weekdayLabel(Number(form.weekday)).toLowerCase() +
          " " +
          form.start_time +
          "–" +
          form.end_time +
          " now generates " +
          slotCount +
          " bookable slots of " +
          len +
          " minutes each" +
          (form.is_active ? "." : ", held inactive until you switch it on."),
      });
    }, 650);
  }

  function togglePattern(id) {
    setPatternNotice(null);
    setPatterns((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active, isNew: false } : p)),
    );
    const p = patterns.find((x) => x.id === id);
    if (p) {
      setPatternNotice({
        tone: "success",
        text: p.is_active
          ? weekdayLabel(p.weekday).toLowerCase() +
            " paused. patients can no longer book these slots."
          : weekdayLabel(p.weekday).toLowerCase() +
            " is open again. slots are back in patient search.",
      });
    }
  }

  function askRemove(p) {
    setPatternNotice(null);
    if (p.booked > 0) {
      setConfirmRemove(p.id);
      return;
    }
    setPatterns((prev) => prev.filter((x) => x.id !== p.id));
    setPatternNotice({
      tone: "success",
      text:
        weekdayLabel(p.weekday).toLowerCase() +
        " " +
        p.start_time +
        "–" +
        p.end_time +
        " removed. those slots are no longer offered to patients.",
    });
  }

  function removeFreeSlotsOnly(p) {
    setConfirmRemove(null);
    setPatterns((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, is_active: false, keptBooked: p.booked } : x)),
    );
    setPatternNotice({
      tone: "warning",
      text:
        "free " +
        weekdayLabel(p.weekday).toLowerCase() +
        " slots withdrawn. " +
        p.booked +
        " already-booked appointment" +
        (p.booked === 1 ? "" : "s") +
        " stay in your schedule — no patient was dropped.",
    });
  }

  function markOutcome(nextStatus) {
    if (!selectedVisible) return;
    const apt = selectedVisible;
    if (apt.status === "cancelled") {
      setFeedback({
        tone: "error",
        text:
          apt.patient_name.toLowerCase() +
          "’s visit was cancelled (" +
          apt.note +
          "). a cancelled appointment can’t be marked completed or no-show.",
      });
      return;
    }
    if (parseStamp(apt.start_at).getTime() > nowTs) {
      setFeedback({
        tone: "error",
        text:
          apt.patient_name +
          " is booked for " +
          formatStamp(apt.start_at) +
          ". outcomes can be set from the day of the visit onwards.",
      });
      return;
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: nextStatus } : a)),
    );
    setFeedback({
      tone: "success",
      text:
        nextStatus === "completed"
          ? apt.patient_name +
            " marked completed. the patient and the clinic admin can see this now — add diagnosis and prescription in the consultation record."
          : apt.patient_name +
            " marked no-show. the visit stays on record and the slot is not reopened.",
    });
  }

  function refreshSchedule() {
    setSyncing(true);
    setFeedback(null);
    later(() => {
      setSyncing(false);
      setSyncLabel("synced just now");
      setAppointments((prev) =>
        prev.some((a) => a.id === INCOMING_BOOKING.id) ? prev : prev.concat([INCOMING_BOOKING]),
      );
      setFresh((prev) =>
        prev.indexOf(INCOMING_BOOKING.id) >= 0 ? prev : prev.concat([INCOMING_BOOKING.id]),
      );
    }, 700);
  }

  // ---- shared styles ------------------------------------------------------
  const pill = {
    borderRadius: 999,
    border: "1px solid " + hairline,
    backgroundColor: withAlpha(canvas, 1),
    color: ink,
    fontFamily: brand.fontBody,
  };
  const panel = {
    backgroundColor: tintSoft,
    border: "1px solid " + hairline,
    borderRadius: brand.radius,
  };
  const labelStyle = {
    color: withAlpha(ink, 0.72),
    fontFamily: brand.fontBody,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  const statusToken = {
    booked: { label: "booked", fg: ink, bg: withAlpha(ink, 0.09), Icon: Calendar },
    completed: { label: "completed", fg: SAGE, bg: withAlpha(SAGE, 0.12), Icon: CheckCircle },
    no_show: { label: "no-show", fg: CLAY, bg: withAlpha(CLAY, 0.12), Icon: AlertCircle },
    cancelled: {
      label: "cancelled",
      fg: withAlpha(ink, 0.65),
      bg: withAlpha(neutral, 0.18),
      Icon: X,
    },
  };

  function outcomeText(a) {
    if (a.status === "completed") return a.record ? "consultation recorded" : "notes pending";
    if (a.status === "no_show") return "patient did not attend";
    if (a.status === "cancelled") return a.note || "slot released";
    return parseStamp(a.start_at).getTime() > nowTs ? "awaiting visit" : "outcome not set";
  }

  const tabDefs = [
    { key: "upcoming", label: "Upcoming appointments", count: upcoming.length, wf: "i-3-0-0" },
    { key: "past", label: "Past appointments", count: past.length, wf: "i-3-0-1" },
  ];

  function onTabKeyDown(event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const i = tabDefs.findIndex((t) => t.key === tab);
    const next =
      event.key === "ArrowRight"
        ? (i + 1) % tabDefs.length
        : (i - 1 + tabDefs.length) % tabDefs.length;
    setTab(tabDefs[next].key);
  }

  const noticeTone = (tone) =>
    ({
      success: {
        fg: SAGE,
        bg: withAlpha(SAGE, 0.1),
        border: withAlpha(SAGE, 0.25),
        Icon: CheckCircle,
      },
      warning: {
        fg: CLAY,
        bg: withAlpha(CLAY, 0.1),
        border: withAlpha(CLAY, 0.28),
        Icon: AlertCircle,
      },
      error: {
        fg: CLAY,
        bg: withAlpha(CLAY, 0.1),
        border: withAlpha(CLAY, 0.28),
        Icon: AlertCircle,
      },
    })[tone];

  const confirmTarget = patterns.find((p) => p.id === confirmRemove) || null;

  return (
    <div
      className="atrium-screen mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-8"
      style={{ backgroundColor: canvas, color: ink, fontFamily: brand.fontBody }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && confirmRemove) setConfirmRemove(null);
      }}
    >
      <style>{`
        .atrium-screen :focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; border-radius: 999px; }
        .atrium-screen table :focus-visible { border-radius: 8px; }
        .atrium-rise { animation: atriumRise .32s ease-out both; }
        .atrium-row { transition: background-color .18s ease, box-shadow .18s ease; }
        .atrium-tap { transition: background-color .18s ease, color .18s ease, border-color .18s ease, transform .18s ease; }
        .atrium-tap:active { transform: translateY(1px); }
        .atrium-sync { animation: atriumPulse 1.1s ease-in-out infinite; }
        @keyframes atriumRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes atriumPulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .atrium-rise, .atrium-sync { animation: none !important; }
          .atrium-tap, .atrium-row { transition: none !important; }
        }
      `}</style>

      {/* ── Row 1 ─ page title ───────────────────────────────────────── */}
      <header data-wf="b-0-0" className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p style={labelStyle}>clinic rota · dr. anita deshpande</p>
          <h1
            className="mt-2 text-4xl leading-tight sm:text-[40px]"
            style={{
              fontFamily: brand.fontHeading,
              fontStyle: "italic",
              fontWeight: 600,
              color: ink,
            }}
          >
            Doctor Schedule
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: withAlpha(ink, 0.78) }}>
            general medicine · atrium clinic, koramangala. set the week you are available and work
            through today’s visits — consultations are in person, fees are settled at the front
            desk.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px]"
            style={{
              ...pill,
              backgroundColor: withAlpha(brass, 0.14),
              borderColor: withAlpha(brass, 0.4),
            }}
          >
            <Clock className={"h-4 w-4" + (syncing ? " atrium-sync" : "")} aria-hidden="true" />
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {syncing ? "checking for new bookings…" : syncLabel}
            </span>
          </span>
          <Button
            onClick={refreshSchedule}
            disabled={syncing}
            className="atrium-tap px-5 py-2 text-[14px]"
            style={{
              ...pill,
              opacity: syncing ? 0.6 : 1,
              cursor: syncing ? "progress" : "pointer",
            }}
          >
            refresh schedule
          </Button>
        </div>
      </header>

      <div className="my-8" style={{ borderTop: "1px solid " + hairline }} aria-hidden="true" />

      {/* ── Row 2 ─ availability form + current pattern ──────────────── */}
      <div className="grid grid-cols-12 items-start gap-6">
        <section
          data-wf="b-1-0"
          className="col-span-12 lg:col-span-7"
          style={{
            backgroundColor: tintPanel,
            border: "1px solid " + hairline,
            borderRadius: "180px 180px " + brand.radius + " " + brand.radius,
            padding: "0 0 32px",
          }}
          aria-labelledby="availability-heading"
        >
          <div className="relative px-8 pt-10 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-4 h-28"
              style={{
                borderTop: "1px solid " + withAlpha(brass, 0.55),
                borderRadius: "160px 160px 0 0",
              }}
            />
            <h2
              id="availability-heading"
              className="relative text-[26px] leading-snug"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
            >
              Recurring weekly availability
            </h2>
            <p
              className="relative mx-auto mt-2 max-w-sm text-[14px]"
              style={{ color: withAlpha(ink, 0.7) }}
            >
              the clinic splits each window into fixed-length consultations automatically.
            </p>
          </div>

          <form
            id="availability-form"
            className="mt-8 px-6 sm:px-8"
            onSubmit={handleSave}
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="weekday" style={labelStyle}>
                  Weekday
                </Label>
                <Select
                  id="weekday"
                  data-wf="i-1-0-0"
                  className="mt-2 w-full px-5 py-3 text-[15px]"
                  style={pill}
                  value={String(form.weekday)}
                  onChange={(e) => setForm({ ...form, weekday: Number(e.target.value) })}
                >
                  {WEEKDAYS.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="slot-length" style={labelStyle}>
                  Slot length (minutes)
                </Label>
                <Select
                  id="slot-length"
                  data-wf="i-1-0-3"
                  className="mt-2 w-full px-5 py-3 text-[15px]"
                  style={{ ...pill, fontVariantNumeric: "tabular-nums" }}
                  value={String(form.slot_length_minutes)}
                  onChange={(e) =>
                    setForm({ ...form, slot_length_minutes: Number(e.target.value) })
                  }
                >
                  {SLOT_LENGTHS.map((s) => (
                    <option key={s} value={s}>
                      {s} minutes
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="start-time" style={labelStyle}>
                  Start time
                </Label>
                <Input
                  id="start-time"
                  data-wf="i-1-0-1"
                  type="time"
                  step="900"
                  className="mt-2 w-full px-5 py-3 text-[15px]"
                  style={{
                    ...pill,
                    fontVariantNumeric: "tabular-nums",
                    borderColor: formError && span <= 0 ? withAlpha(CLAY, 0.6) : hairline,
                  }}
                  value={form.start_time}
                  onChange={(e) => {
                    setForm({ ...form, start_time: e.target.value });
                    setSaveState("idle");
                  }}
                />
              </div>

              <div>
                <Label htmlFor="end-time" style={labelStyle}>
                  End time
                </Label>
                <Input
                  id="end-time"
                  data-wf="i-1-0-2"
                  type="time"
                  step="900"
                  className="mt-2 w-full px-5 py-3 text-[15px]"
                  style={{
                    ...pill,
                    fontVariantNumeric: "tabular-nums",
                    borderColor: formError && span <= 0 ? withAlpha(CLAY, 0.6) : hairline,
                  }}
                  value={form.end_time}
                  onChange={(e) => {
                    setForm({ ...form, end_time: e.target.value });
                    setSaveState("idle");
                  }}
                  aria-describedby="slot-preview"
                />
              </div>
            </div>

            <div
              data-wf="i-1-0-4"
              className="mt-6 flex flex-wrap items-center justify-between gap-4 px-5 py-4"
              style={{ ...panel, backgroundColor: withAlpha(canvas, 0.75) }}
            >
              <Label
                className="flex items-center gap-3 text-[15px]"
                style={{ color: ink, fontFamily: brand.fontBody }}
              >
                <Switch
                  checked={form.is_active}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, is_active: typeof v === "boolean" ? v : !f.is_active }))
                  }
                />
                <span>
                  Active
                  <span className="ml-2 text-[13px]" style={{ color: withAlpha(ink, 0.65) }}>
                    {form.is_active
                      ? "patients can book these slots as soon as you save"
                      : "held back — generated but not offered"}
                  </span>
                </span>
              </Label>
            </div>

            <div
              id="slot-preview"
              className="mt-6 flex flex-wrap items-center gap-2"
              aria-live="polite"
            >
              {slotCount > 0 ? (
                <React.Fragment>
                  <span className="text-[13px]" style={{ color: withAlpha(ink, 0.7) }}>
                    generates{" "}
                    <strong style={{ fontVariantNumeric: "tabular-nums" }}>{slotCount}</strong>{" "}
                    slots:
                  </span>
                  {previewSlots.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 text-[13px]"
                      style={{
                        ...pill,
                        backgroundColor: withAlpha(brass, 0.16),
                        borderColor: withAlpha(brass, 0.4),
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  {slotCount > previewSlots.length ? (
                    <span
                      className="text-[13px]"
                      style={{ color: withAlpha(ink, 0.6), fontVariantNumeric: "tabular-nums" }}
                    >
                      +{slotCount - previewSlots.length} more
                    </span>
                  ) : null}
                  {leftover > 0 ? (
                    <span
                      className="text-[13px]"
                      style={{ color: withAlpha(ink, 0.6), fontVariantNumeric: "tabular-nums" }}
                    >
                      · last {leftover} min stays unbooked
                    </span>
                  ) : null}
                </React.Fragment>
              ) : (
                <span className="text-[13px]" style={{ color: withAlpha(ink, 0.6) }}>
                  choose a window longer than one consultation to see the slots it makes.
                </span>
              )}
            </div>

            {saveState === "error" && formError ? (
              <p
                className="atrium-rise mt-5 flex items-start gap-2 px-5 py-3 text-[14px]"
                role="alert"
                style={{
                  borderRadius: brand.radius,
                  backgroundColor: withAlpha(CLAY, 0.1),
                  border: "1px solid " + withAlpha(CLAY, 0.28),
                  color: CLAY,
                }}
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{formError} your times are kept as you entered them.</span>
              </p>
            ) : null}
          </form>
        </section>

        <section
          data-wf="b-1-1"
          className="col-span-12 lg:col-span-5"
          aria-labelledby="pattern-heading"
        >
          <div className="px-6 py-6" style={panel}>
            <div className="flex items-baseline justify-between gap-3">
              <h2
                id="pattern-heading"
                className="text-[22px]"
                style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
              >
                Current pattern
              </h2>
              <span
                className="text-[13px]"
                style={{ color: withAlpha(ink, 0.65), fontVariantNumeric: "tabular-nums" }}
              >
                {patterns.filter((p) => p.is_active).length} of {patterns.length} live
              </span>
            </div>

            {patternNotice ? (
              <p
                className="atrium-rise mt-4 flex items-start gap-2 px-4 py-3 text-[13.5px] leading-relaxed"
                role="status"
                style={{
                  borderRadius: brand.radius,
                  backgroundColor: noticeTone(patternNotice.tone).bg,
                  border: "1px solid " + noticeTone(patternNotice.tone).border,
                  color: noticeTone(patternNotice.tone).fg,
                }}
              >
                {React.createElement(noticeTone(patternNotice.tone).Icon, {
                  className: "mt-0.5 h-4 w-4 shrink-0",
                  "aria-hidden": "true",
                })}
                <span>{patternNotice.text}</span>
              </p>
            ) : null}

            {patterns.length === 0 ? (
              <Empty
                className="mt-6"
                title="no weekly availability yet"
                description="your diary is closed to new bookings. set a weekday and a time window on the left, and the clinic will split it into consultation slots."
              />
            ) : (
              <ul className="mt-5 space-y-3">
                {patterns.map((p, i) => {
                  const count = Math.floor(
                    (toMinutes(p.end_time) - toMinutes(p.start_time)) / p.slot_length_minutes,
                  );
                  return (
                    <li
                      key={p.id}
                      data-wf={"i-1-1-" + i}
                      className={"px-5 py-4" + (p.isNew ? " atrium-rise" : "")}
                      style={{
                        borderRadius: brand.radius,
                        backgroundColor: withAlpha(canvas, p.is_active ? 0.95 : 0.6),
                        border: "1px solid " + (p.is_active ? withAlpha(brass, 0.38) : hairline),
                      }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p
                            className="text-[18px]"
                            style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
                          >
                            {weekdayLabel(p.weekday)}
                          </p>
                          <p
                            className="mt-1 text-[14px]"
                            style={{
                              color: withAlpha(ink, 0.78),
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {p.start_time} – {p.end_time} · {p.slot_length_minutes} min slots ·{" "}
                            {count} per week
                          </p>
                          {p.booked > 0 ? (
                            <p
                              className="mt-1 text-[13px]"
                              style={{
                                color: withAlpha(ink, 0.62),
                                fontVariantNumeric: "tabular-nums",
                              }}
                            >
                              {p.booked} booked appointment{p.booked === 1 ? "" : "s"} in this
                              window
                            </p>
                          ) : null}
                        </div>
                        <Badge
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-[12.5px]"
                          style={{
                            borderRadius: 999,
                            backgroundColor: p.is_active
                              ? withAlpha(SAGE, 0.12)
                              : withAlpha(neutral, 0.2),
                            color: p.is_active ? SAGE : withAlpha(ink, 0.7),
                            border: "1px solid " + (p.is_active ? withAlpha(SAGE, 0.3) : hairline),
                          }}
                        >
                          {p.is_active ? (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          {p.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      {confirmRemove === p.id ? (
                        <div
                          className="atrium-rise mt-4 px-4 py-4"
                          role="alertdialog"
                          aria-label={"removing " + weekdayLabel(p.weekday) + " availability"}
                          style={{
                            borderRadius: brand.radius,
                            backgroundColor: withAlpha(CLAY, 0.09),
                            border: "1px solid " + withAlpha(CLAY, 0.3),
                          }}
                        >
                          <p className="text-[13.5px] leading-relaxed" style={{ color: CLAY }}>
                            {p.booked} patient{p.booked === 1 ? " has" : "s have"} already booked
                            inside this window. removing it will not delete their appointment
                            {p.booked === 1 ? "" : "s"} — the free slots are withdrawn and the
                            booked ones stay in your schedule.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <Button
                              autoFocus
                              onClick={() => removeFreeSlotsOnly(p)}
                              className="atrium-tap px-5 py-2.5 text-[14px]"
                              style={{
                                borderRadius: 999,
                                backgroundColor: ink,
                                color: canvas,
                                border: "1px solid " + ink,
                              }}
                            >
                              withdraw free slots only
                            </Button>
                            <Button
                              onClick={() => setConfirmRemove(null)}
                              className="atrium-tap px-5 py-2.5 text-[14px]"
                              style={pill}
                            >
                              keep availability
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button
                            onClick={() => togglePattern(p.id)}
                            aria-pressed={p.is_active}
                            className="atrium-tap px-4 py-2 text-[13.5px]"
                            style={pill}
                          >
                            {p.is_active ? "pause this day" : "make active"}
                          </Button>
                          <Button
                            onClick={() => askRemove(p)}
                            className="atrium-tap inline-flex items-center gap-1.5 px-4 py-2 text-[13.5px]"
                            style={{ ...pill, color: CLAY, borderColor: withAlpha(CLAY, 0.35) }}
                          >
                            <Trash className="h-3.5 w-3.5" aria-hidden="true" />
                            remove
                          </Button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>

      {/* ── Row 3 ─ save ─────────────────────────────────────────────── */}
      <div className="mt-7 grid grid-cols-12 gap-4">
        <div data-wf="b-2-0" className="col-span-12 sm:col-span-8 lg:col-span-7">
          <Button
            type="submit"
            form="availability-form"
            disabled={saveState === "saving"}
            className="atrium-tap w-full px-6 py-4 text-[16px]"
            style={{
              borderRadius: 999,
              backgroundColor: ink,
              color: canvas,
              border: "1px solid " + ink,
              fontFamily: brand.fontBody,
              letterSpacing: "0.01em",
              opacity: saveState === "saving" ? 0.75 : 1,
              cursor: saveState === "saving" ? "progress" : "pointer",
            }}
          >
            {saveState === "saving" ? "saving availability…" : "Save availability"}
          </Button>
        </div>
      </div>

      <div className="my-10" style={{ borderTop: "1px solid " + hairline }} aria-hidden="true" />

      {/* ── Row 4 ─ tabs ─────────────────────────────────────────────── */}
      <div data-wf="b-3-0" className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Appointment period"
          className="inline-flex flex-wrap gap-2 p-1.5"
          style={{
            borderRadius: 999,
            backgroundColor: withAlpha(ink, 0.07),
            border: "1px solid " + hairline,
          }}
          onKeyDown={onTabKeyDown}
        >
          {tabDefs.map((t) => {
            const on = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                data-wf={t.wf}
                id={"tab-" + t.key}
                aria-selected={on}
                aria-controls="appointments-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(t.key)}
                className="atrium-tap px-5 py-2.5 text-[14.5px]"
                style={{
                  borderRadius: 999,
                  backgroundColor: on ? ink : "transparent",
                  color: on ? canvas : withAlpha(ink, 0.8),
                  border: "1px solid " + (on ? ink : "transparent"),
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {t.label} ({t.count})
              </button>
            );
          })}
        </div>
        <p className="text-[13px]" style={{ color: withAlpha(ink, 0.65) }}>
          select a patient row, then set the outcome below.
        </p>
      </div>

      {/* ── Row 5 ─ appointments table ───────────────────────────────── */}
      <section
        data-wf="b-4-0"
        id="appointments-panel"
        role="tabpanel"
        aria-labelledby={"tab-" + tab}
        className="mt-6 overflow-hidden"
        style={{ ...panel, backgroundColor: withAlpha(canvas, 0.8) }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 pt-6">
          <h2
            className="text-[22px]"
            style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
          >
            My appointments
          </h2>
          <p
            className="text-[13px]"
            style={{ color: withAlpha(ink, 0.65), fontVariantNumeric: "tabular-nums" }}
          >
            {rows.length} {tab === "upcoming" ? "ahead of you" : "on record"} · slot length 30 min
          </p>
        </div>

        {feedback ? (
          <div className="px-6 pt-4">
            <p
              className="atrium-rise flex items-start gap-2 px-5 py-3 text-[14px] leading-relaxed"
              role="status"
              aria-live="polite"
              style={{
                borderRadius: brand.radius,
                backgroundColor: noticeTone(feedback.tone).bg,
                border: "1px solid " + noticeTone(feedback.tone).border,
                color: noticeTone(feedback.tone).fg,
              }}
            >
              {React.createElement(noticeTone(feedback.tone).Icon, {
                className: "mt-0.5 h-4 w-4 shrink-0",
                "aria-hidden": "true",
              })}
              <span>{feedback.text}</span>
            </p>
          </div>
        ) : null}

        {rows.length === 0 ? (
          <div className="px-6 py-10">
            <Empty
              title={tab === "upcoming" ? "nothing booked ahead" : "no past consultations yet"}
              description={
                tab === "upcoming"
                  ? "your next open window is monday 09:00. patients appear here the moment they book a slot."
                  : "once you see your first patient, the visit and its outcome will be listed here."
              }
              action={
                <Button
                  onClick={refreshSchedule}
                  className="atrium-tap px-5 py-2.5 text-[14px]"
                  style={{
                    borderRadius: 999,
                    backgroundColor: ink,
                    color: canvas,
                    border: "1px solid " + ink,
                  }}
                >
                  refresh schedule
                </Button>
              }
            />
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <Table
              className="w-full"
              style={{ fontVariantNumeric: "tabular-nums", borderCollapse: "collapse" }}
            >
              <caption className="sr-only">
                {tab === "upcoming" ? "Upcoming appointments" : "Past appointments"} for dr. anita
                deshpande
              </caption>
              <THead>
                <TR style={{ borderBottom: "1px solid " + hairline }}>
                  <TH
                    data-wf="i-4-0-0"
                    scope="col"
                    className="px-6 py-3 text-left"
                    style={labelStyle}
                  >
                    Patient
                  </TH>
                  <TH
                    data-wf="i-4-0-1"
                    scope="col"
                    className="px-6 py-3 text-left"
                    style={labelStyle}
                  >
                    Date &amp; time
                  </TH>
                  <TH
                    data-wf="i-4-0-2"
                    scope="col"
                    className="px-6 py-3 text-left"
                    style={labelStyle}
                  >
                    Status
                  </TH>
                  <TH
                    data-wf="i-4-0-3"
                    scope="col"
                    className="px-6 py-3 text-left"
                    style={labelStyle}
                  >
                    Outcome
                  </TH>
                  <TH scope="col" className="px-6 py-3 text-right" style={labelStyle}>
                    <span className="sr-only">Open record</span>
                  </TH>
                </TR>
              </THead>
              <TBody>
                {rows.map((a) => {
                  const token = statusToken[a.status];
                  const on = selectedId === a.id;
                  return (
                    <TR
                      key={a.id}
                      className={"atrium-row" + (fresh.indexOf(a.id) >= 0 ? " atrium-rise" : "")}
                      style={{
                        borderBottom: "1px solid " + hairline,
                        backgroundColor: on ? withAlpha(brass, 0.14) : "transparent",
                        boxShadow: on ? "inset 3px 0 0 0 " + brass : "none",
                      }}
                    >
                      <TD className="px-6 py-4 align-top">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(a.id);
                            setFeedback(null);
                          }}
                          aria-pressed={on}
                          className="atrium-tap text-left"
                          style={{
                            color: ink,
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          <span className="block text-[15.5px]" style={{ fontWeight: 600 }}>
                            {a.patient_name}
                          </span>
                          <span
                            className="mt-0.5 block text-[12.5px]"
                            style={{ color: withAlpha(ink, 0.62) }}
                          >
                            {a.patient_id} · {a.note ? a.note : "slot " + a.slot_id}
                          </span>
                        </button>
                      </TD>
                      <TD
                        className="px-6 py-4 align-top text-[14.5px]"
                        style={{ color: withAlpha(ink, 0.85) }}
                      >
                        {formatStamp(a.start_at)}
                      </TD>
                      <TD className="px-6 py-4 align-top">
                        <Badge
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-[12.5px]"
                          style={{
                            borderRadius: 999,
                            backgroundColor: token.bg,
                            color: token.fg,
                            border: "1px solid " + withAlpha(token.fg, 0.28),
                          }}
                        >
                          <token.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          {token.label}
                        </Badge>
                      </TD>
                      <TD
                        className="px-6 py-4 align-top text-[14px]"
                        style={{ color: withAlpha(ink, 0.72) }}
                      >
                        {outcomeText(a)}
                      </TD>
                      <TD className="px-6 py-4 align-top text-right">
                        <Button
                          onClick={() => navigate("consultation")}
                          aria-label={"Open consultation record for " + a.patient_name}
                          className="atrium-tap inline-flex h-10 w-10 items-center justify-center"
                          style={{
                            borderRadius: 999,
                            border: "1px solid " + hairline,
                            backgroundColor: withAlpha(canvas, 0.9),
                            color: ink,
                          }}
                        >
                          <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </div>
        )}
      </section>

      {/* ── Row 6 ─ outcome actions ──────────────────────────────────── */}
      <div className="mt-6">
        <p id="outcome-help" className="text-[13.5px]" style={{ color: withAlpha(ink, 0.68) }}>
          {selectedVisible
            ? "selected: " +
              selectedVisible.patient_name +
              " · " +
              formatStamp(selectedVisible.start_at)
            : "no patient selected — pick a name in the table to mark an outcome."}
        </p>
        <div className="mt-3 grid grid-cols-12 gap-4">
          <div data-wf="b-5-0" className="col-span-12 sm:col-span-4">
            <Button
              onClick={() => markOutcome("completed")}
              disabled={!selectedVisible}
              aria-describedby="outcome-help"
              className="atrium-tap w-full px-5 py-3.5 text-[15px]"
              style={{
                ...pill,
                color: selectedVisible ? SAGE : withAlpha(ink, 0.45),
                borderColor: selectedVisible ? withAlpha(SAGE, 0.4) : hairline,
                backgroundColor: selectedVisible ? withAlpha(SAGE, 0.08) : withAlpha(neutral, 0.1),
                cursor: selectedVisible ? "pointer" : "not-allowed",
              }}
            >
              Mark completed
            </Button>
          </div>
          <div data-wf="b-5-1" className="col-span-12 sm:col-span-4">
            <Button
              onClick={() => markOutcome("no_show")}
              disabled={!selectedVisible}
              aria-describedby="outcome-help"
              className="atrium-tap w-full px-5 py-3.5 text-[15px]"
              style={{
                ...pill,
                color: selectedVisible ? CLAY : withAlpha(ink, 0.45),
                borderColor: selectedVisible ? withAlpha(CLAY, 0.4) : hairline,
                backgroundColor: selectedVisible ? withAlpha(CLAY, 0.07) : withAlpha(neutral, 0.1),
                cursor: selectedVisible ? "pointer" : "not-allowed",
              }}
            >
              Mark no-show
            </Button>
          </div>
          <div data-wf="b-5-2" className="col-span-12 sm:col-span-4">
            <Button
              onClick={() => navigate("consultation")}
              className="atrium-tap inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-[15px]"
              style={{
                borderRadius: 999,
                backgroundColor: withAlpha(brass, 0.2),
                border: "1px solid " + withAlpha(brass, 0.55),
                color: ink,
              }}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Record consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
