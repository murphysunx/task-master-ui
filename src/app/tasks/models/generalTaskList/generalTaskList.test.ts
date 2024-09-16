import { beforeEach, describe, expect, test } from "vitest";
import { GeneralTaskList } from "./generalTaskList";
import Task from "../task/task";

describe("TaskList", () => {
  let taskList: GeneralTaskList;

  beforeEach(() => {
    taskList = new GeneralTaskList("Inbox");
  });

  test("Should be defined", () => {
    expect(taskList).toBeDefined();
    expect(taskList.tasks).toHaveLength(0);
    expect(taskList.name).toBe("Inbox");
  });

  test("Should add a task to the list", () => {
    const task = new Task({
      id: 1,
      title: `Play football`,
      userId: 1,
    });
    taskList.addTask(task);
    expect(taskList.tasks).toHaveLength(1);
    expect(taskList.tasks[0]).toBe(task);
  });

  test("Should remove a task from the list", () => {
    const task = new Task({
      id: 1,
      title: `Play football`,
      userId: 1,
    });
    const task1 = new Task({
      id: 2,
      title: `Play football`,
      userId: 1,
    });
    taskList.addTask(task);
    taskList.addTask(task1);
    taskList.removeTask(task1);
    expect(taskList.tasks).toHaveLength(1);
    expect(taskList.tasks[0]).toBe(task);
  });

  test("Should remove all tasks from the list", () => {
    const task = new Task({
      id: 1,
      title: `Play football`,
      userId: 1,
    });
    const task1 = new Task({
      id: 2,
      title: `Play football`,
      userId: 1,
    });
    taskList.addTask(task);
    taskList.addTask(task1);
    taskList.empty();
    expect(taskList.tasks).toHaveLength(0);
  });

  test("Should check if the list contain a task", () => {
    const task = new Task({
      id: 1,
      title: `Play football`,
      userId: 1,
    });
    const task1 = new Task({
      id: 2,
      title: `Play football`,
      userId: 1,
    });
    taskList.addTask(task);
    expect(taskList.containTask(task)).toBeTruthy();
    expect(taskList.containTask(task1)).toBeFalsy();
  });
});
