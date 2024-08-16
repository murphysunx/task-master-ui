"use client";

import { Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TaskListView from "./components/TaskList/TaskList";
import TaskListFocusPanel from "./components/TaskListFocusPanel/TaskListFocusPanel";
import TaskListStore from "./stores/taskListStore";

export default function TaskHomePage() {
  const [taskListStore] = useState(new TaskListStore("All"));

  useEffect(() => {
    taskListStore.loadTasksFromServer();
  }, [taskListStore]);

  return (
    <div className="flex gap-10">
      <TaskListView store={taskListStore} />
      <div>
        <Divider orientation="vertical" />
      </div>
      <TaskListFocusPanel listStore={taskListStore} />
    </div>
  );
}
