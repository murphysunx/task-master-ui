import { describe, expect, test } from "vitest";
import pluralize from "./pluralize";

describe("Pluralize", () => {
  test("should return 'tasks' when count is 0", () => {
    const count = 0;
    const result = pluralize(count, "task", "tasks");
    expect(result).toBe("tasks");
  });

  test("should return 'task' when count is 1", () => {
    const count = 1;
    const result = pluralize(count, "task", "tasks");
    expect(result).toBe("task");
  });

  test("should return 'tasks' when count is 2", () => {
    const count = 2;
    const result = pluralize(count, "task", "tasks");
    expect(result).toBe("tasks");
  });

  test("should return 'tasks' when count is 100", () => {
    const count = 100;
    const result = pluralize(count, "task", "tasks");
    expect(result).toBe("tasks");
  });
});
