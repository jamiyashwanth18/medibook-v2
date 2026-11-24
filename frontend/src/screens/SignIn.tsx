// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Input, Label, Checkbox } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const PRODUCT = "MediBook";
const CONSENT_VERSION = "v1.2";
const CONSENT_RECORDED_ON = "24 november 2026";

// Accounts the clinic already has on file (used to demonstrate sign-in and
// the "email already in use" rule on registration).
const REGISTERED_ACCOUNTS = [
  { email: "asha.menon@mailbox.in", full_name: "Asha Menon", role: "patient" },
  { email: "rohit.deshpande@mailbox.in", full_name: "Rohit Deshpande", role: "patient" },
  { email: "dr.kavitha.rao@medibook.clinic", full_name: "Dr. Kavitha Rao", role: "doctor" },
  { email: "frontdesk@medibook.clinic", full_name: "Niranjan Iyer", role: "admin" },
];

const TABS = [
  { key: "signin", label: "Sign in", wf: "i-1-0-0" },
  { key: "register", label: "Register as patient", wf: "i-1-0-1" },
];

const tint = (pct) => `color-mix(in srgb, ${brand.primaryColor} ${pct}%, ${brand.backgroundColor})`;

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("signin");

  // sign in
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInError, setSignInError] = React.useState(null);
  const [signInBusy, setSignInBusy] = React.useState(false);

  // register
  const [fullName, setFullName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [regError, setRegError] = React.useState(null);
  const [regBusy, setRegBusy] = React.useState(false);
  const [registered, setRegistered] = React.useState(null);

  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const pill = { borderRadius: 999, border: 0, backgroundColor: tint(8), color: brand.primaryColor };
  const labelStyle = { color: brand.neutralColor };

  const onSignIn = (e) => {
    e.preventDefault();
    if (signInBusy) return;
    setSignInError(null);
    setSignInBusy(true);
    later(() => {
      const match = REGISTERED_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (!match || password.length < 8) {
        setSignInBusy(false);
        // AC-006: never say which field was wrong, and keep what was typed.
        setSignInError("we could not sign you in with those details. check your email and password, then try again.");
        return;
      }
      navigate("find-care");
    }, 700);
  };

  const onRegister = (e) => {
    e.preventDefault();
    if (regBusy) return;
    setRegError(null);
    if (!consent) {
      setRegError("consent is required before we can create your account — the clinic cannot handle your health data without it.");
      return;
    }
    const taken = REGISTERED_ACCOUNTS.some(
      (a) => a.email.toLowerCase() === regEmail.trim().toLowerCase()
    );
    if (taken) {
      setRegError("that email is already in use. sign in instead, or register with another address.");
      return;
    }
    setRegBusy(true);
    later(() => {
      setRegBusy(false);
      setRegistered(fullName.trim() || regEmail.trim());
      later(() => navigate("find-care"), 1400);
    }, 700);
  };

  const onTabKeyDown = (e) => {
    const i = TABS.findIndex((t) => t.key === tab);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
      setTab(next.key);
      const el = document.getElementById(`at-tab-${next.key}`);
      if (el) el.focus();
    }
  };

  const Notice = ({ id, tone, children }) => (
    <div
      id={id}
      role="alert"
      className="at-enter flex gap-3 px-5 py-3 text-xs leading-relaxed"
      style={{ borderRadius: 20, backgroundColor: tint(12), color: brand.primaryColor }}
    >
      <AlertCircle className="mt-px h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.accentColor }} />
      <p>
        <span className="font-semibold">{tone}</span> {children}
      </p>
    </div>
  );

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        color: brand.primaryColor,
        fontFamily: brand.fontBody,
        backgroundColor: brand.backgroundColor,
        ["--at-ring"]: brand.primaryColor,
      }}
    >
      <style>{`
        .at-focus:focus-visible { outline: 2px solid var(--at-ring); outline-offset: 3px; }
        @keyframes atEnter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .at-enter { animation: atEnter 260ms ease-out both; }
        @keyframes atBreathe { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
        .at-breathe { animation: atBreathe 1200ms ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .at-enter, .at-breathe { animation: none; }
        }
      `}</style>

      <header className="px-10 py-5" style={{ backgroundColor: tint(10) }}>
        <h1 data-wf="b-0-0" className="text-lg italic" style={{ fontFamily: brand.fontHeading }}>
          {PRODUCT}
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center px-6 py-12">
        <div
          data-wf="b-1-0"
          role="tablist"
          aria-label="Sign in or register"
          onKeyDown={onTabKeyDown}
          className="mb-8 flex w-full max-w-md gap-1 p-1"
          style={{ borderRadius: 999, backgroundColor: tint(8) }}
        >
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                data-wf={t.wf}
                id={`at-tab-${t.key}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls={`at-panel-${t.key}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(t.key)}
                className="at-focus flex h-11 flex-1 items-center justify-center gap-2 text-sm transition-colors"
                style={{
                  borderRadius: 999,
                  backgroundColor: active ? brand.primaryColor : "transparent",
                  color: active ? brand.backgroundColor : brand.neutralColor,
                  fontWeight: active ? 600 : 400,
                }}
              >
                {active && <Check className="h-4 w-4" aria-hidden="true" />}
                {t.label}
              </button>
            );
          })}
        </div>

        <main
          className="w-full max-w-md px-9 pb-9 pt-16"
          style={{ backgroundColor: tint(6), borderRadius: "170px 170px 24px 24px" }}
        >
          {/* ---------------- Row 3 · Sign in fields ---------------- */}
          <section
            id="at-panel-signin"
            role="tabpanel"
            aria-labelledby="at-tab-signin"
            hidden={tab !== "signin"}
          >
            <div className="text-center">
              <h2 className="text-3xl italic" style={{ fontFamily: brand.fontHeading }}>
                Sign in
              </h2>
              <p className="mt-2 text-sm lowercase" style={labelStyle}>
                welcome back — your appointments are waiting
              </p>
            </div>

            <form
              data-wf="b-2-0"
              id="at-form-signin"
              className="mt-8 space-y-4 text-left"
              onSubmit={onSignIn}
              noValidate
            >
              {signInError && <Notice id="at-signin-error" tone="we could not continue —">{signInError}</Notice>}

              <div className="space-y-1">
                <Label htmlFor="at-email" className="block pl-4 text-xs lowercase" style={labelStyle}>
                  Email
                </Label>
                <Input
                  data-wf="i-2-0-0"
                  id="at-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={signInError ? true : undefined}
                  aria-describedby={signInError ? "at-signin-error" : undefined}
                  className="at-focus h-12 w-full px-5 text-sm outline-none"
                  style={pill}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="at-password" className="block pl-4 text-xs lowercase" style={labelStyle}>
                  Password
                </Label>
                <Input
                  data-wf="i-2-0-1"
                  id="at-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={signInError ? true : undefined}
                  aria-describedby={signInError ? "at-signin-error" : undefined}
                  className="at-focus h-12 w-full px-5 text-sm outline-none"
                  style={pill}
                />
              </div>
            </form>
          </section>

          {/* ---------------- Row 3 · Register fields ---------------- */}
          <section
            id="at-panel-register"
            role="tabpanel"
            aria-labelledby="at-tab-register"
            hidden={tab !== "register"}
          >
            <div className="text-center">
              <h2 className="text-3xl italic leading-snug" style={{ fontFamily: brand.fontHeading }}>
                Create your patient account
              </h2>
              <p className="mt-2 text-sm lowercase" style={labelStyle}>
                a few details, and you can start searching for care
              </p>
            </div>

            {registered ? (
              <div className="at-enter mt-10 text-center">
                <CheckCircle className="mx-auto h-7 w-7" aria-hidden="true" style={{ color: brand.accentColor }} />
                <p role="status" className="mt-3 text-xl italic" style={{ fontFamily: brand.fontHeading }}>
                  Welcome, {registered}.
                </p>
                <p
                  className="mt-2 text-xs lowercase"
                  style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}
                >
                  consent {CONSENT_VERSION} recorded {CONSENT_RECORDED_ON}. taking you to find care…
                </p>
              </div>
            ) : (
              <form
                data-wf="b-2-1"
                id="at-form-register"
                className="mt-8 space-y-4 text-left"
                onSubmit={onRegister}
                noValidate
              >
                {regError && <Notice id="at-reg-error" tone="we could not create the account —">{regError}</Notice>}

                <div className="space-y-1">
                  <Label htmlFor="at-fullname" className="block pl-4 text-xs lowercase" style={labelStyle}>
                    Full name
                  </Label>
                  <Input
                    data-wf="i-2-1-0"
                    id="at-fullname"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="at-focus h-12 w-full px-5 text-sm outline-none"
                    style={pill}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="at-reg-email" className="block pl-4 text-xs lowercase" style={labelStyle}>
                    Email
                  </Label>
                  <Input
                    data-wf="i-2-1-1"
                    id="at-reg-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    aria-describedby={regError ? "at-reg-error" : undefined}
                    className="at-focus h-12 w-full px-5 text-sm outline-none"
                    style={pill}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="at-reg-password" className="block pl-4 text-xs lowercase" style={labelStyle}>
                    Password
                  </Label>
                  <Input
                    data-wf="i-2-1-2"
                    id="at-reg-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    aria-describedby="at-password-hint"
                    className="at-focus h-12 w-full px-5 text-sm outline-none"
                    style={pill}
                  />
                  <p id="at-password-hint" className="pl-4 pt-1 text-xs lowercase" style={labelStyle}>
                    eight characters or more. stored hashed, never as plain text.
                  </p>
                </div>

                <div className="flex gap-3 px-5 py-4" style={{ borderRadius: 20, backgroundColor: tint(9) }}>
                  <Checkbox
                    data-wf="i-2-1-3"
                    id="at-consent"
                    name="consent_given"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="at-focus mt-0.5 h-4 w-4 shrink-0"
                    style={{ accentColor: brand.accentColor }}
                  />
                  <Label htmlFor="at-consent" className="text-xs leading-relaxed" style={{ color: brand.primaryColor }}>
                    I consent to my health data being handled by the clinic ({CONSENT_VERSION})
                  </Label>
                </div>
              </form>
            )}
          </section>

          {/* ---------------- Row 4 · Sign in action ---------------- */}
          <div className="mt-4 space-y-4" hidden={tab !== "signin"}>
            <div data-wf="b-3-0">
              <button
                type="submit"
                form="at-form-signin"
                disabled={signInBusy}
                className="at-focus h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-wait"
                style={{
                  borderRadius: 999,
                  backgroundColor: brand.accentColor,
                  color: brand.backgroundColor,
                  opacity: signInBusy ? 0.75 : 1,
                }}
              >
                {signInBusy ? (
                  <span className="inline-flex items-center justify-center gap-2 lowercase">
                    <span className="at-breathe">●</span> checking your details…
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            <p className="pt-1 text-center text-xs lowercase" style={labelStyle}>
              sessions end after a quiet spell — you will be asked to sign in again.
            </p>
          </div>

          {/* ---------------- Row 4 · Register action ---------------- */}
          <div className="mt-4 space-y-4" hidden={tab !== "register" || Boolean(registered)}>
            <div data-wf="b-3-1">
              <button
                type="submit"
                form="at-form-register"
                disabled={regBusy}
                className="at-focus h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-wait"
                style={{
                  borderRadius: 999,
                  backgroundColor: brand.accentColor,
                  color: brand.backgroundColor,
                  opacity: regBusy ? 0.75 : 1,
                }}
              >
                {regBusy ? (
                  <span className="inline-flex items-center justify-center gap-2 lowercase">
                    <span className="at-breathe">●</span> creating your account…
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </div>

            <p
              className="pt-1 text-center text-xs lowercase"
              style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}
            >
              your consent is kept with the date it was given.
            </p>
          </div>
        </main>

        <p
          data-wf="b-4-0"
          className="mt-8 max-w-md text-center text-xs leading-relaxed lowercase"
          style={{ color: brand.neutralColor }}
        >
          Doctor and administrator accounts are created by the clinic administrator. Self-registration creates a patient
          account only.
        </p>
      </div>
    </div>
  );
}
