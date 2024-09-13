import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import EditableTaskDescription from "./EditableTaskDescription";

describe("EditableTaskDescription", () => {
  let props: React.ComponentProps<typeof EditableTaskDescription>;

  beforeEach(() => {
    props = {
      task: {
        id: 1,
        title: "Play",
        userId: 1,
      },
      updateTaskDescription: vi.fn(),
    };
  });

  test("should show a placeholder when no description", () => {
    render(<EditableTaskDescription {...props} />);
    const placeholder = screen.queryByPlaceholderText("Description");
    expect(placeholder).not.toBeNull();
    expect(placeholder).toBeVisible();
  });

  test("should show description", () => {
    props = {
      ...props,
      task: {
        ...props.task,
        description: "Play what?",
      },
    };
    render(<EditableTaskDescription {...props} />);
    const textbox = screen.queryByRole("textbox");
    expect(textbox).not.toBeNull();
    expect(textbox).toBeVisible();
    expect(textbox).toHaveTextContent(props.task.description!);
  });

  test("should add description to a task", async () => {
    render(<EditableTaskDescription {...props} />);
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
      expect(props.updateTaskDescription).toHaveBeenCalledOnce();
      expect(props.updateTaskDescription).toHaveBeenCalledWith(
        description,
        props.task
      );
    });
  });
});
