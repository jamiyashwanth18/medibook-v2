import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const postMock = vi.fn();
const navigateMock = vi.fn();
const setSessionTokenMock = vi.fn();

vi.mock("@/api/client", () => ({
  api: { POST: (...args: unknown[]) => postMock(...args) },
}));

vi.mock("@/lib/navigate", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@/lib/api", () => ({
  setSessionToken: (...args: unknown[]) => setSessionTokenMock(...args),
}));

import Screen from "./SignIn";

function renderScreen() {
  return render(
    <MemoryRouter initialEntries={["/sign-in"]}>
      <Screen />
    </MemoryRouter>,
  );
}

async function fillRegisterForm(
  user: ReturnType<typeof userEvent.setup>,
  opts: { consent?: boolean } = {},
) {
  await user.click(screen.getByTestId("register-as-patient-tab"));
  await user.type(screen.getByTestId("full-name-input"), "Asha Patient");
  await user.type(screen.getByTestId("email-input-2"), "asha.patient@example.com");
  await user.type(screen.getByTestId("password-input-2"), "a-strong-password");
  if (opts.consent) {
    await user.click(screen.getByTestId("i-consent-to-my-health-data-being-input"));
  }
}

describe("SignIn screen - patient registration", () => {
  beforeEach(() => {
    postMock.mockReset();
    navigateMock.mockReset();
    setSessionTokenMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("[AC-002] blocks registration and tells the user consent is required when the box is not ticked", async () => {
    const user = userEvent.setup();
    renderScreen();

    await fillRegisterForm(user, { consent: false });
    await user.click(screen.getByTestId("create-account-btn"));

    expect(await screen.findByText("Consent is required to proceed")).toBeInTheDocument();
    expect(postMock).not.toHaveBeenCalled();
  });

  it("[AC-003] shows the duplicate-email message when the API rejects an already-registered address", async () => {
    postMock.mockResolvedValue({
      data: undefined,
      error: {
        detail: { code: "EMAIL_ALREADY_REGISTERED", message: "That email is already registered." },
      },
    });
    const user = userEvent.setup();
    renderScreen();

    await fillRegisterForm(user, { consent: true });
    await user.click(screen.getByTestId("create-account-btn"));

    expect(await screen.findByText("This email is already in use")).toBeInTheDocument();
    expect(setSessionTokenMock).not.toHaveBeenCalled();
  });

  it("[AC-001] creates the patient account and signs the user in on a valid submission", async () => {
    postMock.mockResolvedValue({
      data: { token: "tok-abc123", user: { id: "u-1", role: "patient", fullName: "Asha Patient" } },
      error: undefined,
    });
    const user = userEvent.setup();
    renderScreen();

    await fillRegisterForm(user, { consent: true });
    await user.click(screen.getByTestId("create-account-btn"));

    expect(await screen.findByText("Welcome, Asha Patient.")).toBeInTheDocument();

    expect(postMock).toHaveBeenCalledWith(
      "/auth/register",
      expect.objectContaining({
        body: {
          fullName: "Asha Patient",
          email: "asha.patient@example.com",
          password: "a-strong-password",
          consentAccepted: true,
        },
      }),
    );
    expect(setSessionTokenMock).toHaveBeenCalledWith("tok-abc123");
  });

  it("[AC-001] shows a loading state while the account is being created", async () => {
    let resolveRequest: (value: unknown) => void = () => {};
    postMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        }),
    );
    const user = userEvent.setup();
    renderScreen();

    await fillRegisterForm(user, { consent: true });
    await user.click(screen.getByTestId("create-account-btn"));

    expect(screen.getByTestId("create-account-btn")).toBeDisabled();
    expect(screen.getByTestId("create-account-btn")).toHaveTextContent(/creating your account/i);

    resolveRequest({
      data: { token: "tok-xyz", user: { id: "u-2", role: "patient", fullName: "Asha Patient" } },
      error: undefined,
    });

    await waitFor(() => expect(screen.getByTestId("create-account-btn")).not.toBeDisabled());
  });

  it("every required test ID of the Sign In & Register screen is present", async () => {
    const user = userEvent.setup();
    renderScreen();

    expect(screen.getByTestId("medibook-title")).toBeInTheDocument();
    expect(screen.getByTestId("tabs-1")).toBeInTheDocument();
    expect(screen.getByTestId("sign-in-tab")).toBeInTheDocument();
    expect(screen.getByTestId("register-as-patient-tab")).toBeInTheDocument();
    expect(screen.getByTestId("sign-in-form")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("sign-in-btn")).toBeInTheDocument();

    await user.click(screen.getByTestId("register-as-patient-tab"));

    expect(screen.getByTestId("create-your-patient-account-form")).toBeInTheDocument();
    expect(screen.getByTestId("full-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input-2")).toBeInTheDocument();
    expect(screen.getByTestId("password-input-2")).toBeInTheDocument();
    expect(screen.getByTestId("i-consent-to-my-health-data-being-input")).toBeInTheDocument();
    expect(screen.getByTestId("create-account-btn")).toBeInTheDocument();
  });
});

describe("SignIn screen - registration consent capture (AC-058)", () => {
  beforeEach(() => {
    postMock.mockReset();
    navigateMock.mockReset();
    setSessionTokenMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("[AC-058] shows the consent statement checkbox, unticked, on the registration form", async () => {
    const user = userEvent.setup();
    renderScreen();

    await user.click(screen.getByTestId("register-as-patient-tab"));

    const consentBox = screen.getByTestId("i-consent-to-my-health-data-being-input");
    expect(consentBox).toBeInTheDocument();
    expect(consentBox).not.toBeChecked();
  });

  it("[AC-058] blocks account creation and shows the required-consent message until the statement is accepted", async () => {
    const user = userEvent.setup();
    renderScreen();

    await fillRegisterForm(user, { consent: false });
    await user.click(screen.getByTestId("create-account-btn"));

    expect(await screen.findByText("Consent is required to proceed")).toBeInTheDocument();
    expect(postMock).not.toHaveBeenCalled();
  });

  it("[AC-058] sends the accepted consent, so it can be stored with the new account, on a valid submission", async () => {
    postMock.mockResolvedValue({
      data: {
        token: "tok-consent-1",
        user: { id: "u-5", role: "patient", fullName: "Asha Patient" },
      },
      error: undefined,
    });
    const user = userEvent.setup();
    renderScreen();

    await fillRegisterForm(user, { consent: true });
    await user.click(screen.getByTestId("create-account-btn"));

    await waitFor(() =>
      expect(postMock).toHaveBeenCalledWith(
        "/auth/register",
        expect.objectContaining({
          body: expect.objectContaining({ consentAccepted: true }),
        }),
      ),
    );
  });
});

async function fillSignInForm(
  user: ReturnType<typeof userEvent.setup>,
  opts: { password?: string } = {},
) {
  await user.type(screen.getByTestId("email-input"), "asha.menon@mailbox.in");
  await user.type(screen.getByTestId("password-input"), opts.password ?? "correct-horse-battery");
}

describe("SignIn screen - sign-in and session", () => {
  beforeEach(() => {
    postMock.mockReset();
    navigateMock.mockReset();
    setSessionTokenMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("[AC-005] signs a patient in and redirects to the patient dashboard", async () => {
    postMock.mockResolvedValue({
      data: { token: "tok-patient-1", user: { id: "u-10", role: "patient" } },
      error: undefined,
    });
    const user = userEvent.setup();
    renderScreen();

    await fillSignInForm(user);
    await user.click(screen.getByTestId("sign-in-btn"));

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("find-care"));

    expect(postMock).toHaveBeenCalledWith(
      "/auth/login",
      expect.objectContaining({
        body: { email: "asha.menon@mailbox.in", password: "correct-horse-battery" },
      }),
    );
    expect(setSessionTokenMock).toHaveBeenCalledWith("tok-patient-1");
  });

  it("[AC-005] signs a doctor in and redirects to the doctor dashboard for their role", async () => {
    postMock.mockResolvedValue({
      data: { token: "tok-doctor-1", user: { id: "u-20", role: "doctor" } },
      error: undefined,
    });
    const user = userEvent.setup();
    renderScreen();

    await fillSignInForm(user);
    await user.click(screen.getByTestId("sign-in-btn"));

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("doctor-schedule"));
  });

  it("[AC-006] shows the generic incorrect-credentials message and reveals no field on a wrong password", async () => {
    postMock.mockResolvedValue({
      data: undefined,
      error: { code: "INVALID_CREDENTIALS", message: "Incorrect email or password." },
    });
    const user = userEvent.setup();
    renderScreen();

    await fillSignInForm(user, { password: "the-wrong-password" });
    await user.click(screen.getByTestId("sign-in-btn"));

    expect(await screen.findByText("Email or password is incorrect")).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
    expect(setSessionTokenMock).not.toHaveBeenCalled();
  });

  it("[AC-006] shows the generic incorrect-credentials message when the request itself fails", async () => {
    postMock.mockRejectedValue(new Error("network down"));
    const user = userEvent.setup();
    renderScreen();

    await fillSignInForm(user);
    await user.click(screen.getByTestId("sign-in-btn"));

    expect(await screen.findByText("Email or password is incorrect")).toBeInTheDocument();
    expect(setSessionTokenMock).not.toHaveBeenCalled();
  });

  it("[AC-005] shows a loading state while signing in", async () => {
    let resolveRequest: (value: unknown) => void = () => {};
    postMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        }),
    );
    const user = userEvent.setup();
    renderScreen();

    await fillSignInForm(user);
    await user.click(screen.getByTestId("sign-in-btn"));

    expect(screen.getByTestId("sign-in-btn")).toBeDisabled();
    expect(screen.getByTestId("sign-in-btn")).toHaveTextContent(/checking your details/i);

    resolveRequest({
      data: { token: "tok-later", user: { id: "u-30", role: "patient" } },
      error: undefined,
    });

    await waitFor(() => expect(screen.getByTestId("sign-in-btn")).not.toBeDisabled());
  });

  it("[AC-008] shows the session-expired message when redirected back here after an idle session", () => {
    render(
      <MemoryRouter initialEntries={["/sign-in?expired=1"]}>
        <Screen />
      </MemoryRouter>,
    );

    expect(screen.getByText("Your session expired, please sign in again")).toBeInTheDocument();
  });
});
