import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ITask } from "../../interfaces/task.interface";
import TaskCard from "./TaskCard";
import Task from "../../models/task";

describe("TaskCard", () => {
  let task: Task;

  beforeEach(() => {
    task = new Task({
      id: "1",
      title: "Test Task",
      description: "This is a test task description",
      completed: false,
    });
  });

  it("should display the task title", () => {
    render(<TaskCard task={task} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("should not display the task description by default", () => {
    render(<TaskCard task={task} />);
    expect(
      screen.queryByText("This is a test task description")
    ).not.toBeInTheDocument();
  });

  it("should display the task description when showDescription prop is true", () => {
    render(<TaskCard task={task} showDescription={true} />);
    expect(
      screen.getByText("This is a test task description")
    ).toBeInTheDocument();
  });

  it("should not display the task description when showDescription prop is false", () => {
    render(<TaskCard task={task} showDescription={false} />);
    expect(
      screen.queryByText("This is a test task description")
    ).not.toBeInTheDocument();
  });

  it("should not fail if task has no description", () => {
    const taskWithoutDescription: ITask = {
      id: "2",
      title: "Task Without Description",
      completed: false,
    };
    render(<TaskCard task={taskWithoutDescription} showDescription={true} />);
    expect(screen.getByText("Task Without Description")).toBeInTheDocument();
  });
});
