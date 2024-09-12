"use client";

import { SpinnerIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { TaskStoreContext } from "./contexts/taskStore";
import { TaskUIStoreContext } from "./contexts/taskUIStore";
import { TasksWithListsDto } from "./dtos/task.dto";
import Task from "./models/task";
import { UserTaskList } from "./models/userTaskList";
import taskStore from "./stores/taskStore";
import taskUIStore from "./stores/taskUIStore";
import TaskListContainer from "./components/TaskListContainer/TaskListContainer";
import TaskContainer from "./components/TaskContainer/TaskContainer";
import { observer } from "mobx-react-lite";

const TaskHomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    const response = await fetch("/api/tasks", { method: "GET" });
    if (!response.ok) {
      throw new Error("Something wrong");
    } else {
      const { lists, tasks }: TasksWithListsDto = await response.json();
      lists.forEach((list) => {
        const userList = new UserTaskList(list);
        taskStore.addUserList(userList);
      });
      tasks.forEach((data) => {
        const task = new Task(data);
        taskStore.addTaskToList(task);
      });
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError("");
    fetchData()
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [fetchData]);

  return (
    <Flex gap={10} height={"full"}>
      {error && (
        <Center className="w-full">
          <IconButton
            icon={<SpinnerIcon />}
            aria-label="reload"
            onClick={fetchData}
          />
        </Center>
      )}
      {!error && (
        <>
          {isLoading && (
            <Center className="w-full">
              <Spinner />
            </Center>
          )}
          {!isLoading && (
            <TaskStoreContext.Provider value={taskStore}>
              <TaskUIStoreContext.Provider value={taskUIStore}>
                <TaskListContainer />
                <Box>
                  <Divider orientation="vertical" />
                </Box>
                <TaskContainer />
              </TaskUIStoreContext.Provider>
            </TaskStoreContext.Provider>
          )}
        </>
      )}
    </Flex>
  );
};

export default observer(TaskHomePage);
