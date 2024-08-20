import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Task from "../../models/task";
import TaskListStore from "../../stores/taskListStore";
import TaskListItem from "./TaskListItem";

describe("TaskListItem", () => {
  let store: TaskListStore;
  let taskWithDescription: Task;

  function queryTaskTitleElement(taskId: number) {
    return screen.queryByTestId(`task-${taskId}-title`);
  }

  function queryTaskDescriptionElement(taskId: number) {
    return screen.queryByTestId(`task-${taskId}-description`);
  }

  function queryTaskDeleteButton(taskId: number) {
    return screen.queryByTestId(`task-${taskId}-delete-button`);
  }

  function queryTaskContainer(taskId: number) {
    return screen.queryByTestId(`task-${taskId}-container`);
  }

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
    const titleElement = queryTaskTitleElement(taskWithDescription.id);
    expect(titleElement).not.toBeNull();
    expect(titleElement).toHaveTextContent(taskWithDescription.title);
  });

  it("should not show the task description by default", () => {
    render(<TaskListItem listStore={store} task={taskWithDescription} />);
    const descriptionElement = queryTaskDescriptionElement(
      taskWithDescription.id
    );
    expect(descriptionElement).toBeNull();
  });

  it("should show the task description when showDescription is true and task has description", () => {
    render(
      <TaskListItem
        listStore={store}
        task={taskWithDescription}
        showDescription={true}
      />
    );
    const descriptionElement = queryTaskDescriptionElement(
      taskWithDescription.id
    );
    expect(descriptionElement).not.toBeNull();
    expect(descriptionElement).toHaveTextContent(
      taskWithDescription.description!
    );
  });

  it("should not show the task description when showDescription is true and task has no description", () => {
    const taskWithoutDescription = new Task({
      id: 1,
      title: "Task with no description",
    });
    render(
      <TaskListItem
        listStore={store}
        task={taskWithoutDescription}
        showDescription={true}
      />
    );
    const descriptionElement = queryTaskDescriptionElement(
      taskWithDescription.id
    );
    expect(descriptionElement).toBeNull();
  });

  it("should not display the task description when showDescription prop is false", () => {
    render(
      <TaskListItem
        listStore={store}
        task={taskWithDescription}
        showDescription={false}
      />
    );
    const descriptionElement = queryTaskDescriptionElement(
      taskWithDescription.id
    );
    expect(descriptionElement).toBeNull();
  });

  it("should delete a task", async () => {
    vi.spyOn(store, "deleteTask");
    vi.spyOn(taskWithDescription, "delete").mockResolvedValue();
    render(<TaskListItem listStore={store} task={taskWithDescription} />);
    const deleteButton = queryTaskDeleteButton(taskWithDescription.id);
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

  it("should focus a task after clicking the task", async () => {
    render(<TaskListItem listStore={store} task={taskWithDescription} />);
    const container = queryTaskContainer(taskWithDescription.id);
    expect(container).not.toBeNull();
    expect(store.focusedTask).toBeNull();
    act(() => {
      fireEvent.click(container!);
    });
    await waitFor(() =>
      expect(store.focusedTask === taskWithDescription).toBeTruthy()
    );
  });
});
