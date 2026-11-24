// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Badge, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Search, Check, X, Calendar, Clock, AlertCircle, CheckCircle } = Icons;

const SPECIALIZATIONS = [
  "Cardiology",
  "General Medicine",
  "Pulmonology",
  "Neurology",
  "Dermatology",
  "Orthopaedics",
];

const MAPPINGS = [
  {
    id: "map-01",
    term: "Chest pain",
    term_type: "symptom",
    normalized_term: "chest pain",
    specializations: ["Cardiology", "General Medicine"],
  },
  {
    id: "map-02",
    term: "Palpitations",
    term_type: "symptom",
    normalized_term: "palpitations",
    specializations: ["Cardiology"],
  },
  {
    id: "map-03",
    term: "Hypertension",
    term_type: "disease",
    normalized_term: "hypertension",
    specializations: ["Cardiology", "General Medicine"],
  },
  {
    id: "map-04",
    term: "Breathlessness",
    term_type: "symptom",
    normalized_term: "breathlessness",
    specializations: ["Pulmonology", "Cardiology"],
  },
  {
    id: "map-05",
    term: "Asthma",
    term_type: "disease",
    normalized_term: "asthma",
    specializations: ["Pulmonology", "General Medicine"],
  },
  {
    id: "map-06",
    term: "Persistent cough",
    term_type: "symptom",
    normalized_term: "persistent cough",
    specializations: ["Pulmonology", "General Medicine"],
  },
  {
    id: "map-07",
    term: "Migraine",
    term_type: "disease",
    normalized_term: "migraine",
    specializations: ["Neurology"],
  },
  {
    id: "map-08",
    term: "Dizziness",
    term_type: "symptom",
    normalized_term: "dizziness",
    specializations: ["Neurology", "General Medicine"],
  },
  {
    id: "map-09",
    term: "Skin rash",
    term_type: "symptom",
    normalized_term: "skin rash",
    specializations: ["Dermatology"],
  },
  {
    id: "map-10",
    term: "Eczema",
    term_type: "disease",
    normalized_term: "eczema",
    specializations: ["Dermatology"],
  },
  {
    id: "map-11",
    term: "Knee pain",
    term_type: "symptom",
    normalized_term: "knee pain",
    specializations: ["Orthopaedics"],
  },
  {
    id: "map-12",
    term: "Fever",
    term_type: "symptom",
    normalized_term: "fever",
    specializations: ["General Medicine"],
  },
];

const DOCTORS = [
  {
    id: "doc-anita",
    full_name: "Dr. Anita Rao",
    specialization: "Cardiology",
    credentials: "MD, DM Cardiology",
    room: "Consulting room 2, first floor",
    slot_length_minutes: 30,
    slots: [
      {
        id: "slot-ar-1",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "10:00",
        end: "10:30",
        status: "available",
      },
      {
        id: "slot-ar-2",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "10:30",
        end: "11:00",
        status: "available",
      },
      {
        id: "slot-ar-3",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "11:00",
        end: "11:30",
        status: "booked",
      },
      {
        id: "slot-ar-4",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "09:00",
        end: "09:30",
        status: "available",
      },
      {
        id: "slot-ar-5",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "09:30",
        end: "10:00",
        status: "available",
        contested: true,
      },
      {
        id: "slot-ar-6",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "16:00",
        end: "16:30",
        status: "available",
      },
    ],
  },
  {
    id: "doc-imran",
    full_name: "Dr. Imran Shaikh",
    specialization: "Cardiology",
    credentials: "MBBS, MD",
    room: "Consulting room 5, ground floor",
    slot_length_minutes: 30,
    slots: [
      {
        id: "slot-is-1",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "14:00",
        end: "14:30",
        status: "available",
      },
      {
        id: "slot-is-2",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "14:30",
        end: "15:00",
        status: "booked",
      },
      {
        id: "slot-is-3",
        day: "Thu 27 Nov",
        dayLong: "thursday 27 november",
        start: "11:30",
        end: "12:00",
        status: "available",
      },
    ],
  },
  {
    id: "doc-meera",
    full_name: "Dr. Meera Nair",
    specialization: "General Medicine",
    credentials: "MBBS",
    room: "Consulting room 1, ground floor",
    slot_length_minutes: 30,
    slots: [
      {
        id: "slot-mn-1",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "09:00",
        end: "09:30",
        status: "available",
      },
      {
        id: "slot-mn-2",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "09:30",
        end: "10:00",
        status: "available",
      },
      {
        id: "slot-mn-3",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "12:00",
        end: "12:30",
        status: "available",
      },
      {
        id: "slot-mn-4",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "12:30",
        end: "13:00",
        status: "booked",
      },
      {
        id: "slot-mn-5",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "10:00",
        end: "10:30",
        status: "available",
      },
      {
        id: "slot-mn-6",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "10:30",
        end: "11:00",
        status: "available",
      },
      {
        id: "slot-mn-7",
        day: "Thu 27 Nov",
        dayLong: "thursday 27 november",
        start: "15:00",
        end: "15:30",
        status: "available",
      },
      {
        id: "slot-mn-8",
        day: "Thu 27 Nov",
        dayLong: "thursday 27 november",
        start: "15:30",
        end: "16:00",
        status: "available",
      },
    ],
  },
  {
    id: "doc-sandeep",
    full_name: "Dr. Sandeep Iyer",
    specialization: "Pulmonology",
    credentials: "MBBS, MD Pulmonary Medicine",
    room: "Consulting room 7, first floor",
    slot_length_minutes: 30,
    slots: [
      {
        id: "slot-si-1",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "11:00",
        end: "11:30",
        status: "available",
      },
      {
        id: "slot-si-2",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "11:30",
        end: "12:00",
        status: "available",
      },
      {
        id: "slot-si-3",
        day: "Fri 28 Nov",
        dayLong: "friday 28 november",
        start: "09:30",
        end: "10:00",
        status: "available",
      },
      {
        id: "slot-si-4",
        day: "Fri 28 Nov",
        dayLong: "friday 28 november",
        start: "10:00",
        end: "10:30",
        status: "booked",
      },
    ],
  },
  {
    id: "doc-rohit",
    full_name: "Dr. Rohit Bansal",
    specialization: "Neurology",
    credentials: "MD, DM Neurology",
    room: "Consulting room 9, second floor",
    slot_length_minutes: 30,
    slots: [
      {
        id: "slot-rb-1",
        day: "Thu 27 Nov",
        dayLong: "thursday 27 november",
        start: "10:00",
        end: "10:30",
        status: "booked",
      },
      {
        id: "slot-rb-2",
        day: "Thu 27 Nov",
        dayLong: "thursday 27 november",
        start: "10:30",
        end: "11:00",
        status: "booked",
      },
    ],
  },
  {
    id: "doc-kavya",
    full_name: "Dr. Kavya Menon",
    specialization: "Dermatology",
    credentials: "MBBS, MD Dermatology",
    room: "Consulting room 4, ground floor",
    slot_length_minutes: 30,
    slots: [
      {
        id: "slot-km-1",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "16:00",
        end: "16:30",
        status: "available",
      },
      {
        id: "slot-km-2",
        day: "Tue 25 Nov",
        dayLong: "tuesday 25 november",
        start: "16:30",
        end: "17:00",
        status: "available",
      },
      {
        id: "slot-km-3",
        day: "Fri 28 Nov",
        dayLong: "friday 28 november",
        start: "12:00",
        end: "12:30",
        status: "available",
      },
      {
        id: "slot-km-4",
        day: "Fri 28 Nov",
        dayLong: "friday 28 november",
        start: "12:30",
        end: "13:00",
        status: "available",
      },
    ],
  },
  {
    id: "doc-farida",
    full_name: "Dr. Farida Qureshi",
    specialization: "Orthopaedics",
    credentials: "MS Orthopaedics",
    room: "Consulting room 6, first floor",
    slot_length_minutes: 30,
    slots: [
      {
        id: "slot-fq-1",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "08:30",
        end: "09:00",
        status: "available",
      },
      {
        id: "slot-fq-2",
        day: "Wed 26 Nov",
        dayLong: "wednesday 26 november",
        start: "09:00",
        end: "09:30",
        status: "available",
      },
      {
        id: "slot-fq-3",
        day: "Thu 27 Nov",
        dayLong: "thursday 27 november",
        start: "17:00",
        end: "17:30",
        status: "available",
      },
      {
        id: "slot-fq-4",
        day: "Fri 28 Nov",
        dayLong: "friday 28 november",
        start: "08:30",
        end: "09:00",
        status: "available",
      },
      {
        id: "slot-fq-5",
        day: "Fri 28 Nov",
        dayLong: "friday 28 november",
        start: "09:00",
        end: "09:30",
        status: "available",
      },
    ],
  },
];

function withAlpha(hex, alpha) {
  const raw = String(hex || "").replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(0,0,0,${alpha})`;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function initialsOf(name) {
  return String(name)
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function resolveTerm(raw) {
  const q = String(raw || "")
    .trim()
    .toLowerCase();
  if (!q) return null;
  const spec =
    SPECIALIZATIONS.find((s) => s.toLowerCase() === q) ||
    (q.length >= 3 ? SPECIALIZATIONS.find((s) => s.toLowerCase().startsWith(q)) : null);
  if (spec) {
    return {
      kind: "specialization",
      term: spec,
      term_type: "specialization",
      specializations: [spec],
    };
  }
  const m =
    MAPPINGS.find((x) => x.normalized_term === q) ||
    (q.length >= 3 ? MAPPINGS.find((x) => x.normalized_term.includes(q)) : null);
  if (m) {
    return {
      kind: "mapping",
      term: m.term,
      term_type: m.term_type,
      specializations: m.specializations,
    };
  }
  return null;
}

function initialSlotStatus() {
  const map = {};
  DOCTORS.forEach((d) =>
    d.slots.forEach((s) => {
      map[s.id] = s.status;
    }),
  );
  return map;
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const bg = brand.backgroundColor;
  const bodyText = withAlpha(ink, 0.76);
  const hair = withAlpha(ink, 0.13);
  const tint = withAlpha(ink, 0.05);
  const tintStrong = withAlpha(ink, 0.08);
  const serif = brand.fontHeading;

  const [query, setQuery] = React.useState("Chest pain");
  const [pendingTerm, setPendingTerm] = React.useState("Chest pain");
  const [phase, setPhase] = React.useState("results"); // idle | loading | results | noresults
  const [resolved, setResolved] = React.useState(() => resolveTerm("chest pain"));
  const [selectedDoctorId, setSelectedDoctorId] = React.useState("doc-anita");
  const [slotStatus, setSlotStatus] = React.useState(initialSlotStatus);
  const [searchTick, setSearchTick] = React.useState(0);

  const [pendingSlot, setPendingSlot] = React.useState(null); // {doctor, slot}
  const [bookingPhase, setBookingPhase] = React.useState("idle"); // idle | submitting | conflict
  const [confirmation, setConfirmation] = React.useState(null);

  const [freshLabel, setFreshLabel] = React.useState("checked 2 minutes ago");
  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshNote, setRefreshNote] = React.useState(null);

  const dialogRef = React.useRef(null);
  const confirmRef = React.useRef(null);
  const triggerRef = React.useRef(null);

  // ---- search (shows a loading state, then resolves against the mapping table)
  React.useEffect(() => {
    if (phase !== "loading") return undefined;
    const id = setTimeout(() => {
      const r = resolveTerm(pendingTerm);
      if (r) {
        const matches = DOCTORS.filter((d) => r.specializations.includes(d.specialization));
        setResolved(r);
        setPhase("results");
        setSelectedDoctorId(matches.length ? matches[0].id : null);
      } else {
        setResolved({ kind: "none", term: pendingTerm.trim() });
        setPhase("noresults");
        setSelectedDoctorId(null);
      }
      setConfirmation(null);
    }, 620);
    return () => clearTimeout(id);
  }, [phase, searchTick, pendingTerm]);

  // ---- booking submit (one booking per slot; a contested slot loses the race)
  React.useEffect(() => {
    if (bookingPhase !== "submitting" || !pendingSlot) return undefined;
    const id = setTimeout(() => {
      const { doctor, slot } = pendingSlot;
      if (slot.contested && slotStatus[slot.id] === "available") {
        setSlotStatus((prev) => ({ ...prev, [slot.id]: "booked" }));
        setBookingPhase("conflict");
        setFreshLabel("checked just now");
        return;
      }
      setSlotStatus((prev) => ({ ...prev, [slot.id]: "mine" }));
      setConfirmation({ doctor, slot });
      setPendingSlot(null);
      setBookingPhase("idle");
      navigate("my-appointments");
    }, 700);
    return () => clearTimeout(id);
  }, [bookingPhase, pendingSlot, slotStatus]);

  // ---- availability re-check
  React.useEffect(() => {
    if (!refreshing) return undefined;
    const id = setTimeout(() => {
      setRefreshing(false);
      setFreshLabel("checked just now");
      setSlotStatus((prev) => {
        if (prev["slot-ar-3"] === "booked") {
          setRefreshNote(
            "a slot opened up: Dr. Anita Rao, Tue 25 Nov, 11:00 – 11:30 was released.",
          );
          return { ...prev, "slot-ar-3": "available" };
        }
        setRefreshNote("no changes since your last check.");
        return prev;
      });
    }, 560);
    return () => clearTimeout(id);
  }, [refreshing]);

  // ---- dialog focus management
  React.useEffect(() => {
    if (pendingSlot && confirmRef.current) confirmRef.current.focus();
  }, [pendingSlot]);

  const matchingDoctors = React.useMemo(() => {
    if (phase !== "results" || !resolved || !resolved.specializations) return [];
    return DOCTORS.filter((d) => resolved.specializations.includes(d.specialization));
  }, [phase, resolved]);

  const selectedDoctor = matchingDoctors.find((d) => d.id === selectedDoctorId) || null;

  const availableCount = (doctor) =>
    doctor.slots.filter((s) => slotStatus[s.id] === "available").length;

  function handleSubmit(e) {
    e.preventDefault();
    const term = query.trim();
    setRefreshNote(null);
    if (!term) {
      setPhase("idle");
      setResolved(null);
      setSelectedDoctorId(null);
      setConfirmation(null);
      return;
    }
    setPendingTerm(term);
    setPhase("loading");
    setSearchTick((t) => t + 1);
  }

  function clearSearch() {
    setQuery("");
    setPendingTerm("");
    setResolved(null);
    setPhase("idle");
    setSelectedDoctorId(null);
    setConfirmation(null);
    setRefreshNote(null);
  }

  function openConfirm(doctor, slot, el) {
    triggerRef.current = el || null;
    setPendingSlot({ doctor, slot });
    setBookingPhase("idle");
    setConfirmation(null);
  }

  function closeDialog() {
    setPendingSlot(null);
    setBookingPhase("idle");
    if (triggerRef.current && triggerRef.current.focus) {
      const node = triggerRef.current;
      window.requestAnimationFrame(() => {
        try {
          node.focus();
        } catch (err) {
          /* node gone */
        }
      });
    }
  }

  function onDialogKeyDown(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeDialog();
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = dialogRef.current.querySelectorAll("button:not([disabled])");
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const css = `
    [data-atrium] :focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
    [data-atrium] .tnum { font-variant-numeric: tabular-nums; }
    @keyframes atriumRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @keyframes atriumArch { from { opacity: 0; transform: translateY(18px) scale(.97); } to { opacity: 1; transform: none; } }
    @keyframes atriumVeil { from { opacity: 0; } to { opacity: 1; } }
    @keyframes atriumBreathe { 0%,100% { opacity: .35; } 50% { opacity: .8; } }
    [data-atrium] .rise { animation: atriumRise .45s cubic-bezier(.22,.61,.36,1) both; }
    [data-atrium] .arch-in { animation: atriumArch .4s cubic-bezier(.22,.61,.36,1) both; }
    [data-atrium] .veil-in { animation: atriumVeil .25s ease both; }
    [data-atrium] .breathe { animation: atriumBreathe 1.4s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      [data-atrium] *, [data-atrium] *::before, [data-atrium] *::after {
        animation: none !important; transition: none !important;
      }
    }
  `;

  const ArchMotif = () => (
    <svg width="54" height="18" viewBox="0 0 54 18" fill="none" aria-hidden="true">
      <path
        d="M1 17V9a7 7 0 0 1 14 0v8M20 17V9a7 7 0 0 1 14 0v8M39 17V9a7 7 0 0 1 14 0v8"
        stroke={accent}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );

  const pill = (label, key) => (
    <span
      key={key}
      className="inline-flex items-center rounded-full px-3 py-1 text-sm"
      style={{
        backgroundColor: withAlpha(accent, 0.18),
        color: ink,
        border: `1px solid ${withAlpha(accent, 0.4)}`,
      }}
    >
      {label}
    </span>
  );

  return (
    <div
      data-atrium=""
      className="min-h-full w-full px-5 py-10 sm:px-8 md:px-10 md:py-14"
      style={{ backgroundColor: bg, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-6xl">
        {/* ── Row 1 ─────────────────────────────────────────────── */}
        <header data-wf="b-0-0" className="rise">
          <p className="text-xs tracking-[0.22em] lowercase" style={{ color: bodyText }}>
            medibook · patient booking
          </p>
          <h1
            className="mt-3 text-[34px] leading-[1.15] sm:text-[40px]"
            style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 600 }}
          >
            Find Care &amp; Book
          </h1>
          <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed" style={{ color: bodyText }}>
            tell us the trouble in your own words. the clinic's own mapping table turns it into the
            right specialization, then shows the slots that are still open today.
          </p>
        </header>

        {/* ── Row 2 ─────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-12 gap-4 sm:gap-5">
          <div data-wf="b-1-0" className="col-span-12 md:col-span-9">
            <Label
              htmlFor="care-search"
              className="mb-2 block text-[13px] lowercase tracking-wide"
              style={{ color: bodyText }}
            >
              search by disease, symptom, or specialization
            </Label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: withAlpha(ink, 0.55) }}
              />
              <Input
                id="care-search"
                name="term"
                type="search"
                value={query}
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. chest pain, asthma, cardiology"
                className="h-14 w-full rounded-full pl-14 pr-6 text-[16px]"
                style={{
                  backgroundColor: tint,
                  border: `1px solid ${hair}`,
                  color: ink,
                  borderRadius: 9999,
                }}
              />
            </div>
          </div>
          <div className="col-span-12 flex items-end md:col-span-3">
            <Button
              type="submit"
              data-wf="b-1-1"
              disabled={phase === "loading"}
              className="h-14 w-full rounded-full text-[15px] font-semibold transition-all duration-200 hover:brightness-110 disabled:opacity-70"
              style={{ backgroundColor: ink, color: bg, borderRadius: 9999, border: "none" }}
            >
              {phase === "loading" ? "Searching…" : "Search"}
            </Button>
          </div>
        </form>

        {/* ── Row 3 ─────────────────────────────────────────────── */}
        <div
          data-wf="b-2-0"
          className="mt-6 rounded-[24px] px-6 py-5"
          style={{ backgroundColor: tint, border: `1px solid ${hair}` }}
        >
          {phase === "loading" && (
            <p className="text-[15px]" style={{ color: bodyText }}>
              <span
                className="breathe mr-2 inline-block h-2 w-2 rounded-full align-middle"
                style={{ backgroundColor: accent }}
              />
              checking the clinic's mapping table for “{pendingTerm}”…
            </p>
          )}

          {phase === "idle" && (
            <p className="text-[15px] leading-relaxed" style={{ color: bodyText }}>
              nothing searched yet. try a symptom such as{" "}
              <em style={{ fontFamily: serif }}>chest pain</em>, a condition such as{" "}
              <em style={{ fontFamily: serif }}>asthma</em>, or a specialization such as{" "}
              <em style={{ fontFamily: serif }}>dermatology</em>.
            </p>
          )}

          {phase === "noresults" && (
            <p className="text-[15px] leading-relaxed" style={{ color: ink }}>
              “{resolved && resolved.term}” isn't in the clinic's mapping table, so no doctors can
              be matched to it.
              <span className="block text-[13px] mt-1" style={{ color: bodyText }}>
                try plainer wording, or ask reception to add the term.
              </span>
            </p>
          )}

          {phase === "results" && resolved && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px] leading-relaxed">
              <strong style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 600 }}>
                {resolved.term}
              </strong>
              <span style={{ color: bodyText }}>
                {resolved.kind === "specialization"
                  ? "searched as a specialization —"
                  : `(${resolved.term_type}) matched to`}
              </span>
              {resolved.specializations.map((s, i) => pill(s, s + i))}
              <span style={{ color: bodyText }}>
                from the clinic's predefined mapping. {matchingDoctors.length}{" "}
                {matchingDoctors.length === 1 ? "doctor" : "doctors"} found.
              </span>
              <span
                className="w-full text-[12px] lowercase tracking-wide"
                style={{ color: bodyText }}
              >
                matched by table lookup only — no AI is involved in choosing your doctor.
              </span>
            </div>
          )}
        </div>

        {/* ── Row 4 ─────────────────────────────────────────────── */}
        <section data-wf="b-3-0" className="mt-10" aria-labelledby="matching-doctors-heading">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="matching-doctors-heading"
              className="text-[24px]"
              style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 600 }}
            >
              Matching doctors
            </h2>
            {phase === "results" && matchingDoctors.length > 0 && (
              <p className="text-[13px] lowercase" style={{ color: bodyText }}>
                choose one to see their open slots
              </p>
            )}
          </div>

          <div className="mt-5">
            {phase === "loading" && (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <li key={i} aria-hidden="true">
                    <div
                      className="breathe h-[260px] w-full"
                      style={{
                        backgroundColor: tintStrong,
                        borderRadius: "150px 150px 24px 24px",
                        animationDelay: `${i * 160}ms`,
                      }}
                    />
                  </li>
                ))}
                <li className="sr-only" aria-live="polite">
                  loading matching doctors
                </li>
              </ul>
            )}

            {phase === "idle" && (
              <Empty
                title="start with how you feel"
                description="type a disease, a symptom, or a specialization above and press Search. the clinic keeps the term list, so plain words like “breathlessness” or “knee pain” work."
              />
            )}

            {phase === "noresults" && (
              <Empty
                title={`no doctors matched “${resolved ? resolved.term : ""}”`}
                description="that term isn't in the clinic's disease-to-specialization mapping yet, so nothing can be matched to it. try a simpler word, or call reception on 080 4100 2266 and they'll add it."
                action={
                  <Button
                    type="button"
                    onClick={clearSearch}
                    className="h-11 rounded-full px-6 text-[14px] font-semibold"
                    style={{ backgroundColor: ink, color: bg, borderRadius: 9999, border: "none" }}
                  >
                    Clear search
                  </Button>
                }
              />
            )}

            {phase === "results" && (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {matchingDoctors.map((d, idx) => {
                  const open = availableCount(d);
                  const isSelected = selectedDoctorId === d.id;
                  return (
                    <li key={d.id} className="arch-in" style={{ animationDelay: `${idx * 70}ms` }}>
                      <button
                        type="button"
                        data-wf={idx < 3 ? `i-3-0-${idx}` : undefined}
                        onClick={() => {
                          setSelectedDoctorId(d.id);
                          setRefreshNote(null);
                        }}
                        aria-pressed={isSelected}
                        className="flex h-full w-full flex-col items-center px-6 pb-7 pt-9 text-center transition-all duration-300 hover:-translate-y-[2px]"
                        style={{
                          borderRadius: "150px 150px 24px 24px",
                          backgroundColor: isSelected ? withAlpha(accent, 0.16) : tint,
                          border: `1px solid ${isSelected ? withAlpha(accent, 0.55) : hair}`,
                        }}
                      >
                        <span
                          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-[17px]"
                          style={{
                            backgroundColor: isSelected
                              ? withAlpha(accent, 0.32)
                              : withAlpha(ink, 0.09),
                            fontFamily: serif,
                            fontStyle: "italic",
                          }}
                        >
                          {initialsOf(d.full_name)}
                        </span>
                        <span className="text-[19px] leading-snug" style={{ fontFamily: serif }}>
                          {d.full_name}
                        </span>
                        <span className="mt-1 text-[14px]" style={{ color: bodyText }}>
                          {d.specialization}
                        </span>
                        <span className="mt-1 text-[13px]" style={{ color: bodyText }}>
                          {d.credentials}
                        </span>
                        <span
                          className="tnum mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px]"
                          style={{
                            backgroundColor: open ? withAlpha(accent, 0.2) : withAlpha(ink, 0.08),
                            color: ink,
                          }}
                        >
                          {open ? (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          {open
                            ? `${open} slot${open === 1 ? "" : "s"} available`
                            : "fully booked this week"}
                        </span>
                        <span
                          className="mt-3 h-4 text-[12px] lowercase tracking-wide"
                          style={{ color: bodyText }}
                        >
                          {isSelected ? "showing slots below" : ""}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* ── Row 5 ─────────────────────────────────────────────── */}
        <section data-wf="b-4-0" className="mt-12" aria-labelledby="slots-heading">
          <div
            className="overflow-hidden"
            style={{ borderRadius: 24, backgroundColor: tint, border: `1px solid ${hair}` }}
          >
            <div className="flex flex-wrap items-end justify-between gap-4 px-6 py-6 sm:px-8">
              <div>
                <ArchMotif />
                <h2
                  id="slots-heading"
                  className="mt-2 text-[24px]"
                  style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 600 }}
                >
                  {selectedDoctor
                    ? `${selectedDoctor.full_name} — available ${selectedDoctor.slot_length_minutes}-minute slots`
                    : "Available consultation slots"}
                </h2>
                {selectedDoctor && (
                  <p className="mt-1 text-[13px] lowercase" style={{ color: bodyText }}>
                    {selectedDoctor.room} · in person only
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] lowercase"
                  style={{ backgroundColor: withAlpha(ink, 0.07), color: bodyText }}
                >
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  availability {refreshing ? "checking…" : freshLabel}
                </span>
                <Button
                  type="button"
                  onClick={() => {
                    setRefreshNote(null);
                    setRefreshing(true);
                  }}
                  disabled={refreshing}
                  className="h-10 rounded-full px-4 text-[13px] transition-colors duration-200 disabled:opacity-60"
                  style={{
                    backgroundColor: "transparent",
                    color: ink,
                    border: `1px solid ${hair}`,
                    borderRadius: 9999,
                  }}
                >
                  Refresh slots
                </Button>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${hair}` }} />

            <div className="px-6 pb-8 pt-6 sm:px-8">
              {confirmation && (
                <div
                  className="rise mb-6 flex items-start gap-3 rounded-[20px] px-5 py-4"
                  role="status"
                  style={{
                    backgroundColor: withAlpha(accent, 0.18),
                    border: `1px solid ${withAlpha(accent, 0.5)}`,
                  }}
                >
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden="true"
                    style={{ color: ink }}
                  />
                  <div>
                    <p className="text-[15px]" style={{ fontFamily: serif, fontStyle: "italic" }}>
                      Booked — {confirmation.doctor.full_name}, {confirmation.slot.day},{" "}
                      <span className="tnum">
                        {confirmation.slot.start} – {confirmation.slot.end}
                      </span>
                    </p>
                    <p className="mt-1 text-[13px]" style={{ color: bodyText }}>
                      in person at the clinic; the fee is settled offline at reception. it's now on
                      your appointments list.
                    </p>
                  </div>
                </div>
              )}

              {refreshNote && (
                <p className="rise mb-5 text-[13px] lowercase" style={{ color: bodyText }}>
                  {refreshNote}
                </p>
              )}

              {!selectedDoctor && phase === "results" && matchingDoctors.length > 0 && (
                <p className="py-6 text-[15px] lowercase" style={{ color: bodyText }}>
                  pick a doctor above to see the slots that are still open.
                </p>
              )}

              {!selectedDoctor && phase !== "results" && (
                <p className="py-6 text-[15px] lowercase" style={{ color: bodyText }}>
                  slots appear here once a search matches at least one doctor.
                </p>
              )}

              {selectedDoctor && availableCount(selectedDoctor) === 0 && (
                <div className="py-4">
                  <p className="text-[16px]" style={{ fontFamily: serif, fontStyle: "italic" }}>
                    {selectedDoctor.full_name} has no open slots this week.
                  </p>
                  <p
                    className="mt-1 max-w-[56ch] text-[14px] leading-relaxed"
                    style={{ color: bodyText }}
                  >
                    every slot in the current weekly pattern is taken. choose another doctor from
                    the matches above, or check again later — slots free up when patients cancel.
                  </p>
                </div>
              )}

              {selectedDoctor &&
                availableCount(selectedDoctor) > 0 &&
                (() => {
                  const wfIds = selectedDoctor.slots
                    .filter((s) => slotStatus[s.id] === "available")
                    .slice(0, 3)
                    .map((s) => s.id);
                  const groups = [];
                  selectedDoctor.slots.forEach((s) => {
                    const g = groups.find((x) => x.day === s.day);
                    if (g) g.items.push(s);
                    else groups.push({ day: s.day, dayLong: s.dayLong, items: [s] });
                  });
                  return (
                    <div className="space-y-7">
                      {groups.map((g) => (
                        <div key={g.day}>
                          <h3
                            className="text-[12px] lowercase tracking-[0.18em]"
                            style={{ color: bodyText }}
                          >
                            {g.dayLong}
                          </h3>
                          <ul className="mt-2">
                            {g.items.map((s, i) => {
                              const status = slotStatus[s.id];
                              const isFree = status === "available";
                              const wfIndex = wfIds.indexOf(s.id);
                              return (
                                <li
                                  key={s.id}
                                  className="flex flex-wrap items-center gap-x-4 gap-y-3 py-4"
                                  style={{ borderTop: i ? `1px solid ${hair}` : "none" }}
                                >
                                  <span
                                    className="tnum w-[150px] text-[16px]"
                                    style={{ fontFamily: serif }}
                                  >
                                    {s.start} – {s.end}
                                  </span>
                                  <span className="tnum text-[13px]" style={{ color: bodyText }}>
                                    {selectedDoctor.slot_length_minutes} min
                                  </span>
                                  <span className="ml-auto flex items-center gap-4">
                                    <Badge
                                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px]"
                                      style={{
                                        backgroundColor:
                                          status === "mine"
                                            ? withAlpha(accent, 0.26)
                                            : isFree
                                              ? withAlpha(accent, 0.15)
                                              : withAlpha(ink, 0.08),
                                        color: ink,
                                        border: "none",
                                        borderRadius: 9999,
                                      }}
                                    >
                                      {isFree ? (
                                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                      ) : status === "mine" ? (
                                        <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                      ) : (
                                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                                      )}
                                      {isFree
                                        ? "Available"
                                        : status === "mine"
                                          ? "Yours"
                                          : "Booked"}
                                    </Badge>
                                    {isFree ? (
                                      <Button
                                        type="button"
                                        data-wf={wfIndex >= 0 ? `i-4-0-${wfIndex}` : undefined}
                                        onClick={(e) =>
                                          openConfirm(selectedDoctor, s, e.currentTarget)
                                        }
                                        aria-label={`Select ${s.day}, ${s.start} to ${s.end} with ${selectedDoctor.full_name}`}
                                        className="h-11 rounded-full px-6 text-[14px] font-semibold transition-all duration-200 hover:brightness-110"
                                        style={{
                                          backgroundColor: ink,
                                          color: bg,
                                          borderRadius: 9999,
                                          border: "none",
                                        }}
                                      >
                                        Select
                                      </Button>
                                    ) : (
                                      <span
                                        className="w-[108px] text-right text-[12px] lowercase"
                                        style={{ color: bodyText }}
                                      >
                                        {status === "mine" ? "confirmed for you" : "taken"}
                                      </span>
                                    )}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  );
                })()}
            </div>
          </div>
        </section>
      </div>

      {/* ── Rows 6–8: confirm booking dialog ──────────────────── */}
      {pendingSlot && (
        <div
          className="veil-in fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: withAlpha(ink, 0.5) }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div
            data-wf="b-5-0"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-booking-title"
            aria-describedby="confirm-booking-terms"
            onKeyDown={onDialogKeyDown}
            className="arch-in w-full max-w-[460px] px-7 pb-8 pt-10 sm:px-9"
            style={{
              backgroundColor: bg,
              borderRadius: "230px 230px 24px 24px",
              boxShadow: `0 28px 70px ${withAlpha(ink, 0.35)}`,
              border: `1px solid ${hair}`,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: withAlpha(accent, 0.22) }}
              >
                <Calendar className="h-6 w-6" aria-hidden="true" style={{ color: ink }} />
              </span>
              <h2
                id="confirm-booking-title"
                className="mt-4 text-[24px] leading-snug"
                style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 600 }}
              >
                Confirm booking
              </h2>
              <p className="tnum mt-2 text-[15px]" style={{ color: ink }}>
                {pendingSlot.doctor.full_name}, {pendingSlot.slot.day}, {pendingSlot.slot.start} –{" "}
                {pendingSlot.slot.end}
              </p>
              <p className="mt-1 text-[13px] lowercase" style={{ color: bodyText }}>
                {pendingSlot.doctor.specialization} · {pendingSlot.doctor.slot_length_minutes}{" "}
                minutes · {pendingSlot.doctor.room}
              </p>
            </div>

            <div
              data-wf="b-6-0"
              id="confirm-booking-terms"
              className="mt-6 rounded-[20px] px-5 py-4 text-[14px] leading-relaxed"
              style={{ backgroundColor: tintStrong, color: bodyText }}
            >
              This consultation is in person at the clinic. Any consultation fee is settled offline
              at the clinic reception.
            </div>

            {bookingPhase === "conflict" && (
              <div
                className="rise mt-4 flex items-start gap-3 rounded-[20px] px-5 py-4"
                role="alert"
                style={{
                  backgroundColor: withAlpha(accent, 0.16),
                  border: `1px solid ${withAlpha(accent, 0.55)}`,
                }}
              >
                <AlertCircle
                  className="mt-0.5 h-5 w-5 shrink-0"
                  aria-hidden="true"
                  style={{ color: ink }}
                />
                <p className="text-[14px] leading-relaxed" style={{ color: ink }}>
                  <strong style={{ fontFamily: serif, fontStyle: "italic" }}>
                    Taken a moment before you.
                  </strong>{" "}
                  another patient confirmed this slot while this window was open, so it couldn't be
                  booked twice. your search and your doctor are still here — close this and pick
                  another time.
                </p>
              </div>
            )}

            <div className="mt-7 grid grid-cols-12 gap-3">
              <Button
                type="button"
                data-wf="b-7-0"
                ref={confirmRef}
                onClick={() => setBookingPhase("submitting")}
                disabled={bookingPhase !== "idle"}
                aria-disabled={bookingPhase !== "idle"}
                className="col-span-7 h-12 rounded-full text-[15px] font-semibold transition-all duration-200 hover:brightness-110 disabled:opacity-60"
                style={{ backgroundColor: ink, color: bg, borderRadius: 9999, border: "none" }}
              >
                {bookingPhase === "submitting" ? "Holding the slot…" : "Confirm booking"}
              </Button>
              <Button
                type="button"
                data-wf="b-7-1"
                onClick={closeDialog}
                className="col-span-5 h-12 rounded-full text-[15px] transition-colors duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: ink,
                  border: `1px solid ${withAlpha(ink, 0.35)}`,
                  borderRadius: 9999,
                }}
              >
                Cancel
              </Button>
            </div>

            <p className="mt-4 text-center text-[12px] lowercase" style={{ color: bodyText }}>
              one booking per slot · press esc to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
