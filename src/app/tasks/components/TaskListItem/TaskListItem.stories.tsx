import type { Meta, StoryObj } from "@storybook/react";

import Task from "../../models/task";
import TaskListStore from "../../stores/taskListStore";
import TaskListItem from "./TaskListItem";

const meta = {
  component: TaskListItem,
} satisfies Meta<typeof TaskListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const store = new TaskListStore("");

export const Todo: Story = {
  args: {
    task: new Task({
      id: 1,
      title: "Task 1",
    }),
    listStore: store,
  },
};

export const Completed: Story = {
  args: {
    task: new Task({
      id: 1,
      title: "Task 1",
      completed: true,
      description: "sflwsjlfkjsldf",
    }),
    listStore: store,
  },
};
