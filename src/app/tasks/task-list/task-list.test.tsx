import {
  cleanup,
  createEvent,
  fireEvent,
  render,
} from "@testing-library/react";

import { afterEach, describe, expect, test } from "vitest";
import TaskList from "./task-list";
import { Task } from "../task.interface";

describe("TaskList", () => {
  afterEach(() => cleanup());

  test("should render a task list", () => {
    const title = "task list";
    const result = render(<TaskList title={title} tasks={[]} />);
    expect(result.getByTestId("task-list-" + title)).not.toBeNull();
  });

  test("should show task list title", () => {
    const title = "My Task List";
    const result = render(<TaskList tasks={[]} title={title} />);
    expect(result.getByTestId("task-list-title")).not.toBeNull();
    expect(result.getByText(title)).not.toBeNull();
  });

  test("should show task list title", () => {
    const title = "My Task List";
    const result = render(<TaskList tasks={[]} title={title} />);
    expect(result.getByTestId("task-list-title")).not.toBeNull();
    expect(result.getByText(title)).not.toBeNull();
  });

  test("should show 'add your first task' message when no tasks", () => {
    const title = "My Task List";
    const result = render(<TaskList tasks={[]} title={title} />);
    expect(result.getByText("Add your first task")).not.toBeNull();
  });

  test("should not show 'add your first task' message when tasks exist", () => {
    const title = "My Task List";
    const tasks: Task[] = [{ id: "1", title: "Task 1" }];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.queryByText("Add your first task")).toBeNull();
  });

  test("should show 0 tasks when no tasks", () => {
    const title = "My Task List";
    const result = render(<TaskList tasks={[]} title={title} />);
    expect(result.getByTestId("task-list-counter").textContent).toBe("0 tasks");
  });

  test("should show 1 task when having 1 incomplete task", () => {
    const title = "My Task List";
    const tasks: Task[] = [{ id: "1", title: "Task 1" }];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.getByTestId("task-list-counter").textContent).toBe("1 task");
  });

  test("should show 2 tasks when having 2 incomplete tasks", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.getByTestId("task-list-counter").textContent).toBe("2 tasks");
  });

  test("should show 1 task when having 1 incomplete task and 1 completed task", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1", completed: true },
      { id: "2", title: "Task 2" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.getByTestId("task-list-counter").textContent).toBe("1 task");
  });

  test("should show 2 tasks when having 2 incomplete tasks and 1 completed task", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1", completed: true },
      { id: "2", title: "Task 2" },
      { id: "3", title: "Task 3" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.getByTestId("task-list-counter").textContent).toBe("2 tasks");
  });

  test("should show all tasks when having less than 5 tasks", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
      { id: "3", title: "Task 3" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.getAllByTestId(/task-list-item-\d+/).length).toBe(3);
  });

  test("should only show 5 tasks when having more than 5 tasks", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
      { id: "3", title: "Task 3" },
      { id: "4", title: "Task 4" },
      { id: "5", title: "Task 5" },
      { id: "6", title: "Task 6" },
      { id: "7", title: "Task 7" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.getAllByTestId(/task-list-item-\d+/).length).toBe(5);
  });

  test("should display 'show all' button when having more than 5 tasks", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
      { id: "3", title: "Task 3" },
      { id: "4", title: "Task 4" },
      { id: "5", title: "Task 5" },
      { id: "6", title: "Task 6" },
      { id: "7", title: "Task 7" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.getByTestId("task-list-show-all-btn")).not.toBeNull();
  });

  test("should not display 'show all' button when having less than 5 tasks", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
      { id: "3", title: "Task 3" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    expect(result.queryByTestId("task-list-show-all-btn")).toBeNull();
  });

  test("should show all tasks when clicking 'show all' button", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
      { id: "3", title: "Task 3" },
      { id: "4", title: "Task 4" },
      { id: "5", title: "Task 5" },
      { id: "6", title: "Task 6" },
      { id: "7", title: "Task 7" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    const showAllBtn = result.getByTestId("task-list-show-all-btn");
    const clickEvent = createEvent.click(showAllBtn);
    fireEvent(showAllBtn, clickEvent);
    expect(result.getAllByTestId(/task-list-item-\d+/).length).toBe(7);
  });

  test("should not display 'show all' button after clicking it", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
      { id: "3", title: "Task 3" },
      { id: "4", title: "Task 4" },
      { id: "5", title: "Task 5" },
      { id: "6", title: "Task 6" },
      { id: "7", title: "Task 7" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    const showAllBtn = result.getByTestId("task-list-show-all-btn");
    const clickEvent = createEvent.click(showAllBtn);
    fireEvent(showAllBtn, clickEvent);
    expect(result.queryByTestId("task-list-show-all-btn")).toBeNull();
  });

  test("should put incompleted tasks before completed tasks", () => {
    const title = "My Task List";
    const tasks: Task[] = [
      { id: "1", title: "Task 1", completed: true },
      { id: "2", title: "Task 2" },
      { id: "3", title: "Task 3" },
    ];
    const result = render(<TaskList tasks={tasks} title={title} />);
    const taskListItems = result.getAllByTestId(/task-list-item-\d+/);
    expect(taskListItems[0].textContent).toContain("Task 2");
    expect(taskListItems[1].textContent).toContain("Task 3");
    expect(taskListItems[2].textContent).toContain("Task 1");
  });
});
