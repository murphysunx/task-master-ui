import { beforeEach, describe, expect, it } from "vitest";
import { EMPTY_LIST_MESSAGE } from "../consts/empty-list-message";
import { ITask } from "../interfaces/task.interface";
import TaskListStore from "./taskListStore";

describe("TaskListStore", () => {
  let store: TaskListStore;

  beforeEach(() => {
    store = new TaskListStore("My Task List");
  });

  it("should initialize with an empty task list", () => {
    expect(store.allTasks.length).toBe(0);
  });

  it("should initialize with showAll set to false", () => {
    expect(store.showAll).toBe(false);
  });

  it("should add a task to the task list", () => {
    const task: ITask = { id: "1", title: "Task 1", completed: false };
    store.addTask(task);
    expect(store.allTasks.length).toBe(1);
    expect(store.allTasks[0].title).toBe("Task 1");
  });

  // it("should increment the count of non-completed tasks when a new task is added", () => {
  //   const task: ITask = { id: "1", title: "Task 1", completed: false };
  //   store.addTask(task);
  //   expect(store.nonCompletedTasksCount).toBe(1);
  // });

  it('should show a message "Add your first task" when the task list is empty', () => {
    expect(store.emptyMessage).toBe(EMPTY_LIST_MESSAGE);
  });

  it("should display only the top 5 tasks by default", () => {
    for (let i = 1; i <= 6; i++) {
      const task: ITask = {
        id: i.toString(),
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    expect(store.displayedTasks.length).toBe(5);
  });

  it('should display a "show all" button if there are more than 5 tasks', () => {
    for (let i = 1; i <= 6; i++) {
      const task: ITask = {
        id: i.toString(),
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    expect(store.showAllButtonVisible).toBe(true);
  });

  it('should show all tasks after clicking the "show all" button', () => {
    for (let i = 1; i <= 6; i++) {
      const task: ITask = {
        id: i.toString(),
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    store.toggleShowAll();
    expect(store.displayedTasks.length).toBe(6);
  });

  it('should hide the "show all" button after clicking it', () => {
    for (let i = 1; i <= 6; i++) {
      const task: ITask = {
        id: i.toString(),
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    store.toggleShowAll();
    expect(store.showAllButtonVisible).toBe(false);
  });

  it("should display non-completed tasks prior to the completed ones", () => {
    const completedTask: ITask = { id: "1", title: "Task 1", completed: true };
    const nonCompletedTask: ITask = {
      id: "2",
      title: "Task 2",
      completed: false,
    };
    store.addTask(completedTask);
    store.addTask(nonCompletedTask);
    expect(store.displayedTasks[0].title).toBe("Task 2");
  });

  it("should sort tasks by title in ascending order by default", () => {
    const taskB: ITask = { id: "1", title: "B Task", completed: false };
    const taskA: ITask = { id: "2", title: "A Task", completed: false };
    store.addTask(taskB);
    store.addTask(taskA);
    expect(store.displayedTasks[0].title).toBe("A Task");
  });

  it("should compute correct todo count", () => {
    expect(store.todoCount).toBe(0);
    for (let i = 1; i <= 6; i++) {
      const task: ITask = {
        id: i.toString(),
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    expect(store.todoCount).toBe(6);
  });
});
