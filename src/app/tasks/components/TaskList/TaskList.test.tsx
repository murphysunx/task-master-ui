import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ITask } from "../../interfaces/task.interface";
import { ITaskList } from "../../interfaces/taskList.interface";
import TaskListStore from "../../stores/taskListStore";
import { TaskListView } from "./TaskList";

describe("TaskList Component", () => {
  let store: TaskListStore;

  beforeEach(() => {
    const taskList: ITaskList = { id: "1", name: "My Task List" };
    store = new TaskListStore(taskList);
  });

  const renderComponent = () => render(<TaskListView store={store} />);

  it("should display the task list title", () => {
    renderComponent();
    expect(screen.getByText("My Task List")).toBeInTheDocument();
  });

  it("should correctly display the plurality of non-completed tasks", async () => {
    // Test with a single non-completed task
    const singleTask: ITask = {
      id: "1",
      title: "Single Task",
      completed: false,
    };
    store.addTask(singleTask);
    renderComponent();
    expect(screen.getByText("1 task remaining")).toBeInTheDocument();

    act(() => {
      // Test with multiple non-completed tasks
      const task1: ITask = { id: "2", title: "Task 1", completed: false };
      const task2: ITask = { id: "3", title: "Task 2", completed: false };
      store.addTask(task1);
      store.addTask(task2);
    });
    await waitFor(() => {
      expect(screen.getByText("3 tasks remaining")).toBeInTheDocument();
    });
  });

  it('should display "Add your first task" when there are no tasks', () => {
    renderComponent();
    expect(screen.getByText("Add your first task")).toBeInTheDocument();
  });

  it("should display up to 5 tasks by default", () => {
    for (let i = 1; i <= 6; i++) {
      const task: ITask = {
        id: i.toString(),
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    renderComponent();
    expect(screen.getAllByRole("listitem").length).toBe(5);
  });

  it('should display a "Show All" button if there are more than 5 tasks', () => {
    for (let i = 1; i <= 6; i++) {
      const task: ITask = {
        id: i.toString(),
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    renderComponent();
    expect(screen.getByText("Show All")).toBeInTheDocument();
  });

  it('should show all tasks after clicking the "Show All" button', () => {
    for (let i = 1; i <= 6; i++) {
      const task: ITask = {
        id: i.toString(),
        title: `Task ${i}`,
        completed: false,
      };
      store.addTask(task);
    }
    renderComponent();
    fireEvent.click(screen.getByText("Show All"));
    expect(screen.getAllByRole("listitem").length).toBe(6);
    expect(screen.queryByText("Show All")).not.toBeInTheDocument();
  });

  it("should display non-completed tasks before completed tasks", () => {
    const completedTask: ITask = { id: "1", title: "Task 1", completed: true };
    const nonCompletedTask: ITask = {
      id: "2",
      title: "Task 2",
      completed: false,
    };
    store.addTask(completedTask);
    store.addTask(nonCompletedTask);
    renderComponent();
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Task 2");
    expect(items[1]).toHaveTextContent("Task 1");
  });

  it("should sort tasks by title in ascending order", () => {
    const taskB: ITask = { id: "1", title: "B Task", completed: false };
    const taskA: ITask = { id: "2", title: "A Task", completed: false };
    store.addTask(taskB);
    store.addTask(taskA);
    renderComponent();
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("A Task");
    expect(items[1]).toHaveTextContent("B Task");
  });
});
