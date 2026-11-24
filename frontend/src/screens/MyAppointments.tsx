// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Table, THead, TBody, TR, TH, TD, Avatar, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Search, Check, X, ChevronRight, Users, FileText, Calendar, Clock, Download, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const RGBA = (hex, a) => {
  const h = String(hex).replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

/* semantic status tokens — reserved hues, used for outcome only, never for chrome */
const STATUS = {
  booked:    { label: 'Booked',    fg: '#3f5a3a', bg: 'rgba(63, 90, 58, 0.12)' },
  completed: { label: 'Completed', fg: '#46412f', bg: 'rgba(70, 65, 47, 0.10)' },
  cancelled: { label: 'Cancelled', fg: '#6b6657', bg: 'rgba(151, 145, 127, 0.20)' },
  no_show:   { label: 'No-show',   fg: '#8d4f2f', bg: 'rgba(141, 79, 47, 0.12)' },
};

const CUTOFF_HOURS = 24;

const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-2461', slot: 'SLT-88204', doctor: 'Dr. Arvind Raghavan', credentials: 'MD, DM (Cardiology)',
    specialization: 'Cardiology', dateLabel: 'Wed 25 Nov 2026', timeLabel: '08:30 – 08:50',
    room: 'Room 2 · Atrium Clinic, Indiranagar', status: 'booked', when: 'upcoming',
    hoursAway: 19, sortKey: 20261125083000,
  },
  {
    id: 'APT-2448', slot: 'SLT-88311', doctor: 'Dr. Meera Nair', credentials: 'MS (ENT)',
    specialization: 'Otolaryngology (ENT)', dateLabel: 'Thu 26 Nov 2026', timeLabel: '10:00 – 10:20',
    room: 'Room 5 · Atrium Clinic, Indiranagar', status: 'booked', when: 'upcoming',
    hoursAway: 44, sortKey: 20261126100000,
  },
  {
    id: 'APT-2402', slot: 'SLT-87940', doctor: 'Dr. Nandita Bose', credentials: 'MD (General Medicine)',
    specialization: 'General Medicine', dateLabel: 'Wed 18 Nov 2026', timeLabel: '12:20 – 12:40',
    room: 'Room 1 · Atrium Clinic, Indiranagar', status: 'completed', when: 'past',
    hoursAway: -150, sortKey: 20261118122000,
  },
  {
    id: 'APT-2390', slot: 'SLT-87612', doctor: 'Dr. Meera Nair', credentials: 'MS (ENT)',
    specialization: 'Otolaryngology (ENT)', dateLabel: 'Thu 12 Nov 2026', timeLabel: '09:30 – 09:50',
    room: 'Room 5 · Atrium Clinic, Indiranagar', status: 'completed', when: 'past',
    hoursAway: -294, sortKey: 20261112093000,
  },
  {
    id: 'APT-2371', slot: 'SLT-87188', doctor: 'Dr. Priya Varghese', credentials: 'MD (Dermatology)',
    specialization: 'Dermatology', dateLabel: 'Thu 05 Nov 2026', timeLabel: '16:00 – 16:20',
    room: 'Room 4 · Atrium Clinic, Indiranagar', status: 'completed', when: 'past',
    hoursAway: -456, sortKey: 20261105160000,
  },
  {
    id: 'APT-2344', slot: 'SLT-86702', doctor: 'Dr. Samuel Fernandes', credentials: 'MS (Orthopaedics)',
    specialization: 'Orthopaedics', dateLabel: 'Thu 29 Oct 2026', timeLabel: '11:40 – 12:00',
    room: 'Room 3 · Atrium Clinic, Indiranagar', status: 'no_show', when: 'past',
    hoursAway: -624, sortKey: 20261029114000,
  },
  {
    id: 'APT-2309', slot: 'SLT-86144', doctor: 'Dr. Arvind Raghavan', credentials: 'MD, DM (Cardiology)',
    specialization: 'Cardiology', dateLabel: 'Wed 21 Oct 2026', timeLabel: '08:50 – 09:10',
    room: 'Room 2 · Atrium Clinic, Indiranagar', status: 'cancelled', when: 'past',
    hoursAway: -816, sortKey: 20261021085000,
  },
];

const RECORDS = {
  'APT-2390': {
    diagnosis: 'Acute viral pharyngitis',
    visitNotes: 'Rest, fluids, review in 5 days if fever persists',
    filedOn: 'filed 12 Nov 2026, 10:04',
    prescription: [
      { medicine: 'Paracetamol 500 mg', dosage: '1 tablet', frequency: 'twice daily', duration: '5 days' },
      { medicine: 'Benzydamine gargle', dosage: '15 ml', frequency: 'three times daily', duration: '4 days' },
    ],
  },
  'APT-2371': {
    diagnosis: 'Seborrhoeic dermatitis of the scalp',
    visitNotes: 'Medicated wash twice a week, avoid very hot water. Return in 3 weeks if itching continues.',
    filedOn: 'filed 05 Nov 2026, 16:38',
    prescription: [
      { medicine: 'Ketoconazole 2% shampoo', dosage: '1 application', frequency: 'twice weekly', duration: '4 weeks' },
      { medicine: 'Cetirizine 10 mg', dosage: '1 tablet', frequency: 'at night', duration: '10 days' },
    ],
  },
};

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const neutral = brand.neutralColor;
  const canvas = brand.backgroundColor;

  const [appointments, setAppointments] = React.useState(INITIAL_APPOINTMENTS);
  const [tab, setTab] = React.useState('upcoming');
  const [selectedId, setSelectedId] = React.useState('APT-2448');
  const [recordId, setRecordId] = React.useState('APT-2390');
  const [banner, setBanner] = React.useState(null);
  const [download, setDownload] = React.useState('idle');

  const timerRef = React.useRef(null);
  const cancelBtnRef = React.useRef(null);
  const tabRefs = React.useRef({});

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  const focusable = { '--tw-ring-color': accent, '--tw-ring-offset-color': canvas };
  const ringCls = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-150';

  const upcoming = appointments
    .filter((a) => a.when === 'upcoming')
    .sort((a, b) => a.sortKey - b.sortKey);
  const past = appointments
    .filter((a) => a.when === 'past')
    .sort((a, b) => b.sortKey - a.sortKey);

  const rows = tab === 'upcoming' ? upcoming : past;
  const selected = appointments.find((a) => a.id === selectedId) || null;
  const selectedIsUpcoming = !!selected && selected.when === 'upcoming' && selected.status === 'booked';
  const canChange = !!selected && selectedIsUpcoming && selected.hoursAway >= CUTOFF_HOURS;

  const recordAppt = appointments.find((a) => a.id === recordId) || null;
  const record = recordAppt ? RECORDS[recordAppt.id] : null;
  const nextVisit = upcoming[0] || null;

  const TABS = [
    { key: 'upcoming', label: 'Upcoming', count: upcoming.length, wf: 'i-1-0-0' },
    { key: 'past', label: 'Past', count: past.length, wf: 'i-1-0-1' },
  ];

  function onTabKeyDown(e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.key === tab);
    const next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
    setTab(next.key);
    const el = tabRefs.current[next.key];
    if (el) el.focus();
  }

  function pickRow(appt) {
    setSelectedId(appt.id);
    if (RECORDS[appt.id]) {
      setRecordId(appt.id);
      setDownload('idle');
    } else if (appt.when === 'past') {
      setRecordId(appt.id);
      setDownload('idle');
    }
    setBanner(null);
  }

  function handleReschedule() {
    if (!selected) return;
    if (!selectedIsUpcoming) {
      setBanner({ kind: 'blocked', title: 'this visit is already closed', text: 'past and cancelled visits cannot be moved. pick an upcoming visit, or search for care to book a new one.' });
      return;
    }
    if (!canChange) {
      setBanner({
        kind: 'blocked',
        title: 'past the change cut-off',
        text: `changes close ${CUTOFF_HOURS} hours before a slot. your ${selected.dateLabel} visit with ${selected.doctor} is ${selected.hoursAway} hours away, so it can no longer be moved. call the front desk on 080 4477 2190 if you need help.`,
      });
      return;
    }
    navigate('find-care');
  }

  function askCancel() {
    if (!selected) return;
    if (!selectedIsUpcoming) {
      setBanner({ kind: 'blocked', title: 'nothing to cancel here', text: 'this visit has already finished or been cancelled. choose an upcoming visit to cancel it.' });
      return;
    }
    if (!canChange) {
      setBanner({
        kind: 'blocked',
        title: 'past the change cut-off',
        text: `cancellations close ${CUTOFF_HOURS} hours before a slot. your ${selected.dateLabel}, ${selected.timeLabel} visit is ${selected.hoursAway} hours away. call the front desk on 080 4477 2190 so the slot can be freed for someone else.`,
      });
      return;
    }
    cancelAppointment(selected);
  }

  function cancelAppointment(appt) {
    if (!appt) return;
    setAppointments((prev) =>
      prev.map((a) => (a.id === appt.id ? { ...a, status: 'cancelled', when: 'past', justChanged: true } : a))
    );
    const remaining = upcoming.filter((a) => a.id !== appt.id);
    setSelectedId(remaining.length ? remaining[0].id : null);
    setBanner({
      kind: 'success',
      title: 'appointment cancelled',
      text: `${appt.dateLabel}, ${appt.timeLabel} with ${appt.doctor} is cancelled and slot ${appt.slot} is back on offer. nothing is owed — fees are settled at the clinic only after a visit.`,
    });
    if (cancelBtnRef.current) cancelBtnRef.current.focus();
  }

  function handleDownload() {
    if (!record) return;
    setDownload('preparing');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDownload('ready'), 900);
  }

  const fileName = recordAppt
    ? `atrium-record-${recordAppt.doctor.replace(/^Dr\.\s*/, '').toLowerCase().replace(/\s+/g, '-')}-${recordAppt.dateLabel.split(' ').slice(1).join('-').toLowerCase()}.pdf`
    : '';

  const softPanel = { backgroundColor: RGBA(ink, 0.06), borderRadius: brand.radius };
  const hair = { backgroundColor: RGBA(ink, 0.12) };

  return (
    <div
      className="min-h-full w-full"
      style={{ backgroundColor: canvas, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{`
        @keyframes atriumRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes atriumFade { from { opacity: 0; } to { opacity: 1; } }
        .atrium-rise { animation: atriumRise .34s cubic-bezier(.2,.7,.3,1) both; }
        .atrium-fade { animation: atriumFade .25s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .atrium-rise, .atrium-fade { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1120px] px-6 py-10 sm:px-10 sm:py-14">

        {/* ── b-0-0 page title ─────────────────────────────── */}
        <header data-wf="b-0-0" className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[34rem]">
            <p className="text-xs tracking-[0.18em] uppercase" style={{ color: neutral }}>
              atrium clinic · patient
            </p>
            <h1
              className="mt-3 text-[34px] leading-[1.15] sm:text-[40px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', fontWeight: 600, color: ink }}
            >
              My Appointments
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: RGBA(ink, 0.75) }}>
              every visit is in person at the clinic. consultation fees are settled at the front desk — never online.
            </p>
          </div>

          {nextVisit ? (
            <div
              className="w-full max-w-[20rem] px-7 pb-6 pt-8 text-center"
              style={{ backgroundColor: RGBA(ink, 0.07), borderRadius: '160px 160px 24px 24px' }}
            >
              <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: neutral }}>
                next visit
              </span>
              <p
                className="mt-2 text-[20px]"
                style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', color: ink }}
              >
                {nextVisit.doctor}
              </p>
              <p className="mt-1 text-[14px]" style={{ color: RGBA(ink, 0.8), fontVariantNumeric: 'tabular-nums' }}>
                {nextVisit.dateLabel} · {nextVisit.timeLabel}
              </p>
              <p className="mt-1 text-[13px]" style={{ color: neutral }}>{nextVisit.room}</p>
            </div>
          ) : (
            <div
              className="w-full max-w-[20rem] px-7 pb-6 pt-8 text-center"
              style={{ backgroundColor: RGBA(ink, 0.07), borderRadius: '160px 160px 24px 24px' }}
            >
              <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: neutral }}>
                next visit
              </span>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: RGBA(ink, 0.8) }}>
                nothing on the calendar. the clinic is open mon–sat, 08:00–19:00.
              </p>
            </div>
          )}
        </header>

        <div className="my-10 h-px w-full" style={hair} aria-hidden="true" />

        {/* ── b-1-0 tabs ───────────────────────────────────── */}
        <div data-wf="b-1-0">
          <div
            role="tablist"
            aria-label="Appointment periods"
            onKeyDown={onTabKeyDown}
            className="inline-flex flex-wrap gap-2 p-1.5"
            style={{ backgroundColor: RGBA(ink, 0.07), borderRadius: 999 }}
          >
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  data-wf={t.wf}
                  ref={(el) => { tabRefs.current[t.key] = el; }}
                  role="tab"
                  id={`tab-${t.key}`}
                  aria-selected={active}
                  aria-controls="panel-appointments"
                  tabIndex={active ? 0 : -1}
                  onClick={() => { setTab(t.key); setBanner(null); }}
                  className={`${ringCls} min-h-[44px] px-6 text-[15px]`}
                  style={{
                    ...focusable,
                    borderRadius: 999,
                    backgroundColor: active ? ink : 'transparent',
                    color: active ? canvas : RGBA(ink, 0.78),
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {t.label}
                  <span
                    className="ml-2 text-[13px]"
                    style={{ color: active ? RGBA(accent, 1) : neutral, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── b-2-0 appointments table ─────────────────────── */}
        <section
          data-wf="b-2-0"
          id="panel-appointments"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          tabIndex={-1}
          className="mt-8 px-5 py-7 sm:px-8"
          style={softPanel}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2
              className="text-[22px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', color: ink }}
            >
              Appointments
            </h2>
            <p className="flex items-center gap-2 text-[13px]" style={{ color: neutral }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
              slot availability synced 2 minutes ago
            </p>
          </div>

          {banner ? (
            <div
              className="atrium-rise mt-6 flex items-start gap-4 px-6 py-5"
              role={banner.kind === 'success' ? 'status' : 'alert'}
              style={{
                backgroundColor: banner.kind === 'success' ? STATUS.booked.bg : STATUS.no_show.bg,
                borderRadius: brand.radius,
              }}
            >
              {banner.kind === 'success' ? (
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: STATUS.booked.fg }} aria-hidden="true" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: STATUS.no_show.fg }} aria-hidden="true" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold" style={{ color: banner.kind === 'success' ? STATUS.booked.fg : STATUS.no_show.fg }}>
                  {banner.title}
                </p>
                <p className="mt-1 text-[14px] leading-relaxed" style={{ color: RGBA(ink, 0.82) }}>
                  {banner.text}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBanner(null)}
                aria-label="Dismiss message"
                className={`${ringCls} -mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center`}
                style={{ ...focusable, borderRadius: 999, color: RGBA(ink, 0.7) }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}

          {rows.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <Table className="w-full" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse' }}>
                <THead>
                  <TR>
                    <TH data-wf="i-2-0-0" className="py-3 text-left text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral, fontWeight: 600 }}>Doctor</TH>
                    <TH data-wf="i-2-0-1" className="py-3 text-left text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral, fontWeight: 600 }}>Specialization</TH>
                    <TH data-wf="i-2-0-2" className="py-3 text-left text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral, fontWeight: 600 }}>Date &amp; time</TH>
                    <TH data-wf="i-2-0-3" className="py-3 text-left text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral, fontWeight: 600 }}>Status</TH>
                    <TH data-wf="i-2-0-4" className="py-3 text-right text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral, fontWeight: 600 }}>Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {rows.map((a) => {
                    const s = STATUS[a.status];
                    const isSel = a.id === selectedId;
                    const hasRecord = !!RECORDS[a.id];
                    return (
                      <TR
                        key={a.id}
                        className={a.justChanged ? 'atrium-rise' : ''}
                        style={{
                          backgroundColor: isSel ? RGBA(accent, 0.16) : 'transparent',
                          boxShadow: `inset 0 -1px 0 ${RGBA(ink, 0.12)}${isSel ? `, inset 3px 0 0 ${accent}` : ''}`,
                          transition: 'background-color .18s ease',
                        }}
                      >
                        <TD className="py-5 pr-4 align-top">
                          <div className="flex items-start gap-3">
                            <Avatar name={a.doctor.replace(/^Dr\.\s*/, '')} className="h-9 w-9 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-[15px] font-semibold leading-tight" style={{ color: ink }}>{a.doctor}</p>
                              <p className="mt-1 text-[13px]" style={{ color: neutral }}>{a.credentials}</p>
                              <p className="mt-0.5 text-[12px]" style={{ color: neutral }}>ref {a.id}</p>
                            </div>
                          </div>
                        </TD>
                        <TD className="py-5 pr-4 align-top">
                          <span
                            className="inline-block px-4 py-1.5 text-[13px]"
                            style={{ backgroundColor: RGBA(ink, 0.08), color: RGBA(ink, 0.85), borderRadius: 999 }}
                          >
                            {a.specialization}
                          </span>
                        </TD>
                        <TD className="py-5 pr-4 align-top">
                          <p className="text-[15px]" style={{ color: ink }}>{a.dateLabel}</p>
                          <p className="mt-1 flex items-center gap-1.5 text-[13px]" style={{ color: neutral }}>
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {a.timeLabel}
                          </p>
                          <p className="mt-0.5 text-[12px]" style={{ color: neutral }}>{a.room}</p>
                        </TD>
                        <TD className="py-5 pr-4 align-top">
                          <span
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold"
                            style={{ backgroundColor: s.bg, color: s.fg, borderRadius: 999 }}
                          >
                            {a.status === 'booked' ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                            {a.status === 'completed' ? <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                            {a.status === 'cancelled' ? <X className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                            {a.status === 'no_show' ? <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                            {s.label}
                          </span>
                          {a.when === 'upcoming' && a.hoursAway < CUTOFF_HOURS ? (
                            <p className="mt-2 text-[12px]" style={{ color: STATUS.no_show.fg }}>
                              changes closed
                            </p>
                          ) : null}
                        </TD>
                        <TD className="py-5 align-top text-right">
                          {a.when === 'upcoming' || hasRecord ? (
                            <button
                              type="button"
                              onClick={() => pickRow(a)}
                              aria-pressed={isSel}
                              className={`${ringCls} inline-flex min-h-[44px] items-center gap-1.5 px-5 text-[14px] font-semibold`}
                              style={{
                                ...focusable,
                                borderRadius: 999,
                                backgroundColor: isSel ? ink : RGBA(ink, 0.08),
                                color: isSel ? canvas : ink,
                              }}
                            >
                              {a.when === 'upcoming' ? 'Manage' : 'View record'}
                              <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                          ) : (
                            <span className="inline-block py-3 text-[13px]" style={{ color: neutral }}>
                              {a.status === 'completed' ? 'record pending' : 'no record'}
                            </span>
                          )}
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
            </div>
          ) : (
            <p className="mt-6 text-[14px]" style={{ color: neutral }}>
              nothing on this tab right now.
            </p>
          )}
        </section>

        {/* ── b-3-0 / b-3-1 actions ────────────────────────── */}
        <div className="mt-8 grid grid-cols-12 items-center gap-4">
          <div className="col-span-12 sm:col-span-4">
            <Button
              data-wf="b-3-0"
              type="button"
              onClick={handleReschedule}
              disabled={!selectedIsUpcoming}
              className={`${ringCls} w-full justify-center`}
              style={{
                ...focusable,
                borderRadius: 999,
                minHeight: 52,
                backgroundColor: selectedIsUpcoming ? ink : RGBA(ink, 0.1),
                color: selectedIsUpcoming ? canvas : RGBA(ink, 0.45),
                fontWeight: 600,
                fontSize: 15,
                border: 'none',
                cursor: selectedIsUpcoming ? 'pointer' : 'not-allowed',
              }}
            >
              <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
              Reschedule
            </Button>
          </div>
          <div className="col-span-12 sm:col-span-4">
            <Button
              data-wf="b-3-1"
              type="button"
              ref={cancelBtnRef}
              onClick={askCancel}
              disabled={!selectedIsUpcoming}
              className={`${ringCls} w-full justify-center`}
              style={{
                ...focusable,
                borderRadius: 999,
                minHeight: 52,
                backgroundColor: 'transparent',
                color: selectedIsUpcoming ? ink : RGBA(ink, 0.45),
                boxShadow: `inset 0 0 0 1px ${RGBA(ink, selectedIsUpcoming ? 0.35 : 0.14)}`,
                fontWeight: 600,
                fontSize: 15,
                border: 'none',
                cursor: selectedIsUpcoming ? 'pointer' : 'not-allowed',
              }}
            >
              Cancel appointment
            </Button>
          </div>
          <p className="col-span-12 text-[13px] leading-relaxed sm:col-span-4" style={{ color: neutral }}>
            {selectedIsUpcoming
              ? `acting on ${selected.doctor}, ${selected.dateLabel} · ${selected.timeLabel}. changes close ${CUTOFF_HOURS} hours before the slot.`
              : `select an upcoming visit to move or cancel it. changes close ${CUTOFF_HOURS} hours before the slot.`}
          </p>
        </div>

        {/* ── b-4-0 consultation record ────────────────────── */}
        <section
          data-wf="b-4-0"
          aria-labelledby="record-heading"
          className="atrium-fade mt-14 px-6 pb-10 pt-14 sm:px-14 sm:pt-16"
          style={{ backgroundColor: RGBA(ink, 0.07), borderRadius: '260px 260px 24px 24px' }}
        >
          <div className="mx-auto max-w-[44rem] text-center">
            <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: neutral }}>
              consultation record
            </span>
            <h2
              id="record-heading"
              className="mt-3 text-[26px] leading-snug sm:text-[28px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', color: ink }}
            >
              {recordAppt ? `${recordAppt.doctor}, ${recordAppt.dateLabel}` : 'no visit selected'}
            </h2>
            {recordAppt ? (
              <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13px]" style={{ color: neutral }}>
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 font-semibold"
                  style={{ backgroundColor: STATUS[recordAppt.status].bg, color: STATUS[recordAppt.status].fg, borderRadius: 999 }}
                >
                  <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  {STATUS[recordAppt.status].label}
                </span>
                <span>{recordAppt.specialization}</span>
                {record ? <span>· {record.filedOn}</span> : null}
              </p>
            ) : null}
          </div>

          <div className="mx-auto mt-10 max-w-[48rem] px-6 py-8 sm:px-10" style={{ backgroundColor: canvas, borderRadius: brand.radius }}>
            {record ? (
              <>
                <dl className="divide-y" style={{ borderColor: RGBA(ink, 0.12) }}>
                  <div data-wf="i-4-0-0" className="grid gap-2 pb-6 sm:grid-cols-[11rem_1fr]">
                    <dt className="text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral }}>Diagnosis</dt>
                    <dd className="text-[16px] leading-relaxed" style={{ color: ink }}>{record.diagnosis}</dd>
                  </div>
                  <div data-wf="i-4-0-1" className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr]" style={{ borderColor: RGBA(ink, 0.12) }}>
                    <dt className="text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral }}>Visit notes</dt>
                    <dd className="text-[16px] leading-relaxed" style={{ color: ink }}>{record.visitNotes}</dd>
                  </div>
                  <div data-wf="i-4-0-2" className="grid gap-3 pt-6 sm:grid-cols-[11rem_1fr]" style={{ borderColor: RGBA(ink, 0.12) }}>
                    <dt className="text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral }}>Prescription</dt>
                    <dd>
                      <ul className="flex flex-col gap-3">
                        {record.prescription.map((p) => (
                          <li key={p.medicine} className="flex flex-col gap-1">
                            <span className="text-[16px] font-semibold" style={{ color: ink }}>{p.medicine}</span>
                            <span className="text-[14px]" style={{ color: RGBA(ink, 0.75), fontVariantNumeric: 'tabular-nums' }}>
                              {p.dosage} · {p.frequency} · {p.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="flex max-w-[26rem] items-start gap-2 text-[13px] leading-relaxed" style={{ color: neutral }}>
                    <Users className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    only you, {recordAppt.doctor} and clinic administrators can open this record. every view is logged.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('consultation')}
                    className={`${ringCls} inline-flex min-h-[44px] items-center gap-1.5 px-5 text-[14px] font-semibold`}
                    style={{ ...focusable, borderRadius: 999, backgroundColor: RGBA(ink, 0.08), color: ink }}
                  >
                    Open full record
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : recordAppt && recordAppt.status === 'completed' ? (
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                <div>
                  <p className="text-[16px] font-semibold" style={{ color: ink }}>
                    {recordAppt.doctor} hasn’t filed this record yet
                  </p>
                  <p className="mt-2 max-w-[34rem] text-[14px] leading-relaxed" style={{ color: RGBA(ink, 0.78) }}>
                    notes and prescription for {recordAppt.dateLabel} usually appear within a day of the visit. we’ll show them here as soon as the doctor saves them — nothing is needed from you.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <FileText className="mt-1 h-5 w-5 shrink-0" style={{ color: neutral }} aria-hidden="true" />
                <div>
                  <p className="text-[16px] font-semibold" style={{ color: ink }}>no record for this visit</p>
                  <p className="mt-2 max-w-[34rem] text-[14px] leading-relaxed" style={{ color: RGBA(ink, 0.78) }}>
                    records are written only for consultations that took place. choose a completed visit from the Past tab to read its notes and prescription.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── b-5-0 download ───────────────────────────────── */}
        <div className="mt-8 grid grid-cols-12 items-center gap-4">
          <div className="col-span-12 sm:col-span-4">
            <Button
              data-wf="b-5-0"
              type="button"
              onClick={handleDownload}
              disabled={!record || download === 'preparing'}
              aria-busy={download === 'preparing'}
              className={`${ringCls} w-full justify-center`}
              style={{
                ...focusable,
                borderRadius: 999,
                minHeight: 52,
                backgroundColor: record ? ink : RGBA(ink, 0.1),
                color: record ? canvas : RGBA(ink, 0.45),
                fontWeight: 600,
                fontSize: 15,
                border: 'none',
                cursor: record && download !== 'preparing' ? 'pointer' : 'not-allowed',
              }}
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              {download === 'preparing' ? 'Preparing PDF…' : 'Download record (PDF)'}
            </Button>
          </div>
          <div className="col-span-12 sm:col-span-8" role="status" aria-live="polite">
            {download === 'ready' && record ? (
              <p className="atrium-fade flex items-center gap-2 text-[14px]" style={{ color: STATUS.booked.fg }}>
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                saved as {fileName}
              </p>
            ) : download === 'preparing' ? (
              <p className="flex items-center gap-2 text-[14px]" style={{ color: neutral }}>
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                laying out your notes and prescription…
              </p>
            ) : (
              <p className="text-[13px] leading-relaxed" style={{ color: neutral }}>
                {record
                  ? 'the pdf carries the diagnosis, visit notes and full prescription. keep it for your own files.'
                  : 'a pdf can be downloaded once the treating doctor has filed the record.'}
              </p>
            )}
          </div>
        </div>

        {/* ── b-6-0 empty state ────────────────────────────── */}
        {rows.length === 0 ? (
          <div data-wf="b-6-0" className="atrium-rise mt-14 px-6 py-12" style={{ backgroundColor: RGBA(ink, 0.06), borderRadius: '220px 220px 24px 24px' }}>
            <Empty
              title={past.length === 0 && upcoming.length === 0 ? 'You have no appointments yet' : 'Nothing upcoming'}
              description={
                past.length === 0 && upcoming.length === 0
                  ? 'You have no appointments yet. Search for care to book your first visit.'
                  : 'your finished and cancelled visits are on the Past tab. search for care whenever you need to book again.'
              }
              action={
                <Button
                  type="button"
                  onClick={() => navigate('find-care')}
                  className={`${ringCls} justify-center`}
                  style={{
                    ...focusable,
                    borderRadius: 999,
                    minHeight: 52,
                    paddingLeft: 32,
                    paddingRight: 32,
                    backgroundColor: ink,
                    color: canvas,
                    fontWeight: 600,
                    fontSize: 15,
                    border: 'none',
                  }}
                >
                  <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                  Find care
                </Button>
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
