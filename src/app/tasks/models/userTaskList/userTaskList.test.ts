import { beforeEach, describe, expect, test } from "vitest";
import { TaskListResponseDto } from "../../dtos/taskList.dto";
import Task from "../task/task";
import { UserTaskList } from "./userTaskList";

describe("TaskList", () => {
  let taskList: UserTaskList;

  beforeEach(() => {
    taskList = new UserTaskList({
      id: 1,
      name: "Chore",
    });
  });

  test("Should be defined", () => {
    expect(taskList).toBeDefined();
    expect(taskList.tasks).toHaveLength(0);
    expect(taskList.id).toBe(1);
    expect(taskList.name).toBe("Chore");
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

  test("Should update task list", () => {
    taskList.update({
      id: 1,
      name: "Chore 1",
    } satisfies TaskListResponseDto);
    expect(taskList.name).toBe("Chore 1");
  });
});
