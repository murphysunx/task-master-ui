import { beforeEach, describe, expect, test, vi } from "vitest";
import AuthStore from "../auth/stores/authStore";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";
import login from "../auth/apis/login";
import { IUser } from "../auth/interfaces/user";

vi.mock(import("../auth/apis/login"), async (importOrigingal) => {
  const origingal = await importOrigingal();
  return {
    ...origingal,
    default: vi.fn(),
  };
});

const mockLogin = vi.mocked(login);

describe("header", () => {
  let authStore: AuthStore;

  beforeEach(() => {
    authStore = new AuthStore();
  });

  test("should have a login button when not logging in", () => {
    render(<Header auth={authStore} />);
    expect(screen.getByTestId("login-button")).not.toBeNull();
  });

  test("should have a logout button when logged in", async () => {
    const email = "test@gmail.com";
    const passwords = "123456";
    const loggedInUser: IUser = {
      id: "1",
      email,
      name: "test",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockLogin.mockResolvedValueOnce(loggedInUser);
    await authStore.login(email, passwords);
    render(<Header auth={authStore} />);
    expect(screen.getByTestId("logout-button")).not.toBeNull();
  });
});
