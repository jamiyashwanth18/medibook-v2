// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Textarea, Label, Table, THead, TBody, TR, TH, TD, Empty } = UI;

const hexToRgb = (hex) => {
  const h = String(hex || "")
    .replace("#", "")
    .trim();
  const v =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const withAlpha = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const mixColor = (a, b, t) => {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
};

// Signed-in doctor for this session (the treating doctor on this appointment).
const SESSION = { user_id: "u-203", full_name: "Dr. Meera Iyer", role: "doctor" };

const APPOINTMENT = {
  id: "apt-4821",
  slot_id: "slot-9912",
  patient_id: "u-118",
  doctor_id: "u-203",
  patient_name: "Priya Sharma",
  specialization: "Pulmonology",
  date_label: "24 Nov 2026, 10:00",
  slot_label: "20-minute slot · 10:00 – 10:20",
  place: "in person · consulting room 2",
  status: "completed",
};

const DRAFT = {
  diagnosis: "Acute bronchitis, mild — post-viral cough, no wheeze at rest",
  visit_notes:
    "Day 9 of a dry cough that followed a head cold. No fever since Thursday. Chest clear on auscultation apart from scattered rhonchi on the right base. SpO2 98% on room air, BP 118/76, pulse 82.\n\nAdvised steam inhalation twice a day and warm fluids. Review in one week if the cough has not settled, sooner if breathlessness or fever returns.",
  autosaved_at: "10:44",
};

const INITIAL_LINES = [
  {
    id: "pl-1",
    medicine: "Azithromycin 500 mg",
    dosage: "1 tablet",
    frequency: "once daily, after breakfast",
    duration: "3 days",
  },
  {
    id: "pl-2",
    medicine: "Levocetirizine 5 mg",
    dosage: "1 tablet",
    frequency: "once at night",
    duration: "5 days",
  },
  {
    id: "pl-3",
    medicine: "Salbutamol inhaler 100 mcg",
    dosage: "2 puffs",
    frequency: "as needed, up to 4 times a day",
    duration: "14 days",
  },
];

const LINE_FIELDS = [
  {
    key: "medicine",
    wf: "i-2-0-0",
    label: "Medicine",
    placeholder: "e.g. Doxycycline 100 mg",
    width: "30%",
  },
  { key: "dosage", wf: "i-2-0-1", label: "Dosage", placeholder: "e.g. 1 capsule", width: "18%" },
  {
    key: "frequency",
    wf: "i-2-0-2",
    label: "Frequency",
    placeholder: "e.g. twice daily after food",
    width: "28%",
  },
  { key: "duration", wf: "i-2-0-3", label: "Duration", placeholder: "e.g. 7 days", width: "16%" },
];

const NOTES_LIMIT = 2000;

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const cream = brand.backgroundColor;

  const hairline = withAlpha(ink, 0.14);
  const tintSoft = withAlpha(ink, 0.06);
  const tintStrong = withAlpha(ink, 0.1);
  const surface = "rgba(255, 255, 255, 0.58)";
  const bodyInk = withAlpha(ink, 0.78);
  const quietInk = withAlpha(ink, 0.62);
  const alertInk = mixColor(ink, accent, 0.3);
  const alertTint = withAlpha(accent, 0.14);

  const canAccess = SESSION.user_id === APPOINTMENT.doctor_id;

  const [diagnosis, setDiagnosis] = React.useState(DRAFT.diagnosis);
  const [notes, setNotes] = React.useState(DRAFT.visit_notes);
  const [lines, setLines] = React.useState(INITIAL_LINES);
  const [errors, setErrors] = React.useState(null);
  const [phase, setPhase] = React.useState("editing"); // editing | saving | saved
  const [savedAt, setSavedAt] = React.useState(null);
  const [dirtySinceSave, setDirtySinceSave] = React.useState(false);
  const [confirmRemove, setConfirmRemove] = React.useState(null);
  const [pendingFocus, setPendingFocus] = React.useState(null);
  const [newLineId, setNewLineId] = React.useState(null);

  const inputRefs = React.useRef({});
  const summaryRef = React.useRef(null);
  const timerRef = React.useRef(null);
  const counterRef = React.useRef(INITIAL_LINES.length);

  React.useEffect(() => () => window.clearTimeout(timerRef.current), []);

  React.useEffect(() => {
    if (!pendingFocus) return;
    const el = inputRefs.current[pendingFocus];
    if (el) el.focus();
    setPendingFocus(null);
  }, [pendingFocus]);

  const markDirty = () => {
    if (phase === "saved") setDirtySinceSave(true);
    if (phase !== "editing") setPhase("editing");
  };

  const updateLine = (id, key, value) => {
    markDirty();
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
    setErrors((prev) => {
      if (!prev || !prev.lines[id]) return prev;
      const remaining = prev.lines[id].filter((f) => f !== key || !value.trim());
      const nextLines = { ...prev.lines };
      if (remaining.length) nextLines[id] = remaining;
      else delete nextLines[id];
      return { ...prev, lines: nextLines };
    });
  };

  const addLine = () => {
    counterRef.current += 1;
    const id = `pl-new-${counterRef.current}`;
    markDirty();
    setLines((prev) => [...prev, { id, medicine: "", dosage: "", frequency: "", duration: "" }]);
    setNewLineId(id);
    setPendingFocus(`${id}-medicine`);
  };

  const removeLine = (id) => {
    markDirty();
    setLines((prev) => prev.filter((l) => l.id !== id));
    setConfirmRemove(null);
    setErrors((prev) => {
      if (!prev) return prev;
      const nextLines = { ...prev.lines };
      delete nextLines[id];
      return { ...prev, lines: nextLines };
    });
  };

  const handleSave = () => {
    if (phase === "saving") return;
    if (phase === "saved" && !dirtySinceSave) {
      navigate("doctor-schedule");
      return;
    }

    const lineErrors = {};
    lines.forEach((l) => {
      const missing = LINE_FIELDS.filter((f) => !String(l[f.key] || "").trim()).map((f) => f.key);
      if (missing.length) lineErrors[l.id] = missing;
    });
    const diagnosisMissing = !diagnosis.trim();

    if (diagnosisMissing || Object.keys(lineErrors).length) {
      setErrors({ diagnosis: diagnosisMissing, lines: lineErrors });
      setPhase("editing");
      window.setTimeout(() => summaryRef.current && summaryRef.current.focus(), 0);
      return;
    }

    setErrors(null);
    setPhase("saving");
    timerRef.current = window.setTimeout(() => {
      const now = new Date();
      const stamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setSavedAt(stamp);
      setDirtySinceSave(false);
      setNewLineId(null);
      setPhase("saved");
    }, 950);
  };

  const errorCount = errors ? (errors.diagnosis ? 1 : 0) + Object.keys(errors.lines).length : 0;

  const chip = (label, key) => (
    <span
      key={key}
      className="inline-flex items-center rounded-full px-3 py-1 text-[12px]"
      style={{
        backgroundColor: "rgba(255,255,255,0.6)",
        color: bodyInk,
        border: `1px solid ${hairline}`,
      }}
    >
      {label}
    </span>
  );

  const fieldStyle = (invalid) => ({
    backgroundColor: "rgba(255,255,255,0.72)",
    border: `1px solid ${invalid ? alertInk : hairline}`,
    color: ink,
    boxShadow: invalid ? `0 0 0 3px ${alertTint}` : "none",
  });

  const styleTag = (
    <style>{`
      .atrium-root *:focus-visible {
        outline: 2px solid var(--atrium-accent);
        outline-offset: 2px;
      }
      .atrium-enter { animation: atrium-enter 340ms cubic-bezier(.2,.7,.3,1) both; }
      @keyframes atrium-enter {
        from { opacity: 0; transform: translateY(-6px); }
        to { opacity: 1; transform: none; }
      }
      .atrium-fade { animation: atrium-fade 420ms ease both; }
      @keyframes atrium-fade {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: none; }
      }
      .atrium-dot { animation: atrium-breathe 1.4s ease-in-out infinite; }
      .atrium-dot:nth-child(2) { animation-delay: .18s; }
      .atrium-dot:nth-child(3) { animation-delay: .36s; }
      @keyframes atrium-breathe {
        0%, 100% { opacity: .3; }
        50% { opacity: 1; }
      }
      .atrium-row { transition: background-color 180ms ease; }
      .atrium-press { transition: transform 140ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease; }
      .atrium-press:active { transform: translateY(1px); }
      @media (prefers-reduced-motion: reduce) {
        .atrium-enter, .atrium-fade, .atrium-dot { animation: none !important; }
        .atrium-press, .atrium-row { transition: none !important; }
      }
    `}</style>
  );

  const rootStyle = {
    "--atrium-accent": accent,
    "--atrium-ink": ink,
    fontFamily: brand.fontBody,
    color: ink,
  };

  if (!canAccess) {
    return (
      <div className="atrium-root mx-auto w-full max-w-3xl px-4 py-12 sm:px-6" style={rootStyle}>
        {styleTag}
        <div
          className="px-8 pb-10 pt-12 text-center"
          style={{
            backgroundColor: tintSoft,
            border: `1px solid ${hairline}`,
            borderRadius: "50% 50% 24px 24px / 110px 110px 24px 24px",
          }}
        >
          <span
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: withAlpha(accent, 0.2), color: ink }}
          >
            <Icons.AlertCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1
            className="text-[30px] leading-tight"
            style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
          >
            This record is not yours to open
          </h1>
          <p
            className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed"
            style={{ color: bodyInk }}
          >
            Consultation records are visible only to the patient, the treating doctor for that
            appointment, and clinic administrators. You are not the treating doctor on appointment{" "}
            {APPOINTMENT.id}, so the diagnosis, notes and prescription stay closed. This attempt has
            been written to the record-access log.
          </p>
          <p className="mx-auto mt-3 max-w-[52ch] text-[13px]" style={{ color: quietInk }}>
            need it for a handover? ask a clinic administrator to reassign the appointment.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              className="atrium-press rounded-full px-7 py-3 text-[15px] font-semibold"
              style={{ backgroundColor: ink, color: cream, border: "none" }}
              onClick={() => navigate("doctor-schedule")}
            >
              Back to schedule
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="atrium-root mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
      style={rootStyle}
    >
      {styleTag}

      {/* Row 1 — back + title */}
      <div className="grid grid-cols-12 items-start gap-4">
        <div className="col-span-2 md:col-span-1">
          <Button
            data-wf="b-0-0"
            aria-label="Back to schedule"
            title="Back to schedule"
            className="atrium-press flex h-12 w-12 items-center justify-center rounded-full p-0"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              border: `1px solid ${hairline}`,
              color: ink,
            }}
            onClick={() => navigate("doctor-schedule")}
          >
            <Icons.ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        <header
          data-wf="b-0-1"
          className="col-span-10 md:col-span-11 overflow-hidden px-6 pb-7 pt-9 text-center sm:px-10"
          style={{
            backgroundColor: tintSoft,
            border: `1px solid ${hairline}`,
            borderRadius: "50% 50% 24px 24px / 96px 96px 24px 24px",
          }}
        >
          <svg className="mx-auto mb-3 h-7 w-16" viewBox="0 0 64 28" fill="none" aria-hidden="true">
            <path d="M32 27V8" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
            <path
              d="M32 14c-6 0-10-3-11-8 5-1 9 1 11 8Z"
              stroke={accent}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M32 19c6 0 10-3 11-8-5-1-9 1-11 8Z"
              stroke={accent}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: quietInk }}>
            visit record
          </p>
          <h1 className="mt-2">
            <span
              className="block text-[30px] leading-[1.15] sm:text-[38px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", color: ink }}
            >
              Consultation Record
            </span>
            <span className="sr-only"> - </span>
            <span
              className="mt-2 block text-[15px] sm:text-[16px]"
              style={{ color: bodyInk, fontVariantNumeric: "tabular-nums" }}
            >
              Priya Sharma, 24 Nov 2026, 10:00
            </span>
          </h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {chip(APPOINTMENT.specialization, "spec")}
            {chip(APPOINTMENT.slot_label, "slot")}
            {chip(APPOINTMENT.place, "place")}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
              style={{ backgroundColor: withAlpha(accent, 0.22), color: ink }}
            >
              <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {APPOINTMENT.status}
            </span>
          </div>
        </header>
      </div>

      {/* Row 2 — visit details form */}
      <section
        data-wf="b-1-0"
        className="mt-8 px-6 py-8 sm:px-9"
        style={{
          backgroundColor: surface,
          border: `1px solid ${hairline}`,
          borderRadius: brand.radius,
        }}
        aria-labelledby="visit-details-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="visit-details-heading"
              className="text-[24px] leading-tight"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
            >
              Visit details
            </h2>
            <p
              className="mt-2 flex items-start gap-2 text-[13px] leading-relaxed"
              style={{ color: quietInk }}
            >
              <Icons.Users className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                only you, Priya Sharma and clinic administrators can open this record — every open
                is written to the access log.
              </span>
            </p>
          </div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px]"
            style={{
              backgroundColor: tintSoft,
              color: bodyInk,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span
              className="atrium-dot h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            draft kept on this device · autosaved {DRAFT.autosaved_at}
          </span>
        </div>

        <div className="my-7" style={{ borderTop: `1px solid ${hairline}` }} />

        <div className="space-y-7">
          <div>
            <Label
              htmlFor="diagnosis"
              className="mb-2 block text-[13px] font-semibold tracking-wide"
              style={{ color: ink }}
            >
              Diagnosis
            </Label>
            <Input
              data-wf="i-1-0-0"
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => {
                markDirty();
                setDiagnosis(e.target.value);
                if (errors && errors.diagnosis) setErrors({ ...errors, diagnosis: false });
              }}
              placeholder="e.g. Acute bronchitis, mild"
              aria-invalid={errors && errors.diagnosis ? "true" : "false"}
              aria-describedby="diagnosis-help"
              className="w-full rounded-full px-5 py-3 text-[15px]"
              style={fieldStyle(errors && errors.diagnosis)}
            />
            <p
              id="diagnosis-help"
              className="mt-2 pl-5 text-[12.5px]"
              style={{ color: errors && errors.diagnosis ? alertInk : quietInk }}
            >
              {errors && errors.diagnosis
                ? "a diagnosis is needed before this record can be saved."
                : "one line, in plain clinical terms — this is what Priya sees on her copy."}
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-end justify-between gap-4">
              <Label
                htmlFor="visit-notes"
                className="block text-[13px] font-semibold tracking-wide"
                style={{ color: ink }}
              >
                Visit notes
              </Label>
              <span
                className="text-[12px]"
                style={{ color: quietInk, fontVariantNumeric: "tabular-nums" }}
              >
                {notes.length} / {NOTES_LIMIT}
              </span>
            </div>
            <Textarea
              data-wf="i-1-0-1"
              id="visit-notes"
              rows={7}
              maxLength={NOTES_LIMIT}
              value={notes}
              onChange={(e) => {
                markDirty();
                setNotes(e.target.value);
              }}
              placeholder="history, examination findings, vitals, advice given…"
              aria-describedby="visit-notes-help"
              className="w-full px-5 py-4 text-[15px] leading-relaxed"
              style={{ ...fieldStyle(false), borderRadius: brand.radius, resize: "vertical" }}
            />
            <p
              id="visit-notes-help"
              className="mt-2 pl-5 text-[12.5px]"
              style={{ color: quietInk }}
            >
              optional. observations, vitals and advice given at the visit.
            </p>
          </div>
        </div>
      </section>

      {/* Row 3 — prescription lines */}
      <section
        data-wf="b-2-0"
        className="mt-8 px-6 py-8 sm:px-9"
        style={{
          backgroundColor: surface,
          border: `1px solid ${hairline}`,
          borderRadius: brand.radius,
        }}
        aria-labelledby="prescription-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="prescription-heading"
              className="text-[24px] leading-tight"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
            >
              Prescription lines
            </h2>
            <p className="mt-2 text-[13px]" style={{ color: quietInk }}>
              one line per medicine. all four fields are required on every line.
            </p>
          </div>
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-semibold"
            style={{ backgroundColor: tintStrong, color: ink, fontVariantNumeric: "tabular-nums" }}
          >
            {lines.length} {lines.length === 1 ? "line" : "lines"}
          </span>
        </div>

        <div className="mt-6">
          {lines.length === 0 ? (
            <div
              style={{ backgroundColor: tintSoft, borderRadius: brand.radius }}
              className="px-4 py-6"
            >
              <Empty
                title="No medicines on this prescription yet"
                description="Priya leaves with notes only. Use “Add prescription line” below to write the first medicine, dosage, frequency and duration."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table
                className="w-full min-w-[820px]"
                style={{ fontVariantNumeric: "tabular-nums", borderCollapse: "collapse" }}
              >
                <THead>
                  <TR style={{ borderBottom: `1px solid ${hairline}` }}>
                    {LINE_FIELDS.map((f) => (
                      <TH
                        key={f.key}
                        data-wf={f.wf}
                        scope="col"
                        className="pb-3 pr-4 text-left text-[11px] uppercase tracking-[0.16em]"
                        style={{ color: quietInk, width: f.width, fontWeight: 600 }}
                      >
                        {f.label}
                      </TH>
                    ))}
                    <TH scope="col" className="pb-3 text-right" style={{ width: "8%" }}>
                      <span className="sr-only">Remove line</span>
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {lines.map((line, idx) => {
                    const lineErr = (errors && errors.lines[line.id]) || [];
                    const removing = confirmRemove === line.id;
                    return (
                      <TR
                        key={line.id}
                        className={`atrium-row ${line.id === newLineId ? "atrium-enter" : ""}`}
                        style={{
                          borderBottom: `1px solid ${hairline}`,
                          backgroundColor: removing ? withAlpha(accent, 0.1) : "transparent",
                        }}
                      >
                        {LINE_FIELDS.map((f) => {
                          const invalid = lineErr.indexOf(f.key) !== -1;
                          const inputId = `${line.id}-${f.key}`;
                          return (
                            <TD key={f.key} className="py-3 pr-4 align-top">
                              <Input
                                id={inputId}
                                ref={(el) => {
                                  inputRefs.current[inputId] = el;
                                }}
                                aria-label={`${f.label}, line ${idx + 1}`}
                                aria-invalid={invalid ? "true" : "false"}
                                value={line[f.key]}
                                onChange={(e) => updateLine(line.id, f.key, e.target.value)}
                                placeholder={f.placeholder}
                                className="w-full rounded-full px-4 py-2 text-[14px]"
                                style={fieldStyle(invalid)}
                              />
                              {invalid ? (
                                <span
                                  className="mt-1.5 flex items-center gap-1 pl-4 text-[11.5px] font-semibold"
                                  style={{ color: alertInk }}
                                >
                                  <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                  required
                                </span>
                              ) : null}
                            </TD>
                          );
                        })}
                        <TD className="py-3 align-top text-right">
                          {removing ? (
                            <span className="atrium-fade inline-flex items-center gap-1.5">
                              <Button
                                className="atrium-press rounded-full px-3 py-1.5 text-[12px] font-semibold"
                                style={{ backgroundColor: ink, color: cream, border: "none" }}
                                onClick={() => removeLine(line.id)}
                              >
                                Remove
                              </Button>
                              <Button
                                className="atrium-press rounded-full px-3 py-1.5 text-[12px]"
                                style={{
                                  backgroundColor: "transparent",
                                  color: bodyInk,
                                  border: `1px solid ${hairline}`,
                                }}
                                onClick={() => setConfirmRemove(null)}
                              >
                                Keep
                              </Button>
                            </span>
                          ) : (
                            <Button
                              aria-label={`Remove line ${idx + 1}${line.medicine ? `, ${line.medicine}` : ""}`}
                              className="atrium-press inline-flex h-9 w-9 items-center justify-center rounded-full p-0"
                              style={{
                                backgroundColor: "transparent",
                                color: quietInk,
                                border: `1px solid ${hairline}`,
                              }}
                              onClick={() => setConfirmRemove(line.id)}
                            >
                              <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          )}
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
            </div>
          )}
        </div>
      </section>

      {/* Row 4 — add line */}
      <div className="mt-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <Button
            data-wf="b-3-0"
            onClick={addLine}
            className="atrium-press flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold"
            style={{
              backgroundColor: "transparent",
              color: ink,
              border: `1px solid ${mixColor(accent, ink, 0.15)}`,
            }}
          >
            <Icons.Plus className="h-4 w-4" aria-hidden="true" />
            Add prescription line
          </Button>
        </div>
        <p
          className="col-span-12 self-center text-[13px] md:col-span-8"
          style={{ color: quietInk }}
        >
          a new line opens empty, ready for the medicine name.
        </p>
      </div>

      {/* Row 5 — scope note */}
      <p
        data-wf="b-4-0"
        className="mt-8 py-3 pl-5 text-[13.5px] leading-relaxed"
        style={{ color: bodyInk, borderLeft: `2px solid ${withAlpha(accent, 0.55)}` }}
      >
        Records are entered as structured data. No test report or scan uploads are supported.
        <span className="mt-1 block text-[12.5px]" style={{ color: quietInk }}>
          ask Priya to bring printed reports to the next visit, and type any findings into the notes
          above.
        </span>
      </p>

      {/* Row 6 — save */}
      <div className="mt-8">
        {errorCount > 0 ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="atrium-fade mb-5 px-6 py-5"
            style={{
              backgroundColor: alertTint,
              borderRadius: brand.radius,
              border: `1px solid ${withAlpha(accent, 0.4)}`,
            }}
          >
            <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: ink }}>
              <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
              Not saved — {errorCount} {errorCount === 1 ? "thing needs" : "things need"} finishing
            </p>
            <ul
              className="mt-3 space-y-1.5 pl-6 text-[13.5px]"
              style={{ color: alertInk, listStyleType: "disc" }}
            >
              {errors.diagnosis ? (
                <li>Diagnosis is empty. A record cannot be stored without it.</li>
              ) : null}
              {Object.keys(errors.lines).map((id) => {
                const idx = lines.findIndex((l) => l.id === id);
                const missing = errors.lines[id]
                  .map((k) => (LINE_FIELDS.find((f) => f.key === k) || {}).label)
                  .join(", ")
                  .toLowerCase();
                return (
                  <li key={id} style={{ fontVariantNumeric: "tabular-nums" }}>
                    Line {idx + 1}
                    {lines[idx] && lines[idx].medicine ? ` (${lines[idx].medicine})` : ""} is
                    missing {missing}.
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[12.5px]" style={{ color: quietInk }}>
              everything you typed is still here — fix the fields marked above and save again.
            </p>
          </div>
        ) : null}

        {phase === "saved" && !dirtySinceSave ? (
          <div
            className="atrium-fade mb-5 flex flex-wrap items-center gap-3 px-6 py-5"
            style={{
              backgroundColor: tintSoft,
              borderRadius: brand.radius,
              border: `1px solid ${hairline}`,
            }}
            role="status"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: withAlpha(accent, 0.25), color: ink }}
            >
              <Icons.Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[15px] font-semibold" style={{ color: ink }}>
                Consultation record saved for Priya Sharma
              </p>
              <p
                className="text-[13px]"
                style={{ color: bodyInk, fontVariantNumeric: "tabular-nums" }}
              >
                stored against appointment {APPOINTMENT.id} at {savedAt} with {lines.length}{" "}
                {lines.length === 1 ? "prescription line" : "prescription lines"} · she can read and
                download it from her appointments.
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-12 items-center gap-4">
          <div className="col-span-12 md:col-span-4">
            <Button
              data-wf="b-5-0"
              onClick={handleSave}
              disabled={phase === "saving"}
              aria-live="polite"
              className="atrium-press flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
              style={{
                backgroundColor: ink,
                color: cream,
                border: "none",
                opacity: phase === "saving" ? 0.75 : 1,
                cursor: phase === "saving" ? "progress" : "pointer",
              }}
            >
              {phase === "saving" ? (
                <>
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <span
                      className="atrium-dot h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: cream }}
                    />
                    <span
                      className="atrium-dot h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: cream }}
                    />
                    <span
                      className="atrium-dot h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: cream }}
                    />
                  </span>
                  Saving record…
                </>
              ) : phase === "saved" && !dirtySinceSave ? (
                <>
                  <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to schedule
                </>
              ) : (
                "Save consultation record"
              )}
            </Button>
          </div>
          <p className="col-span-12 text-[13px] md:col-span-8" style={{ color: quietInk }}>
            {phase === "saving"
              ? "writing the record and prescription against this appointment…"
              : phase === "saved" && !dirtySinceSave
                ? "saved. nothing further is needed for this visit."
                : dirtySinceSave
                  ? `edited since the ${savedAt} save — save again to keep the changes.`
                  : "saves the diagnosis, notes and every prescription line against this appointment."}
          </p>
        </div>
      </div>
    </div>
  );
}
