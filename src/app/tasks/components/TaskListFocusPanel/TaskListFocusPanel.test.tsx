import { beforeEach, describe, expect, test } from "vitest";
import TaskListStore from "../../stores/taskListStore";
import { TaskResponseDto } from "../../dtos/task.dto";
import { render, screen } from "@testing-library/react";
import TaskListFocusPanel from "./TaskListFocusPanel";

describe("Task List Focus Panel", () => {
  let store: TaskListStore;
  const play: TaskResponseDto = {
    id: 1,
    title: "Play",
    completed: true,
    userId: 1,
  };
  const code: TaskResponseDto = {
    id: 2,
    title: "Code",
    description: "Code is easy",
    userId: 1,
  };

  beforeEach(() => {
    store = new TaskListStore("All");
    store.addTask(play);
    store.addTask(code);
  });

  function renderPanel(store: TaskListStore) {
    render(<TaskListFocusPanel />);
  }

  function queryPanelContainer() {
    return screen.queryByTestId(`task-list-focus-container`);
  }

  test("should show the focus panel with no children when no focus", () => {
    renderPanel(store);
    const container = queryPanelContainer();
    expect(store.focusedTask).toBeNull();
    expect(container).not.toBeNull();
    expect(container!.childElementCount).toBe(0);
  });

  test("should show focused task title", () => {
    const [task] = store.allTasks;
    store.focusTask(task);
    renderPanel(store);
    const titleElement = screen.queryByDisplayValue(task.title);
    expect(titleElement).not.toBeNull();
    expect(titleElement).toBeVisible();
  });

  test("should show focused task description", () => {
    const codeTask = store.allTasks.find((t) => t.id === code.id);
    expect(codeTask).toBeDefined();
    expect(codeTask!.description).toBeDefined();
    store.focusTask(codeTask!);
    renderPanel(store);
    const descriptionElement = screen.queryByText(codeTask!.description!);
    expect(descriptionElement).not.toBeNull();
    expect(descriptionElement).toBeVisible();
  });

  test("should show a checkbox indicating the completion of the focused completed task", () => {
    const [completedTask] = store.allTasks;
    store.focusTask(completedTask);
    renderPanel(store);
    const checkbox: HTMLInputElement | null = screen.queryByRole("checkbox");
    expect(checkbox).not.toBeNull();
    expect(checkbox!.checked).toBeTruthy();
  });

  test("should show a checkbox indicating the completion of the focused todo", () => {
    const [_, todo] = store.allTasks;
    store.focusTask(todo);
    renderPanel(store);
    const checkbox: HTMLInputElement | null = screen.queryByRole("checkbox");
    expect(checkbox).not.toBeNull();
    expect(checkbox!.checked).toBeFalsy();
  });
});
