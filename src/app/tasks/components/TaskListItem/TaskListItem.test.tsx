import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Task from "../../models/task";
import TaskListItem from "./TaskListItem";

describe("TaskListItem", () => {
  let taskWithDescription: Task;

  function queryTaskTitleElement(taskId: number) {
    return screen.queryByTestId(`task-${taskId}-title`);
  }

  function queryTaskDescriptionElement(taskId: number) {
    return screen.queryByTestId(`task-${taskId}-description`);
  }

  beforeEach(() => {
    taskWithDescription = new Task({
      id: 1,
      title: "Test Task",
      description: "This is a test task description",
      completed: false,
    });
  });

  it("should display the task title", () => {
    render(<TaskListItem task={taskWithDescription} />);
    const titleElement = queryTaskTitleElement(taskWithDescription.id);
    expect(titleElement).not.toBeNull();
    expect(titleElement).toHaveTextContent(taskWithDescription.title);
  });

  it("should not show the task description by default", () => {
    render(<TaskListItem task={taskWithDescription} />);
    const descriptionElement = queryTaskDescriptionElement(
      taskWithDescription.id
    );
    expect(descriptionElement).toBeNull();
  });

  it("should show the task description when showDescription is true and task has description", () => {
    render(<TaskListItem task={taskWithDescription} showDescription={true} />);
    const descriptionElement = queryTaskDescriptionElement(
      taskWithDescription.id
    );
    expect(descriptionElement).not.toBeNull();
    expect(descriptionElement).toHaveTextContent(
      taskWithDescription.description!
    );
  });

  it("should not show the task description when showDescription is true and task has no description", () => {
    const taskWithoutDescription = new Task({
      id: 1,
      title: "Task with no description",
    });
    render(
      <TaskListItem task={taskWithoutDescription} showDescription={true} />
    );
    const descriptionElement = queryTaskDescriptionElement(
      taskWithDescription.id
    );
    expect(descriptionElement).toBeNull();
  });

  it("should not display the task description when showDescription prop is false", () => {
    render(<TaskListItem task={taskWithDescription} showDescription={false} />);
    const descriptionElement = queryTaskDescriptionElement(
      taskWithDescription.id
    );
    expect(descriptionElement).toBeNull();
  });
});
