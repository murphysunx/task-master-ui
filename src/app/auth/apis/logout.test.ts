import { describe, expect, test, vi } from "vitest";
import logout, { LOGOUT_ENDPOINT } from "./logout";
import { IUser } from "../interfaces/user";

global.fetch = vi.fn();
const mockFetch = vi.mocked(fetch);

describe("logout", () => {
  const user: IUser = {
    id: "1",
    email: "test@gmail.com",
    name: "task",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  test("should call LOGOUT_ENDPOINT", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
    } as Response);
    await logout(user);
    expect(mockFetch).toHaveBeenCalledWith(LOGOUT_ENDPOINT, {
      method: "post",
      body: JSON.stringify(user),
    } satisfies RequestInit);
  });

  test("should throw an error when loggin out fail", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);
    expect(logout(user)).rejects.toThrowError();
  });
});
