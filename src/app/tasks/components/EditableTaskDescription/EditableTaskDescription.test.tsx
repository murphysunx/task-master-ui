import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { runInAction } from "mobx";
import { beforeEach, describe, expect, MockInstance, test, vi } from "vitest";
import Task from "../../models/task";
import EditableTaskDescription from "./EditableTaskDescription";

describe("EditableTaskDescription", () => {
  let task: Task;
  let mockUpdateDescriptionFn: MockInstance;

  beforeEach(() => {
    task = new Task({
      id: 1,
      title: "My Task",
    });
    mockUpdateDescriptionFn = vi
      .spyOn(task, "updateDescription")
      .mockImplementation(async (value) => {
        runInAction(() => (task.description = value));
        return {
          id: task.id,
          title: task.title,
          completed: task.completed || void 0,
          description: task.description || void 0,
          listId: task.listId || void 0,
        };
      });
  });

  test("should show a placeholder when no description", () => {
    render(<EditableTaskDescription task={task} />);
    const placeholder = screen.queryByPlaceholderText("Description");
    expect(placeholder).not.toBeNull();
    expect(placeholder).toBeVisible();
  });

  test("should show description", () => {
    const taskWithDescription = new Task({
      id: 1,
      title: "New Task",
      description: "This is my new task",
    });
    render(<EditableTaskDescription task={taskWithDescription} />);
    const textbox = screen.queryByDisplayValue(
      taskWithDescription.description!
    );
    expect(textbox).not.toBeNull();
    expect(textbox).toBeVisible();
  });

  test("should add description to a task", async () => {
    render(<EditableTaskDescription task={task} />);
    const textbox = screen.queryByRole("textbox");
    expect(textbox).not.toBeNull();
    expect(textbox).toBeVisible();
    const description = "How to complete my task";
    act(() =>
      fireEvent.change(textbox!, {
        target: { value: description },
      })
    );
    await waitFor(() => {
      expect(mockUpdateDescriptionFn).toHaveBeenCalledWith(description);
      const newDescription = screen.queryByDisplayValue(description);
      expect(newDescription).not.toBeNull();
      expect(newDescription).toBeVisible();
      expect(task.description).toBe(description);
    });
  });
});
