import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TaskCard from "./task-card";

describe("Task Card", () => {
  test("renders task card title", () => {
    const result = render(
      <TaskCard
        task={{
          id: "1",
          title: "Task title",
          description: "Task description",
          completed: false,
        }}
      />
    );
    expect(result.getByText("Task title")).not.toBeNull();
  });

  test("renders task card description", () => {
    const result = render(
      <TaskCard
        task={{
          id: "1",
          title: "Task title",
          description: "Task description",
          completed: false,
        }}
        showDescription
      />
    );
    expect(result.getByText("Task description")).not.toBeNull();
  });

  test("should not render task card description", () => {
    const result = render(
      <TaskCard
        task={{
          id: "1",
          title: "Task title",
          description: "Task description",
          completed: false,
        }}
      />
    );
    expect(result.queryByText("Task description")).toBeNull();
  });
});
