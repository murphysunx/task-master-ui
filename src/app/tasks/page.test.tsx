import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import TaskDashboard from "./page";

describe("TasksPage", () => {
  test("getData is called", async () => {
    const { getByTestId } = render(await TaskDashboard());
    expect(getByTestId("task-dashboard")).not.toBeNull();
  });
});
