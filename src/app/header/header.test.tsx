import { describe, vi } from "vitest";
import login from "../auth/apis/login";

vi.mock(import("../auth/apis/login"), async (importOrigingal) => {
  const origingal = await importOrigingal();
  return {
    ...origingal,
    default: vi.fn(),
  };
});

const mockLogin = vi.mocked(login);

describe("header", () => {});
