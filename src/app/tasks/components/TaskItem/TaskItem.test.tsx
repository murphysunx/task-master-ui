import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskItem from "./TaskItem";

describe("TaskListItem", () => {
  let props: React.ComponentProps<typeof TaskItem>;

  beforeEach(() => {
    props = {
      task: {
        id: 1,
        title: "Play",
        userId: 1,
      },
      focusTask: vi.fn(),
      toggleTask: vi.fn(),
      updateTaskTitle: vi.fn(),
      deleteTask: vi.fn(),
    };
  });

  it("Should display a checkbox not checked", () => {
    render(<TaskItem {...props} />);
    const checkbox = screen.queryByRole("checkbox");
    expect(checkbox).not.toBeNull();
    expect(checkbox).toBeVisible();
    expect(checkbox).not.toBeChecked();
  });

  it("Should display a checkbox checked", () => {
    props = {
      ...props,
      task: {
        ...props.task,
        completed: true,
      },
    };
    render(<TaskItem {...props} />);
    const checkbox = screen.queryByRole("checkbox");
    expect(checkbox).not.toBeNull();
    expect(checkbox).toBeVisible();
    expect(checkbox).toBeChecked();
  });

  it("should display a textbox for title", () => {
    render(<TaskItem {...props} />);
    const title = screen.queryByRole("textbox");
    expect(title).not.toBeNull();
    expect(title).toBeVisible();
    expect(title).toHaveValue(props.task.title);
  });

  it("Should display a button for deletion", async () => {
    render(<TaskItem {...props} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeNull();
    expect(button).toBeVisible();
    act(() => fireEvent.click(button!));
    await waitFor(() => {
      expect(props.deleteTask).toHaveBeenCalledOnce();
    });
  });

  it("should toggle a task by ticking the checkbox", async () => {
    render(<TaskItem {...props} />);
    const checkbox = screen.queryByRole<HTMLInputElement>("checkbox");
    act(() => fireEvent.click(checkbox!));
    await waitFor(() => expect(props.toggleTask).toHaveBeenCalledOnce());
  });

  it("should focus a task after clicking the task title", async () => {
    render(<TaskItem {...props} />);
    const title = screen.queryByRole("textbox");
    act(() => {
      fireEvent.click(title!);
    });
    await waitFor(() => expect(props.focusTask).toHaveBeenCalledOnce());
  });
});
