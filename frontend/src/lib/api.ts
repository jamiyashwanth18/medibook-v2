/// <reference types="vite/client" />
// Without the reference above, `import.meta.env` is not typed and `tsc --noEmit` fails.
//
// Where the API lives and who is calling it. The calls themselves go through the
// generated client in src/api/client.ts (`npm run gen:api`), never through fetch here.
//
// Set at build time: the platform bakes the deployed API URL into the frontend build.
// The fallback is the local backend so a bare `npm run dev` still points somewhere real.
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

// The shared bearer the deployed API expects (its SECRET_KEY): the project id, not a
// secret. The platform bakes the same value into both sides at deploy time, so
// authenticated calls work out of the box.
export const API_PROJECT_ID: string = import.meta.env.VITE_API_PROJECT_ID ?? "";

// The frontend and the API are on different origins once deployed, so sign-in cannot rely
// on a cookie coming back. `/auth/login` returns its token in the response body: the screen
// that signs in calls `setSessionToken` with it, and the client sends it as the bearer on
// every later call, ahead of the shared bearer. Guarded for a server render, where there
// is no `localStorage`.
const SESSION_TOKEN_KEY = "session_token";

// When the signed-in user was last active. Read alongside the token to decide whether
// a session has gone quiet for longer than the configured expiry period (AC-008,
// NFR-002): the backend's own session row is the real source of truth, this is the
// frontend's mirror of it so a protected page can send an idle user back to sign in
// without waiting for the next failed API call.
const LAST_ACTIVE_KEY = "session_last_active";

// The configured period of inactivity after which a signed-in session expires
// (NFR-002). Fifteen quiet minutes, in milliseconds.
export const SESSION_IDLE_TIMEOUT_MS = 15 * 60 * 1000;

export function getSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(SESSION_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setSessionToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SESSION_TOKEN_KEY, token);
  } catch {
    // Storage unavailable (private mode, quota): the session just won't persist.
  }
  recordSessionActivity();
}

export function clearSessionToken(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_TOKEN_KEY);
    window.localStorage.removeItem(LAST_ACTIVE_KEY);
  } catch {
    // Nothing to clear if storage was never reachable.
  }
}

// Call whenever the signed-in user does something, so the idle clock restarts.
export function recordSessionActivity(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
  } catch {
    // Storage unavailable: activity just won't be tracked, same as no session.
  }
}

// True once a signed-in session has been quiet longer than SESSION_IDLE_TIMEOUT_MS.
// False (never expired) when there is no activity recorded at all, so a session that
// never ran through recordSessionActivity is not wrongly flagged as expired.
export function hasSessionExpired(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(LAST_ACTIVE_KEY);
    if (!raw) return false;
    const lastActive = Number(raw);
    if (!Number.isFinite(lastActive)) return false;
    return Date.now() - lastActive > SESSION_IDLE_TIMEOUT_MS;
  } catch {
    return false;
  }
}
