import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SESSION_IDLE_TIMEOUT_MS, clearSessionToken, setSessionToken } from "@/lib/api";

import App from "./App";

describe("App", () => {
  // A protected page only renders for a signed-in visitor (AC-007, AC-008): give the
  // app shell a session the same way a real sign-in would.
  beforeEach(() => {
    setSessionToken("test-session-token");
  });

  afterEach(() => {
    clearSessionToken();
  });

  it("renders a screen inside the app shell and shows its menu", () => {
    render(
      <MemoryRouter initialEntries={["/find-care"]}>
        <App />
      </MemoryRouter>,
    );
    // getAllByText, not getByText: the page may repeat its menu item's text.
    expect(screen.getAllByText("Find Care").length).toBeGreaterThan(0);
  });

  it("[AC-007] sends a visitor with no session to sign in instead of a protected page", () => {
    clearSessionToken();
    render(
      <MemoryRouter initialEntries={["/find-care"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("sign-in-form")).toBeInTheDocument();
  });

  it("[AC-008] sends a visitor whose session has gone quiet too long back to sign in with the expired message", () => {
    vi.useFakeTimers();
    try {
      setSessionToken("stale-session-token");
      vi.advanceTimersByTime(SESSION_IDLE_TIMEOUT_MS + 1_000);
      render(
        <MemoryRouter initialEntries={["/find-care"]}>
          <App />
        </MemoryRouter>,
      );
      expect(screen.getByText("Your session expired, please sign in again")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
