"use client";

import { Box, Divider } from "@chakra-ui/react";
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
    <Box className="flex gap-10">
      <TaskListView store={taskListStore} />
      <Box>
        <Divider orientation="vertical" />
      </Box>
      <Box className="flex-grow h-full">
        <TaskListFocusPanel listStore={taskListStore} />
      </Box>
    </Box>
  );
}
