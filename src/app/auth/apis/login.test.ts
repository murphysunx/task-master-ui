import { describe, expect, it, vi } from "vitest";
import { IUser } from "../interfaces/user";
import login, { LOGIN_ENDPOINT } from "./login";

global.fetch = vi.fn();
const mockFetch = vi.mocked(fetch);

describe("login api", () => {
  const email = "test@gmail.com";
  const password = "123456";

  function createFetchResponse(data: unknown, ok: boolean): Response {
    return {
      json: () => new Promise((resolve) => resolve(data)),
      ok,
    } as Response;
  }

  it("should call LOGIN_ENDPOINT", async () => {
    const expectedUser: IUser = {
      id: "1",
      email,
      name: "task",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockFetch.mockResolvedValueOnce(createFetchResponse(expectedUser, true));
    const response = await login(email, password);
    expect(fetch).toHaveBeenCalledWith(LOGIN_ENDPOINT, {
      method: "post",
      body: JSON.stringify({ email, password }),
    });
    expect(response).toStrictEqual(expectedUser);
  });

  it("should throw an error when loggin fails", async () => {
    mockFetch.mockResolvedValueOnce(createFetchResponse(null, false));
    await expect(login(email, password)).rejects.toThrow();
  });
});
