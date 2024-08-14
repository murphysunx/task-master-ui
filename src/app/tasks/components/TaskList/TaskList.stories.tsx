import { Meta, StoryObj } from "@storybook/react";
import { generateMockTasks } from "../../mocks/generate-mock-task";
import TaskListStore from "../../stores/taskListStore";
import TaskListView from "./TaskList";

const meta: Meta<typeof TaskListView> = {
  component: TaskListView,
} satisfies Meta<typeof TaskListView>;

export default meta;

type Story = StoryObj<typeof meta>;

// Empty TaskListView
export const EmptyTaskListView: Story = {
  args: {
    store: new TaskListStore("Empty Task List View"),
  },
};

// Single Task
export const SingleTask: Story = {
  args: {
    store: (() => {
      const store = new TaskListStore("Single Task List View");
      store.addTask({ id: 1, title: "Single Task", completed: false });
      return store;
    })(),
  },
};

// Multiple Tasks
export const MultipleTasks: Story = {
  args: {
    store: (() => {
      const store = new TaskListStore("Multiple Tasks List View");
      const tasks = generateMockTasks(6);
      tasks.forEach((t) => store.addTask(t));
      return store;
    })(),
  },
};

// Tasks with Show All Button
export const TasksWithShowAll: Story = {
  args: {
    store: (() => {
      const store = new TaskListStore("Tasks with Show All Button View");
      const tasks = generateMockTasks(7);
      tasks.forEach((t) => store.addTask(t));
      return store;
    })(),
  },
};
