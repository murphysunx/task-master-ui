import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { CreateTaskListFormFields } from "../../types/taskList";
import CreateTaskListForm from "./CreateTaskListForm";

describe("CreateListForm", () => {
  let props: React.ComponentProps<typeof CreateTaskListForm>;

  beforeEach(() => {
    props = {
      submit: vi.fn(),
      cancel: vi.fn(),
    };
  });

  test("Should have a form", () => {
    render(<CreateTaskListForm {...props} />);
    const form = screen.queryByRole("form");
    expect(form).not.toBeNull();
  });

  test("Should have a form control for list name", () => {
    render(<CreateTaskListForm {...props} />);
    // input accessible name is associated with its label value
    const nameControl = screen.queryByRole("textbox", { name: "List Name" });
    expect(nameControl).not.toBeNull();
    expect(nameControl).toBeVisible();
  });

  test("Should have a save button", () => {
    render(<CreateTaskListForm {...props} />);
    const saveBtn = screen.queryByRole("button", {
      name: /save/i,
    });
    expect(saveBtn).not.toBeNull();
    expect(saveBtn).toBeVisible();
  });

  test("Should have a cancel button", () => {
    render(<CreateTaskListForm {...props} />);
    const cancelBtn = screen.queryByRole("button", {
      name: /cancel/i,
    });
    expect(cancelBtn).not.toBeNull();
    expect(cancelBtn).toBeVisible();
  });

  test("Should submit the form with valid name", async () => {
    render(<CreateTaskListForm {...props} />);
    const nameControl = screen.queryByRole("textbox", { name: "List Name" });
    const saveBtn = screen.queryByRole<HTMLButtonElement>("button", {
      name: /save/i,
    });
    act(() => {
      fireEvent.change(nameControl!, { target: { value: "Chore" } });
      fireEvent.click(saveBtn!);
    });
    await waitFor(() => {
      expect(props.submit).toHaveBeenCalledOnce();
      expect(props.submit).toHaveBeenCalledWith({
        name: "Chore",
      } satisfies CreateTaskListFormFields);
    });
  });

  test("Should not submit the form with empty name", async () => {
    render(<CreateTaskListForm {...props} />);
    const nameControl = screen.queryByRole("textbox", { name: "List Name" });
    const saveBtn = screen.queryByRole("button", {
      name: /save/i,
    });
    act(() => {
      fireEvent.change(nameControl!, { value: "" });
      fireEvent.click(saveBtn!);
    });
    await waitFor(() => {
      expect(props.submit).not.toHaveBeenCalledOnce();
    });
  });

  test("Should call cancel function", async () => {
    render(<CreateTaskListForm {...props} />);
    const cancelBtn = screen.queryByRole("button", { name: /cancel/i });
    act(() => fireEvent.click(cancelBtn!));
    await waitFor(() => {
      expect(props.cancel).toHaveBeenCalledOnce();
    });
  });
});
