import type { Meta, StoryObj } from "@storybook/react";

import TaskCard from "./task-card";

const meta = {
  component: TaskCard,
} satisfies Meta<typeof TaskCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Todo: Story = {
  args: {
    task: {
      id: "1",
      title: "Task 1",
    },
  },
};

export const Completed: Story = {
  args: {
    task: {
      id: "1",
      title: "Task 1",
      completed: true,
      description: "sflwsjlfkjsldf",
    },

    showDescription: false,
  },
};
