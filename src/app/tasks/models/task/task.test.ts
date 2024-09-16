import { beforeEach, describe, expect, test } from "vitest";
import Task from "./task";

describe("Task", () => {
  let task: Task;

  beforeEach(() => {
    task = new Task({
      id: 1,
      title: "Play",
      userId: 1,
    });
  });

  test("Should initiate", () => {
    expect(task).toBeDefined();
    expect(task.id).toBe(1);
    expect(task.userId).toBe(1);
    expect(task.title).toBe("Play");
    expect(task.completed).toBeFalsy();
  });

  test("Should toJS", () => {
    const object = task.toJS();
    expect(object).toEqual({
      completed: false,
      description: void 0,
      id: 1,
      listId: void 0,
      title: "Play",
      userId: 1,
    });
  });

  test("Should update task", () => {
    task.update({
      id: 1,
      title: "Play games",
      userId: 2,
      description: "Play what?",
      completed: true,
      listId: 1,
    });
    expect(task.id).toBe(1);
    expect(task.userId).toBe(2);
    expect(task.title).toBe("Play games");
    expect(task.description).toBe("Play what?");
    expect(task.completed).toBeTruthy();
    expect(task.listId).toBe(1);
  });
});
