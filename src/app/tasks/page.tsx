"use client";

import { Box, Center, Divider, Spinner } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TaskListView from "./components/TaskList/TaskList";
import TaskListFocusPanel from "./components/TaskListFocusPanel/TaskListFocusPanel";
import TaskListStore from "./stores/taskListStore";

const TaskHomePage = () => {
  const [taskListStore] = useState(new TaskListStore("All"));

  useEffect(() => {
    taskListStore.loadTasksFromServer();
  }, [taskListStore]);

  return (
    <Box className="flex gap-10 h-full">
      {taskListStore.isLoading && (
        <Center className="w-full">
          <Spinner />
        </Center>
      )}
      {!taskListStore.isLoading && (
        <>
          <TaskListView store={taskListStore} />
          <Box>
            <Divider orientation="vertical" />
          </Box>
          <Box className="flex-grow h-full">
            <TaskListFocusPanel listStore={taskListStore} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default observer(TaskHomePage);
