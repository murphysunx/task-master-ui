import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EMPTY_LIST_MESSAGE } from "../../consts/empty-list-message";
import { ITask } from "../../interfaces/task.interface";
import TaskListStore from "../../stores/taskListStore";
import { TaskListView } from "./TaskList";
import { DEFAULT_MAX_TASK_LIST_ITEM } from "../../consts/default-max-task-list-item";

describe("TaskList Component", () => {
  let store: TaskListStore;

  beforeEach(() => {
    store = new TaskListStore("My Task List");
  });

  function renderComponent() {
    render(<TaskListView store={store} />);
  }

  function queryListNameElement(listName: string) {
    return screen.queryByTestId(`task-list-${listName}`);
  }

  function queryTodoCountElement(listName: string) {
    return screen.queryByTestId(`${listName}-todo-count`);
  }

  function queryAllTaskListItemElements() {
    return screen.queryAllByRole("listitem");
  }

  function queryTaskListItem(listName: string, taskId: number) {
    return screen.queryByTestId(`${listName}-${taskId}`);
  }

  function queryShowAllTasksButton(listName: string) {
    return screen.queryByTestId(`${listName}-show-all-button`);
  }

  function queryListAddInput(listName: string) {
    return screen.queryByTestId(`${listName}-add-input`);
  }

  it("should display the task list title", () => {
    renderComponent();
    const nameElement = queryListNameElement(store.listName);
    expect(nameElement).not.toBeNull();
    expect(nameElement).toHaveTextContent(store.listName);
  });

  it("should show correct todo count", async () => {
    renderComponent();
    const todoCountElement = queryTodoCountElement(store.listName);
    expect(todoCountElement).not.toBeNull();
    expect(todoCountElement!.textContent).toBe(store.todoCount.toString());
    act(() => {
      // Test with a single non-completed task
      const singleTask: ITask = {
        id: 1,
        title: "Single Task",
        completed: false,
      };
      store.addTask(singleTask);
    });
    await waitFor(() => {
      expect(todoCountElement!.textContent).toEqual(store.todoCount.toString());
    });
    act(() => {
      // Test with multiple non-completed tasks
      const task1: ITask = { id: 2, title: "Task 1", completed: false };
      const task2: ITask = { id: 3, title: "Task 2", completed: true };
      store.addTask(task1);
      store.addTask(task2);
    });
    await waitFor(() => {
      expect(todoCountElement!.textContent).toBe(store.todoCount.toString());
    });
  });

  it("should display {EMPTY_LIST_MESSAGE} when there are no tasks", () => {
    renderComponent();
    expect(screen.queryByText(EMPTY_LIST_MESSAGE)).not.toBeNull();
  });

  it("should display up to 5 tasks by default", () => {
    const itemCount = DEFAULT_MAX_TASK_LIST_ITEM + 1;
    for (let i = 1; i <= itemCount; i++) {
      const task: ITask = {
        id: i,
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    renderComponent();
    const listItems = queryAllTaskListItemElements();
    expect(listItems).toHaveLength(DEFAULT_MAX_TASK_LIST_ITEM);
  });

  it('should show a "Show All" button if there are more than 5 tasks', () => {
    const itemCount = DEFAULT_MAX_TASK_LIST_ITEM + 1;
    for (let i = 1; i <= itemCount; i++) {
      const task: ITask = {
        id: i,
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    renderComponent();
    const showAllButton = queryShowAllTasksButton(store.listName);
    expect(showAllButton).not.toBeNull();
    act(() => fireEvent.click(showAllButton!));
    const taskListItems = queryAllTaskListItemElements();
    expect(taskListItems).toHaveLength(itemCount);
    expect(showAllButton).not.toBeInTheDocument();
  });

  it("should display non-completed tasks before completed tasks", () => {
    const completedTask: ITask = { id: 1, title: "Task 1", completed: true };
    const nonCompletedTask: ITask = {
      id: 2,
      title: "Task 2",
      completed: false,
    };
    store.addTask(completedTask);
    store.addTask(nonCompletedTask);
    renderComponent();
    const items = queryAllTaskListItemElements();
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Task 2");
    expect(items[1]).toHaveTextContent("Task 1");
  });

  it("should sort tasks by title in ascending order", () => {
    const taskB: ITask = { id: 1, title: "B Task", completed: false };
    const taskA: ITask = { id: 2, title: "A Task", completed: false };
    store.addTask(taskB);
    store.addTask(taskA);
    renderComponent();
    const items = queryAllTaskListItemElements();
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("A Task");
    expect(items[1]).toHaveTextContent("B Task");
  });

  it("should have an input for add new todo in the list", () => {
    renderComponent();
    const addInput = queryListAddInput(store.listName);
    expect(addInput).not.toBeNull();
  });

  it("should submit new todo with valid todo title", async () => {
    const mockTaskId = 1;
    vi.spyOn(store, "createTask").mockImplementationOnce(
      async (title, desc) => {
        const created: ITask = {
          id: mockTaskId,
          title,
          description: desc,
          completed: false,
          listId: store.id,
        };
        store.addTask(created);
        return created;
      }
    );
    renderComponent();
    const addInput = queryListAddInput(store.listName);
    expect(addInput).not.toBeNull();
    const newTodoTitle = "new todo";
    act(() => {
      fireEvent.change(addInput!, { target: { value: newTodoTitle } });
      fireEvent.submit(addInput!);
    });
    await waitFor(() => {
      const newTodoListItem = queryTaskListItem(store.listName, mockTaskId);
      expect(newTodoListItem).not.toBeNull();
      expect(newTodoListItem).toHaveTextContent(newTodoTitle);
    });
  });
});
