import { beforeEach, describe, expect, it, vi } from "vitest";
import login from "../apis/login";
import logout from "../apis/logout";
import { IUser } from "../interfaces/user";
import AuthStore from "./authStore";

vi.mock(import("../apis/login"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    default: vi.fn(),
  };
});

const mockLogin = vi.mocked(login);

vi.mock(import("../apis/logout"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    default: vi.fn(),
  };
});

const mockLogout = vi.mocked(logout);

describe("auth store test", () => {
  let store: AuthStore;

  const email = "test@gmail.com";
  const password = "123456";
  const mockUser: IUser = {
    id: "1",
    email: email,
    name: "test",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    store = new AuthStore();
  });

  it("should have no user logged in by default", () => {
    expect(store.user).toBeNull();
  });

  it("should log in with correct email and password", async () => {
    mockLogin.mockResolvedValueOnce(mockUser);
    await store.login(email, password);
    expect(login).toHaveBeenCalledWith(email, password);
    expect(store.user).toStrictEqual(mockUser);
  });

  it("should log out user", async () => {
    mockLogin.mockResolvedValueOnce(mockUser);
    await store.login(email, password);
    mockLogout.mockResolvedValueOnce();
    await store.logout();
    expect(logout).toHaveBeenCalledOnce();
    expect(store.user).toBeNull();
  });

  it("should not be able to logout when no login", async () => {
    expect(store.logout()).rejects.toThrowError();
  });

  it("should not be able to login when logged in", async () => {
    mockLogin.mockResolvedValueOnce(mockUser);
    await store.login(email, password);
    expect(store.login(email, password)).rejects.toThrowError();
  });
});
