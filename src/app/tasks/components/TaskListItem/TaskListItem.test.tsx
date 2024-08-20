import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ITask } from "../../interfaces/task.interface";
import Task from "../../models/task";
import TaskListStore from "../../stores/taskListStore";
import TaskListItem from "./TaskListItem";

describe("TaskListItem", () => {
  let store: TaskListStore;
  let taskWithDescription: Task;

  beforeEach(() => {
    store = new TaskListStore("All");
    store.addTask({
      id: 1,
      title: "Test Task",
      description: "This is a test task description",
      completed: false,
    });
    [taskWithDescription] = store.allTasks;
  });

  it("should display the task title", () => {
    render(<TaskListItem listStore={store} task={taskWithDescription} />);
    const title = screen.queryByDisplayValue(taskWithDescription.title);
    expect(title).not.toBeNull();
    expect(title).toBeVisible();
  });

  it("should toggle a task by ticking the checkbox", async () => {
    render(<TaskListItem listStore={store} task={taskWithDescription} />);
    const mockedToggle = vi
      .spyOn(taskWithDescription, "toggle")
      .mockImplementation(async () => {
        runInAction(
          () => (taskWithDescription.completed = !taskWithDescription.completed)
        );
        return {
          id: taskWithDescription.id,
          title: taskWithDescription.title,
          completed: taskWithDescription.completed || void 0,
          description: taskWithDescription.description || void 0,
          listId: taskWithDescription.listId || void 0,
        } satisfies ITask;
      });
    const checkbox = screen.queryByRole<HTMLInputElement>("checkbox");
    expect(checkbox).not.toBeNull();
    expect(checkbox).toBeVisible();
    expect(checkbox!.checked).toBeFalsy();
    act(() => fireEvent.click(checkbox!));
    expect(mockedToggle).toHaveBeenCalledOnce();
    expect(checkbox!.checked).toBeTruthy();
    act(() => fireEvent.click(checkbox!));
    expect(mockedToggle).toHaveBeenCalledTimes(2);
    expect(checkbox!.checked).toBeFalsy();
  });

  it("should delete a task", async () => {
    vi.spyOn(store, "deleteTask");
    vi.spyOn(taskWithDescription, "delete").mockResolvedValue();
    render(<TaskListItem listStore={store} task={taskWithDescription} />);
    const deleteButton = screen.queryByRole("button");
    expect(deleteButton).not.toBeNull();
    expect(
      store.allTasks.find((t) => t.id === taskWithDescription.id)
    ).toBeTruthy();
    act(() => fireEvent.click(deleteButton!));
    expect(store.deleteTask).toHaveBeenCalledWith(taskWithDescription);
    expect(taskWithDescription.delete).toHaveBeenCalledOnce();
    await waitFor(() =>
      expect(
        store.allTasks.find((t) => t.id === taskWithDescription.id)
      ).toBeFalsy()
    );
  });

  it("should focus a task after clicking the task title", async () => {
    render(<TaskListItem listStore={store} task={taskWithDescription} />);
    const title = screen.queryByDisplayValue(taskWithDescription.title);
    expect(title).not.toBeNull();
    expect(store.focusedTask).toBeNull();
    act(() => {
      fireEvent.click(title!);
    });
    await waitFor(() =>
      expect(store.focusedTask === taskWithDescription).toBeTruthy()
    );
  });

  it("should not focus a task after toggling a task", async () => {
    render(<TaskListItem listStore={store} task={taskWithDescription} />);
    const mockedToggle = vi
      .spyOn(taskWithDescription, "toggle")
      .mockImplementation(async () => {
        runInAction(
          () => (taskWithDescription.completed = !taskWithDescription.completed)
        );
        return {
          id: taskWithDescription.id,
          title: taskWithDescription.title,
          completed: taskWithDescription.completed || void 0,
          description: taskWithDescription.description || void 0,
          listId: taskWithDescription.listId || void 0,
        } satisfies ITask;
      });
    const checkbox = screen.queryByRole<HTMLInputElement>("checkbox");
    expect(store.focusedTask).toBeNull();
    act(() => fireEvent.click(checkbox!));
    expect(store.focusedTask).toBeNull();
  });
});
