import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import EditableTaskTitle from "./EditableTaskTitle";

describe("Editable Task Title", () => {
  let props: React.ComponentProps<typeof EditableTaskTitle>;

  beforeEach(() => {
    props = {
      task: {
        id: 1,
        title: "Play",
        userId: 1,
      },
      updateTaskTitle: vi.fn(),
    };
  });

  test("should show task title", () => {
    render(<EditableTaskTitle {...props} />);
    const input = screen.queryByRole("textbox");
    expect(input).not.toBeNull();
    expect(input).toBeVisible();
    expect(input).toHaveValue(props.task.title);
  });

  test("should enter edit mode after clicking", async () => {
    render(<EditableTaskTitle {...props} />);
    const input = screen.queryByRole("textbox");
    act(() => fireEvent.change(input!, { target: { value: "Sleep" } }));
    await waitFor(() => {
      expect(props.updateTaskTitle).toHaveBeenCalledOnce();
      expect(props.updateTaskTitle).toHaveBeenCalledWith("Sleep", props.task);
    });
  });
});
