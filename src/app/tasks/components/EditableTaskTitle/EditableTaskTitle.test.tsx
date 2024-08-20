import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Task from "../../models/task";
import EditableTaskTitle from "./EditableTaskTitle";

global.fetch = vi.fn();
const mockFetch = vi.mocked(fetch);

describe("Editable Task Title", () => {
  let task: Task;

  beforeEach(() => {
    task = new Task({
      id: 1,
      title: "Code",
    });
  });

  test("should show task title", () => {
    render(<EditableTaskTitle task={task} />);
    const title = screen.queryByTestId(`editable-task-title-${task.id}`);
    expect(title).not.toBeNull();
  });

  test("should enter edit mode after clicking", () => {
    mockFetch.mockResolvedValueOnce({
      json() {
        return Promise.resolve(null);
      },
    } as Response);
    render(<EditableTaskTitle task={task} />);
    const title: HTMLInputElement | null = screen.queryByTestId(
      `editable-task-title-${task.id}`
    );
    expect(title).not.toBeNull();
    fireEvent.change(title!, { target: { value: "Sleep" } });
    expect(fetch).toHaveBeenCalledWith(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: "Sleep" }),
    });
    expect(title!.value).toBe("Sleep");
  });
});
