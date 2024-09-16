import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { GeneralTaskList } from "../models/generalTaskList/generalTaskList";
import Task from "../models/task/task";
import { UserTaskList } from "../models/userTaskList/userTaskList";
import TaskStore from "./taskStore";

describe("TaskStore", () => {
  const taskStore = TaskStore;

  afterEach(() => taskStore.cleanUp());

  test("Should be initiated", () => {
    expect(taskStore).toBeDefined();
    expect(taskStore.taskLists).toHaveLength(1);
    expect(taskStore.taskLists[0] instanceof GeneralTaskList);
  });

  test("Should find the inbox", () => {
    const list = taskStore.findListById();
    expect(list).toBeDefined();
    expect(list instanceof GeneralTaskList).toBeTruthy();
    expect(list!.name).toBe("Inbox");
    expect(list).toBe(taskStore.inbox);
  });

  test("Should add a user task list", () => {
    const userList = new UserTaskList({
      id: 1,
      name: "Chore",
    });
    taskStore.addUserList(userList);
    expect(taskStore.taskLists).toHaveLength(2);
    expect(taskStore.taskLists[0] instanceof GeneralTaskList);
    expect(taskStore.taskLists[1]).toBe(userList);
  });

  test("Should find the user list", () => {
    const userList = new UserTaskList({
      id: 1,
      name: "Chore",
    });
    taskStore.addUserList(userList);
    const result = taskStore.findListById(userList.id);
    expect(result).toBe(userList);
  });

  test("Should not find a user list not in the store", () => {
    const result = taskStore.findListById(1);
    expect(result).toBeNull();
  });

  test("Should add a task to the inbox", () => {
    const task = new Task({
      id: 1,
      title: "Play soccre",
      userId: 1,
    });
    const inbox = taskStore.inbox;
    const addTask = vi.spyOn(inbox!, "addTask");
    taskStore.addTaskToList(task);
    expect(addTask).toHaveBeenCalledWith(task);
  });

  test("Should remove a task from the inbox", () => {
    const task = new Task({
      id: 1,
      title: "Play soccre",
      userId: 1,
    });
    const inbox = taskStore.inbox;
    const removeTask = vi.spyOn(inbox!, "removeTask");
    taskStore.addTaskToList(task);
    taskStore.removeTaskFromList(task);
    expect(removeTask).toHaveBeenCalledWith(task);
  });

  test("Should add a task to a user list", () => {
    const userList = new UserTaskList({
      id: 1,
      name: "Chore",
    });
    taskStore.addUserList(userList);
    const task = new Task({
      id: 1,
      title: "Play soccre",
      listId: 1,
      userId: 1,
    });
    const addTask = vi.spyOn(userList, "addTask");
    taskStore.addTaskToList(task);
    expect(addTask).toHaveBeenCalledWith(task);
  });

  test("Should remove a task from a user list", () => {
    const userList = new UserTaskList({
      id: 1,
      name: "Chore",
    });
    taskStore.addUserList(userList);
    const task = new Task({
      id: 1,
      title: "Play soccre",
      listId: 1,
      userId: 1,
    });
    const removeTask = vi.spyOn(userList, "removeTask");
    taskStore.addTaskToList(task);
    taskStore.removeTaskFromList(task);
    expect(removeTask).toHaveBeenCalledWith(task);
  });

  test("Should empty the inbox and remove all user lists from the store", () => {
    const userList = new UserTaskList({
      id: 1,
      name: "Chore",
    });
    taskStore.addUserList(userList);
    const task = new Task({
      id: 1,
      title: "Play soccre",
      userId: 1,
    });
    const inbox = taskStore.inbox;
    taskStore.addTaskToList(task);
    taskStore.cleanUp();
    expect(inbox!.tasks).toHaveLength(0);
    expect(taskStore.taskLists).toHaveLength(1);
    expect(taskStore.taskLists[0]).toBe(inbox);
    expect(taskStore.findListById(1)).toBeNull();
  });
});
