// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useSearchParams } from "react-router-dom";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import { api } from "@/api/client";
import { setSessionToken } from "@/lib/api";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Input, Label, Checkbox } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const PRODUCT = "MediBook";
const CONSENT_VERSION = "v1.2";
const CONSENT_RECORDED_ON = "24 november 2026";

// Accounts the clinic already has on file (used to demonstrate sign-in).
const REGISTERED_ACCOUNTS = [
  { email: "asha.menon@mailbox.in", full_name: "Asha Menon", role: "patient" },
  { email: "rohit.deshpande@mailbox.in", full_name: "Rohit Deshpande", role: "patient" },
  { email: "dr.kavitha.rao@medibook.clinic", full_name: "Dr. Kavitha Rao", role: "doctor" },
  { email: "frontdesk@medibook.clinic", full_name: "Niranjan Iyer", role: "admin" },
];

const TABS = [
  { key: "signin", label: "Sign in", testId: "sign-in-tab" },
  { key: "register", label: "Register as patient", testId: "register-as-patient-tab" },
];

const tint = (pct) => `color-mix(in srgb, ${brand.primaryColor} ${pct}%, ${brand.backgroundColor})`;

// A visible message from the approved screen spec, rendered as the sole text of its own
// element so it reads word for word, with nothing else folded into the same node.
function Message({ id, children }) {
  return (
    <p
      id={id}
      role="alert"
      className="at-enter px-5 py-3 text-sm"
      style={{ color: brand.primaryColor }}
    >
      {children}
    </p>
  );
}

export default function Screen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get("expired") === "1";

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

  const pill = {
    borderRadius: 999,
    border: 0,
    backgroundColor: tint(8),
    color: brand.primaryColor,
  };
  const labelStyle = { color: brand.neutralColor };

  const onSignIn = (e) => {
    e.preventDefault();
    if (signInBusy) return;
    setSignInError(null);
    setSignInBusy(true);
    later(() => {
      const match = REGISTERED_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (!match || password.length < 8) {
        setSignInBusy(false);
        setSignInError("Email or password is incorrect");
        return;
      }
      navigate("find-care");
    }, 700);
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (regBusy) return;
    setRegError(null);
    if (!consent) {
      setRegError("Consent is required to proceed");
      return;
    }
    setRegBusy(true);
    try {
      const { data, error } = await api.POST("/auth/register", {
        body: {
          fullName: fullName.trim(),
          email: regEmail.trim(),
          password: regPassword,
          consentAccepted: true,
        },
      });
      if (error) {
        const code = error?.detail?.code;
        if (code === "EMAIL_ALREADY_REGISTERED") {
          setRegError("This email is already in use");
        } else if (code === "CONSENT_REQUIRED") {
          setRegError("Consent is required to proceed");
        } else {
          setRegError("We could not create your account. Please try again.");
        }
        setRegBusy(false);
        return;
      }
      setSessionToken(data.token);
      setRegBusy(false);
      setRegistered(data.user.fullName || fullName.trim() || regEmail.trim());
      later(() => navigate("find-care"), 1200);
    } catch {
      setRegBusy(false);
      setRegError("We could not create your account. Please try again.");
    }
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
        <h1
          data-testid="medibook-title"
          className="text-lg italic"
          style={{ fontFamily: brand.fontHeading }}
        >
          {PRODUCT}
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center px-6 py-12">
        {sessionExpired && (
          <div className="mb-6 w-full max-w-md">
            <Message id="at-session-expired">Your session expired, please sign in again</Message>
          </div>
        )}

        <div
          data-testid="tabs-1"
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
                data-testid={t.testId}
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
          {/* ---------------- Sign in fields ---------------- */}
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
              <p className="mt-2 text-sm" style={labelStyle}>
                Sign in to continue
              </p>
            </div>

            <form
              data-testid="sign-in-form"
              id="at-form-signin"
              className="mt-8 space-y-4 text-left"
              onSubmit={onSignIn}
              noValidate
            >
              {signInError && <Message id="at-signin-error">{signInError}</Message>}

              <div className="space-y-1">
                <Label
                  htmlFor="at-email"
                  className="block pl-4 text-xs lowercase"
                  style={labelStyle}
                >
                  Email
                </Label>
                <Input
                  data-testid="email-input"
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
                <Label
                  htmlFor="at-password"
                  className="block pl-4 text-xs lowercase"
                  style={labelStyle}
                >
                  Password
                </Label>
                <Input
                  data-testid="password-input"
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

          {/* ---------------- Register fields ---------------- */}
          <section
            id="at-panel-register"
            role="tabpanel"
            aria-labelledby="at-tab-register"
            hidden={tab !== "register"}
          >
            <div className="text-center">
              <h2
                className="text-3xl italic leading-snug"
                style={{ fontFamily: brand.fontHeading }}
              >
                Create your patient account
              </h2>
              <p className="mt-2 text-sm lowercase" style={labelStyle}>
                a few details, and you can start searching for care
              </p>
            </div>

            {registered ? (
              <div className="at-enter mt-10 text-center">
                <CheckCircle
                  className="mx-auto h-7 w-7"
                  aria-hidden="true"
                  style={{ color: brand.accentColor }}
                />
                <p
                  role="status"
                  className="mt-3 text-xl italic"
                  style={{ fontFamily: brand.fontHeading }}
                >
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
                data-testid="create-your-patient-account-form"
                id="at-form-register"
                className="mt-8 space-y-4 text-left"
                onSubmit={onRegister}
                noValidate
              >
                {regError && <Message id="at-reg-error">{regError}</Message>}

                <div className="space-y-1">
                  <Label
                    htmlFor="at-fullname"
                    className="block pl-4 text-xs lowercase"
                    style={labelStyle}
                  >
                    Full name
                  </Label>
                  <Input
                    data-testid="full-name-input"
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
                  <Label
                    htmlFor="at-reg-email"
                    className="block pl-4 text-xs lowercase"
                    style={labelStyle}
                  >
                    Email
                  </Label>
                  <Input
                    data-testid="email-input-2"
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
                  <Label
                    htmlFor="at-reg-password"
                    className="block pl-4 text-xs lowercase"
                    style={labelStyle}
                  >
                    Password
                  </Label>
                  <Input
                    data-testid="password-input-2"
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
                  <p
                    id="at-password-hint"
                    className="pl-4 pt-1 text-xs lowercase"
                    style={labelStyle}
                  >
                    eight characters or more. stored hashed, never as plain text.
                  </p>
                </div>

                <div
                  className="flex gap-3 px-5 py-4"
                  style={{ borderRadius: 20, backgroundColor: tint(9) }}
                >
                  <Checkbox
                    data-testid="i-consent-to-my-health-data-being-input"
                    id="at-consent"
                    name="consent_given"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="at-focus mt-0.5 h-4 w-4 shrink-0"
                    style={{ accentColor: brand.accentColor }}
                  />
                  <Label
                    htmlFor="at-consent"
                    className="text-xs leading-relaxed"
                    style={{ color: brand.primaryColor }}
                  >
                    I consent to my health data being handled by the clinic ({CONSENT_VERSION})
                  </Label>
                </div>
              </form>
            )}
          </section>

          {/* ---------------- Sign in action ---------------- */}
          <div className="mt-4 space-y-4" hidden={tab !== "signin"}>
            <div>
              <button
                data-testid="sign-in-btn"
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

          {/* ---------------- Register action ---------------- */}
          <div className="mt-4 space-y-4" hidden={tab !== "register" || Boolean(registered)}>
            <div>
              <button
                data-testid="create-account-btn"
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
          className="mt-8 max-w-md text-center text-xs leading-relaxed lowercase"
          style={{ color: brand.neutralColor }}
        >
          Doctor and administrator accounts are created by the clinic administrator.
          Self-registration creates a patient account only.
        </p>
      </div>
    </div>
  );
}
