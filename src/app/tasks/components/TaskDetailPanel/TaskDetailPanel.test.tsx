import { beforeEach, describe, expect, test, vi } from "vitest";
import { TaskResponseDto } from "../../dtos/task.dto";
import { render, screen } from "@testing-library/react";
import TaskDetailPanel from "./TaskDetailPanel";

describe("Task List Focus Panel", () => {
  let play: TaskResponseDto;

  let props: React.ComponentProps<typeof TaskDetailPanel>;

  beforeEach(() => {
    play = {
      id: 1,
      title: "Play",
      description: "Play what?",
      completed: true,
      userId: 1,
    };
    props = {
      task: play,
      toggleTask: vi.fn(),
      updateTaskDescription: vi.fn(),
      updateTaskTitle: vi.fn(),
    };
  });

  function renderPanel() {
    render(<TaskDetailPanel {...props} />);
  }

  test("Should show a checkbox checked", () => {
    renderPanel();
    const checkbox = screen.queryByRole("checkbox");
    expect(checkbox).not.toBeNull();
    expect(checkbox).toBeVisible();
    expect(checkbox).toBeInstanceOf(HTMLInputElement);
    expect(checkbox).toBeChecked();
  });

  test("Should show a checkbox not checked", () => {
    play = {
      ...play,
      completed: false,
    };
    props = {
      ...props,
      task: play,
    };
    renderPanel();
    const checkbox = screen.queryByRole("checkbox");
    expect(checkbox).not.toBeNull();
    expect(checkbox).toBeVisible();
    expect(checkbox).toBeInstanceOf(HTMLInputElement);
    expect(checkbox).not.toBeChecked();
  });

  test("should show a textbox for title", () => {
    renderPanel();
    const textboxes = screen.queryAllByRole("textbox");
    const titleTextbox: HTMLInputElement = textboxes.find(
      (textbox) => textbox instanceof HTMLInputElement
    ) as HTMLInputElement;
    expect(titleTextbox).not.toBeNull();
    expect(titleTextbox).toBeVisible();
  });

  test("should show a textbox for description", () => {
    renderPanel();
    const textboxes = screen.queryAllByRole("textbox");
    const descriptionTextbox = textboxes.find(
      (textbox) => textbox.textContent === play.description
    );
    expect(descriptionTextbox).not.toBeNull();
    expect(descriptionTextbox).toBeVisible();
  });
});
