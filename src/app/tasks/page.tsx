"use client";

import { useEffect, useState } from "react";
import TaskListView from "./components/TaskList/TaskList";
import TaskListStore from "./stores/taskListStore";

export default function TaskHomePage() {
  const [taskListStore] = useState(new TaskListStore("All"));

  useEffect(() => {
    taskListStore.loadTasksFromServer();
  }, [taskListStore]);

  return <TaskListView store={taskListStore} />;
}
