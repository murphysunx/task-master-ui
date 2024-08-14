import { Meta, StoryObj } from "@storybook/react";
import TaskListStore from "../../stores/taskListStore";
import TaskListForm from "./TaskListForm";

const meta: Meta<typeof TaskListForm> = {
  component: TaskListForm,
} satisfies Meta<typeof TaskListForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NormalTaskListForm: Story = {
  args: {
    store: new TaskListStore("All"),
  },
};
