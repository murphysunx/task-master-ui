import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { ITask } from "../../types/task";
import CreateTaskForm from "./CreateTaskForm";

describe("Task list form", () => {
  let props: React.ComponentProps<typeof CreateTaskForm>;

  beforeEach(() => {
    props = {
      createTaskForList: vi
        .fn()
        .mockImplementation(
          async (title: string) => ({ id: 1, title, userId: 1 }) satisfies ITask
        ),
    };
  });

  function renderComponent() {
    render(<CreateTaskForm {...props} />);
  }

  function queryTaskListForm() {
    return screen.queryByRole("form");
  }

  function queryTitleInput(): HTMLInputElement | null {
    return screen.queryByRole("textbox");
  }

  function queryHiddenSubmitInput() {
    return screen.queryByRole("button");
  }

  function typeTaskTitle(title: string, input: HTMLInputElement) {
    fireEvent.change(input, { target: { value: title } });
  }

  function submitInput(input: HTMLInputElement) {
    fireEvent.submit(input);
  }

  test("should render without any error", () => {
    renderComponent();
  });

  test("should have a form", () => {
    renderComponent();
    expect(queryTaskListForm()).not.toBeNull();
  });

  test("should have the input field", () => {
    renderComponent();
    const input = queryTitleInput();
    expect(input).not.toBeNull();
    expect(input!.type).toBe("text");
  });

  test("should not run callback in props when submitting with empty title", async () => {
    renderComponent();
    const input = queryTitleInput();
    expect(props.createTaskForList).not.toHaveBeenCalled();
    act(() => submitInput(input!));
    await waitFor(() => {
      expect(props.createTaskForList).not.toHaveBeenCalled();
    });
  });

  test("should call store.createTask when submitting with valid title", async () => {
    renderComponent();
    const input = queryTitleInput();
    const title = "new Task";
    act(() => {
      typeTaskTitle(title, input!);
      submitInput(input!);
    });
    await waitFor(() => {
      expect(props.createTaskForList).toHaveBeenCalledOnce();
      expect(props.createTaskForList).toHaveBeenCalledWith(title);
      // reset form title value
      expect(input!.value).toBe("");
    });
  });
});
