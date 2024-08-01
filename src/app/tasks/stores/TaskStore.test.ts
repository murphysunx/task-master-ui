import { beforeEach, describe, expect, it } from "vitest";
import TaskStore from "./TaskStore"; // Adjust the path as needed

describe("TaskStore", () => {
  let store: TaskStore;

  beforeEach(() => {
    store = new TaskStore();
  });

  it("should create an empty task store", () => {
    expect(store.allTaskLists.length).toBe(0);
  });

  it("should add a task list", () => {
    store.addTaskList("1", "Test Task List");
    const taskList = store.getTaskList("1");
    expect(taskList).toBeDefined();
    expect(taskList?.name).toBe("Test Task List");
  });

  it("should not add a duplicate task list", () => {
    store.addTaskList("1", "Test Task List");
    store.addTaskList("1", "Another Test Task List");
    expect(store.allTaskLists.length).toBe(1);
    expect(store.getTaskList("1")?.name).toBe("Test Task List");
  });

  it("should remove a task list", () => {
    store.addTaskList("2", "Test Task List 2");
    store.removeTaskList("2");
    expect(store.getTaskList("2")).toBeUndefined();
  });

  it("should return all task lists", () => {
    store.addTaskList("3", "Test Task List 3");
    store.addTaskList("4", "Test Task List 4");
    expect(store.allTaskLists.length).toBe(2);
  });
});
