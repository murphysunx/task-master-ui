import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    const input = screen.queryByDisplayValue(task.title);
    expect(input).not.toBeNull();
  });

  test("should enter edit mode after clicking", async () => {
    mockFetch.mockResolvedValueOnce({
      json() {
        return Promise.resolve(null);
      },
    } as Response);
    render(<EditableTaskTitle task={task} />);
    const input = screen.queryByDisplayValue(task.title);
    fireEvent.change(input!, { target: { value: "Sleep" } });
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: "Sleep" }),
      });
    });
    const newTitle = screen.queryByDisplayValue("Sleep");
    expect(newTitle).not.toBeNull();
  });
});
