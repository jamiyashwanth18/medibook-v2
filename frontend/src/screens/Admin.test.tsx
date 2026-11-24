import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const postMock = vi.fn();

vi.mock("@/api/client", () => ({
  api: { POST: (...args: unknown[]) => postMock(...args) },
}));

import Screen from "./Admin";

function renderScreen() {
  return render(<Screen />);
}

async function openAddDoctorForm(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /add doctor/i }));
}

async function fillNewDoctorForm(
  user: ReturnType<typeof userEvent.setup>,
  opts: { specialization?: string } = {},
) {
  await user.type(screen.getByTestId("full-name-input"), "Dr. Leela Mathew");
  await user.type(screen.getByTestId("email-input"), "leela.mathew@medibook.clinic");
  await user.type(screen.getByTestId("credentials-input"), "MBBS, MD (Nephrology)");
  if (opts.specialization) {
    await user.click(screen.getByLabelText(opts.specialization));
  }
}

describe("Admin screen - doctor account creation", () => {
  beforeEach(() => {
    postMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("[AC-009] shows the first-login password as <set-at-first-login>", async () => {
    const user = userEvent.setup();
    renderScreen();

    await openAddDoctorForm(user);

    expect(screen.getByTestId("first-login-password-set-at-first-input")).toHaveValue(
      "<set-at-first-login>",
    );
  });

  it("[AC-010] shows the save validation message and makes no call when no specialization is assigned", async () => {
    const user = userEvent.setup();
    renderScreen();

    await openAddDoctorForm(user);
    await fillNewDoctorForm(user);
    await user.click(screen.getByTestId("add-doctor-btn"));

    expect(
      await screen.findByText("Assign at least one specialization before saving"),
    ).toBeInTheDocument();
    expect(postMock).not.toHaveBeenCalled();
  });

  it("[AC-009] creates the doctor account through the generated client and shows the confirmation", async () => {
    postMock.mockResolvedValue({
      data: {
        id: "d-99",
        fullName: "Dr. Leela Mathew",
        email: "leela.mathew@medibook.clinic",
        credentials: "MBBS, MD (Nephrology)",
        specializations: ["Cardiology"],
      },
      error: undefined,
    });
    const user = userEvent.setup();
    renderScreen();

    await openAddDoctorForm(user);
    await fillNewDoctorForm(user, { specialization: "Cardiology" });
    await user.click(screen.getByTestId("add-doctor-btn"));

    expect(await screen.findByText("Doctor account created")).toBeInTheDocument();

    expect(postMock).toHaveBeenCalledWith(
      "/admin/doctors",
      expect.objectContaining({
        body: {
          fullName: "Dr. Leela Mathew",
          email: "leela.mathew@medibook.clinic",
          credentials: "MBBS, MD (Nephrology)",
          specializations: ["Cardiology"],
        },
      }),
    );

    const table = screen.getByTestId("doctor-accounts-table");
    expect(within(table).getByText("Dr. Leela Mathew")).toBeInTheDocument();
  });

  it("[AC-009] shows a loading state while the account is being created", async () => {
    let resolveRequest: (value: unknown) => void = () => {};
    postMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        }),
    );
    const user = userEvent.setup();
    renderScreen();

    await openAddDoctorForm(user);
    await fillNewDoctorForm(user, { specialization: "Cardiology" });
    await user.click(screen.getByTestId("add-doctor-btn"));

    expect(screen.getByTestId("add-doctor-btn")).toBeDisabled();
    expect(screen.getByTestId("add-doctor-btn")).toHaveTextContent(/saving account/i);

    resolveRequest({
      data: {
        id: "d-100",
        fullName: "Dr. Leela Mathew",
        email: "leela.mathew@medibook.clinic",
        credentials: "MBBS, MD (Nephrology)",
        specializations: ["Cardiology"],
      },
      error: undefined,
    });

    expect(await screen.findByText("Doctor account created")).toBeInTheDocument();
  });

  it("[AC-009] shows the duplicate-email message when the API rejects an already-registered address", async () => {
    postMock.mockResolvedValue({
      data: undefined,
      error: {
        detail: { code: "EMAIL_ALREADY_REGISTERED", message: "That email is already registered." },
      },
    });
    const user = userEvent.setup();
    renderScreen();

    await openAddDoctorForm(user);
    await fillNewDoctorForm(user, { specialization: "Cardiology" });
    await user.click(screen.getByTestId("add-doctor-btn"));

    expect(
      await screen.findByText(
        "leela.mathew@medibook.clinic is already in use by another account on this clinic.",
      ),
    ).toBeInTheDocument();
  });

  it("[AC-010] shows the save validation message when the API itself reports a missing specialization", async () => {
    postMock.mockResolvedValue({
      data: undefined,
      error: {
        detail: {
          code: "SPECIALIZATION_REQUIRED",
          message: "At least one specialization is required.",
        },
      },
    });
    const user = userEvent.setup();
    renderScreen();

    // The form never submits with none checked (client-side guard), so this covers a
    // specialization that was unchecked between validation and the response coming back.
    await openAddDoctorForm(user);
    await fillNewDoctorForm(user, { specialization: "Cardiology" });
    await user.click(screen.getByLabelText("Cardiology"));
    await user.click(screen.getByLabelText("Cardiology"));
    await user.click(screen.getByTestId("add-doctor-btn"));

    expect(
      await screen.findByText("Assign at least one specialization before saving"),
    ).toBeInTheDocument();
  });

  it("every doctor-account-creation test ID of the Admin Console screen is present", async () => {
    const user = userEvent.setup();
    renderScreen();

    expect(screen.getByTestId("admin-console-title")).toBeInTheDocument();
    expect(screen.getByTestId("tabs-1")).toBeInTheDocument();
    expect(screen.getByTestId("doctors-tab")).toBeInTheDocument();
    expect(screen.getByTestId("specializations-tab")).toBeInTheDocument();
    expect(screen.getByTestId("disease-mapping-tab")).toBeInTheDocument();
    expect(screen.getByTestId("appointments-tab")).toBeInTheDocument();
    expect(screen.getByTestId("consent-audit-tab")).toBeInTheDocument();
    expect(screen.getByTestId("doctor-accounts-table")).toBeInTheDocument();

    await openAddDoctorForm(user);

    expect(screen.getByTestId("new-doctor-account-form")).toBeInTheDocument();
    expect(screen.getByTestId("full-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("credentials-input")).toBeInTheDocument();
    expect(screen.getByTestId("specializations-input")).toBeInTheDocument();
    expect(screen.getByTestId("first-login-password-set-at-first-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-doctor-btn")).toBeInTheDocument();
  });
});
