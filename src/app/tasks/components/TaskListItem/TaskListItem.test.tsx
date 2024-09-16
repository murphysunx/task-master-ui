import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { GeneralTaskList } from "../../models/generalTaskList/generalTaskList";
import Task from "../../models/task/task";
import TaskListItem from "./TaskListItem";

describe("TaskListItem", () => {
  let props: React.ComponentProps<typeof TaskListItem>;

  beforeEach(() => {
    props = {
      list: new GeneralTaskList("Inbox"),
      onClick: vi.fn(),
    };
  });

  test("Should have list name", () => {
    render(<TaskListItem {...props} />);
    const label = screen.queryByText("Inbox");
    expect(label).toBeVisible();
  });

  test("Should have list item count when empty", () => {
    render(<TaskListItem {...props} />);
    const count = screen.queryByText(0);
    expect(count).toBeVisible();
  });

  test("Should have list item count when empty", () => {
    props.list.addTask(
      new Task({
        id: 1,
        title: "Play",
        userId: 1,
      })
    );
    render(<TaskListItem {...props} />);
    const count = screen.queryByText(1);
    expect(count).toBeVisible();
  });

  test("Should call onClick when clicked", async () => {
    render(<TaskListItem {...props} />);
    const button = screen.queryByRole("button");
    expect(button).toBeVisible();
    act(() => fireEvent.click(button!));
    await waitFor(() => {
      expect(props.onClick).toHaveBeenCalledOnce();
    });
  });
});
