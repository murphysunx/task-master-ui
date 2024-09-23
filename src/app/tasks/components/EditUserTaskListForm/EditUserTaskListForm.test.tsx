import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { UserTaskList } from "../../models/userTaskList/userTaskList";
import EditUserTaskListForm from "./EditUserTaskListForm";

describe("EditUserTaskListForm", () => {
  let props: React.ComponentProps<typeof EditUserTaskListForm>;

  beforeEach(() => {
    props = {
      list: new UserTaskList({
        id: 1,
        name: "chore",
      }),
      onConfirm: vi.fn(),
      onCancel: vi.fn(),
    };
  });

  test("Should have a form", () => {
    render(<EditUserTaskListForm {...props} />);
    const form = screen.queryByRole("form");
    expect(form).not.toBeNull();
  });

  test("Should have a form control for list name", () => {
    render(<EditUserTaskListForm {...props} />);
    const nameInput = screen.queryByRole("textbox", { name: "List Name" });
    expect(nameInput).toBeVisible();
    expect(nameInput).toHaveValue("chore");
  });

  test("Should have a save button", () => {
    render(<EditUserTaskListForm {...props} />);
    const saveBtn = screen.queryByRole("button", { name: /save/i });
    expect(saveBtn).toBeVisible();
  });

  test("Should have a cancel button", () => {
    render(<EditUserTaskListForm {...props} />);
    const cancelBtn = screen.queryByRole("button", { name: /cancel/i });
    expect(cancelBtn).toBeVisible();
  });

  test("Should submit the form with valid name", async () => {
    render(<EditUserTaskListForm {...props} />);
    const nameInput = screen.queryByRole("textbox", { name: "List Name" });
    const saveBtn = screen.queryByRole("button", { name: /save/i });
    act(() => {
      fireEvent.change(nameInput!, { target: { value: "new chore" } });
      fireEvent.click(saveBtn!);
    });
    await waitFor(() => {
      expect(props.onConfirm).toHaveBeenCalledWith({ name: "new chore" });
    });
  });

  test("Should not submit the form with invalid name", async () => {
    render(<EditUserTaskListForm {...props} />);
    const nameInput = screen.queryByRole("textbox", { name: "List Name" });
    const saveBtn = screen.queryByRole("button", { name: /save/i });
    act(() => {
      fireEvent.change(nameInput!, { target: { value: "" } });
      fireEvent.click(saveBtn!);
    });
    await waitFor(() => {
      expect(props.onConfirm).not.toHaveBeenCalled();
    });
  });

  test("Should cancel the form", () => {
    render(<EditUserTaskListForm {...props} />);
    const cancelBtn = screen.queryByRole("button", { name: /cancel/i });
    act(() => {
      fireEvent.click(cancelBtn!);
    });
    expect(props.onCancel).toHaveBeenCalled();
  });
});
