import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import TaskListStore from "../../stores/taskListStore";
import TaskListForm from "./TaskListForm";

describe("Task list form", () => {
  let store: TaskListStore;

  beforeEach(() => {
    store = new TaskListStore("test");
  });

  function renderComponent(store: TaskListStore) {
    render(<TaskListForm store={store} />);
  }

  function queryTaskListForm(store: TaskListStore) {
    return screen.queryByTestId(`${store.listName}-form`);
  }

  function queryTitleInput(store: TaskListStore): HTMLInputElement | null {
    return screen.queryByTestId(`${store.listName}-new-task-title-input`);
  }

  function queryHiddenSubmitInput(store: TaskListStore) {
    return screen.queryByTestId(`${store.listName}-new-task-submit`);
  }

  function typeTaskTitle(title: string, input: HTMLInputElement) {
    fireEvent.change(input, { target: { value: title } });
  }

  function submitInput(input: HTMLInputElement) {
    fireEvent.submit(input);
  }

  test("should render", () => {
    renderComponent(store);
  });

  test("should have a form", () => {
    renderComponent(store);
    expect(queryTaskListForm(store)).not.toBeNull();
  });

  test("should have the input field", () => {
    renderComponent(store);
    const input = queryTitleInput(store);
    expect(input).not.toBeNull();
    expect(input!.type).toBe("text");
  });

  test("should have a hidden submit input", () => {
    renderComponent(store);
    const submit = queryHiddenSubmitInput(store);
    expect(submit).not.toBeNull();
    expect(submit!.hidden).toBeTruthy();
  });

  test("should not call store.createTask when submitting with empty title", async () => {
    renderComponent(store);
    // mock createTask
    vi.spyOn(store, "createTask").mockImplementationOnce(vi.fn());
    const mockedCreateTask = vi.mocked(store.createTask);
    const input = queryTitleInput(store);
    expect(mockedCreateTask).not.toHaveBeenCalled();
    act(() => submitInput(input!));
    await waitFor(() => {
      expect(mockedCreateTask).not.toHaveBeenCalled();
    });
  });

  test("should call store.createTask when submitting with valid title", async () => {
    renderComponent(store);
    // mock createTask
    vi.spyOn(store, "createTask").mockImplementationOnce((title) =>
      Promise.resolve({
        id: 1,
        title,
      })
    );
    const mockedCreateTask = vi.mocked(store.createTask);
    const input = queryTitleInput(store);
    expect(mockedCreateTask).not.toHaveBeenCalled();
    const title = "new Task";
    act(() => {
      typeTaskTitle(title, input!);
      submitInput(input!);
    });
    await waitFor(() => {
      expect(mockedCreateTask).toHaveBeenCalledOnce();
      expect(mockedCreateTask).toHaveBeenCalledWith(title);
      // reset form title value
      expect(input!.value).toBe("");
    });
  });
});
