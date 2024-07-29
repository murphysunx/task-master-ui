import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import TaskDashboard from "./page";

describe("TasksPage", () => {
  afterEach(() => {
    cleanup();
  });

  test("getData is called", async () => {
    const { getByTestId } = render(await TaskDashboard());
    expect(getByTestId("task-dashboard")).not.toBeNull();
  });
});
