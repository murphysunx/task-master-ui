import { Meta, StoryObj } from "@storybook/react";
import TaskListStore from "../../stores/TaskListStore";
import { TaskListView } from "./TaskList";

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
      store.addTask({ id: "1", title: "Single Task", completed: false });
      return store;
    })(),
  },
};

// Multiple Tasks
export const MultipleTasks: Story = {
  args: {
    store: (() => {
      const store = new TaskListStore("Multiple Tasks List View");
      store.addTask({ id: "1", title: "Task 1", completed: false });
      store.addTask({ id: "2", title: "Task 2", completed: false });
      store.addTask({ id: "3", title: "Task 3", completed: true });
      store.addTask({ id: "4", title: "Task 4", completed: false });
      store.addTask({ id: "5", title: "Task 5", completed: true });
      store.addTask({ id: "6", title: "Task 6", completed: false });
      return store;
    })(),
  },
};

// Tasks with Show All Button
export const TasksWithShowAll: Story = {
  args: {
    store: (() => {
      const store = new TaskListStore("Tasks with Show All Button View");
      store.addTask({ id: "1", title: "Task 1", completed: false });
      store.addTask({ id: "2", title: "Task 2", completed: false });
      store.addTask({ id: "3", title: "Task 3", completed: false });
      store.addTask({ id: "4", title: "Task 4", completed: false });
      store.addTask({ id: "5", title: "Task 5", completed: false });
      store.addTask({ id: "6", title: "Task 6", completed: false });
      store.addTask({ id: "7", title: "Task 7", completed: false });
      return store;
    })(),
  },
};
