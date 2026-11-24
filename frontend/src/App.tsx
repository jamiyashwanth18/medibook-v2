import React from "react";
import { NavLink, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { Icons } from "@/lib/icons";
import {
  clearSessionToken,
  getSessionToken,
  hasSessionExpired,
  recordSessionActivity,
} from "@/lib/api";
import { api } from "@/api/client";
import SignIn from "@/screens/SignIn";
import FindCare from "@/screens/FindCare";
import MyAppointments from "@/screens/MyAppointments";
import DoctorSchedule from "@/screens/DoctorSchedule";
import Consultation from "@/screens/Consultation";
import Admin from "@/screens/Admin";

// How often the idle clock is checked while a protected page sits open with no
// navigation of its own (AC-008, NFR-002).
const IDLE_CHECK_INTERVAL_MS = 15_000;
const ACTIVITY_EVENTS = ["pointerdown", "keydown"] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// Every route in this layout is a protected page: no session, or a session gone quiet
// past its expiry, sends the visitor back to sign in instead of rendering it
// (AC-007, AC-008, NFR-002).
function RequireSession({ children }: { children: React.ReactElement }) {
  if (!getSessionToken()) {
    return <Navigate to="/sign-in" replace />;
  }
  if (hasSessionExpired()) {
    clearSessionToken();
    return <Navigate to="/sign-in?expired=1" replace />;
  }
  return children;
}

// The app's menu, drawn around every screen except the ones routed outside it below.
function AppShellLayout() {
  const navigate = useNavigate();

  // Keeps the idle clock honest: any click or keypress on a protected page counts as
  // activity, and a page left open past the expiry period is caught on the next
  // check, not only on the next navigation (AC-008, NFR-002).
  React.useEffect(() => {
    recordSessionActivity();
    const markActive = () => recordSessionActivity();
    ACTIVITY_EVENTS.forEach((name) => window.addEventListener(name, markActive));
    const interval = window.setInterval(() => {
      if (hasSessionExpired()) {
        clearSessionToken();
        navigate("/sign-in?expired=1", { replace: true });
      }
    }, IDLE_CHECK_INTERVAL_MS);
    return () => {
      ACTIVITY_EVENTS.forEach((name) => window.removeEventListener(name, markActive));
      window.clearInterval(interval);
    };
  }, [navigate]);

  // AC-007: signing out ends the session server-side (best effort -- the local
  // session is cleared either way) and sends the user back to sign in.
  async function onSignOut() {
    try {
      await api.POST("/auth/logout");
    } catch {
      // The session is cleared locally regardless of whether the server call lands.
    }
    clearSessionToken();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="border-b"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <div className="flex items-center gap-6 px-6 py-2">
          <p
            className="shrink-0 text-sm font-semibold"
            style={{ fontFamily: "var(--brand-font-heading)" }}
          >
            {"MediBook"}
          </p>
          <nav aria-label="App menu" className="flex flex-wrap items-center gap-1">
            <NavLink to="/find-care" className={navLinkClass}>
              <Icons.Search size={16} />
              {"Find Care"}
            </NavLink>
            <NavLink to="/my-appointments" className={navLinkClass}>
              {"My Appointments"}
            </NavLink>
            <NavLink to="/doctor-schedule" className={navLinkClass}>
              <Icons.Home size={16} />
              {"Doctor Schedule"}
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              <Icons.Settings size={16} />
              {"Admin Console"}
            </NavLink>
          </nav>
          <button
            type="button"
            onClick={onSignOut}
            className="ml-auto shrink-0 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium text-[var(--brand-fg-muted)] transition-colors hover:text-[var(--brand-fg)]"
          >
            {"Sign out"}
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <RequireSession>
            <AppShellLayout />
          </RequireSession>
        }
      >
        <Route path="/find-care" element={<FindCare />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/doctor-schedule" element={<DoctorSchedule />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}
