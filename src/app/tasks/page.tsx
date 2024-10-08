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
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { TaskListAbs } from "./abstracts/taskList";
import TaskContainer from "./components/TaskContainer/TaskContainer";
import TaskListContainer from "./components/TaskListContainer/TaskListContainer";
import {
  CreateTaskDto,
  TaskResponseDto,
  TasksWithListsDto,
  UpdateTaskDto,
} from "./dtos/task.dto";
import { CreateTaskListDto, TaskListResponseDto } from "./dtos/taskList.dto";
import { GeneralTaskList } from "./models/generalTaskList/generalTaskList";
import Task from "./models/task/task";
import { UserTaskList } from "./models/userTaskList/userTaskList";
import taskStore from "./stores/taskStore";
import {
  CreateTaskListFormFields,
  UpdateTaskListFormFields,
} from "./types/taskList";

const TaskHomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeList, setActiveList] = useState<GeneralTaskList | UserTaskList>(
    taskStore.inbox
  );

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

  const createTaskList = useCallback(
    async (values: CreateTaskListFormFields) => {
      const response = await fetch("/api/tasks/lists", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          ownerId: 1,
        } satisfies CreateTaskListDto),
      });
      if (!response) {
        throw new Error(`Fail to create a task list named ${name}`);
      }
      const list: TaskListResponseDto = await response.json();
      const taskList = new UserTaskList(list);
      taskStore.addUserList(taskList);
      setActiveList(taskList);
      return taskList;
    },
    []
  );

  const updateUserTaskList = useCallback(
    async (userTaskList: UserTaskList, values: UpdateTaskListFormFields) => {
      const response = await fetch(`/api/tasks/lists/${userTaskList.id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`Fail to update a task list`);
      }
      const dto = await response.json();
      userTaskList.update(dto);
    },
    []
  );

  const deleteUserTaskList = useCallback(
    async (userTaskList: UserTaskList) => {
      const response = await fetch(`/api/tasks/lists/${userTaskList.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Fail to delete a task list`);
      }
      taskStore.removeUserList(userTaskList);
      if (userTaskList === activeList) {
        setActiveList(taskStore.inbox);
      }
    },
    [activeList]
  );

  const createTaskForList = useCallback(
    async (title: string, list: GeneralTaskList | UserTaskList) => {
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        body: JSON.stringify({
          title,
          listId: list instanceof GeneralTaskList ? void 0 : list.id,
          userId: 1,
        } satisfies CreateTaskDto),
      });
      if (!response.ok) {
        throw new Error(`Fail to create a task`);
      }
      const dto = await response.json();
      const task = new Task(dto);
      activeList.addTask(task);
      return dto;
    },
    [activeList]
  );

  const updateTask = useCallback(async (task: Task, updates: UpdateTaskDto) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(updates satisfies UpdateTaskDto),
    });
    if (!response.ok) {
      throw new Error(`Fail to update a task`);
    }
    const dto: TaskResponseDto = await response.json();
    task.update(dto);
  }, []);

  const deleteTaskFromList = useCallback(
    async (task: Task, list: TaskListAbs) => {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Fail to delete a task`);
      }
      list.removeTask(task);
    },
    []
  );

  useEffect(() => {
    setIsLoading(true);
    setError("");
    fetchData()
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [fetchData]);

  return (
    <Flex gap={4} height={"full"}>
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
            <>
              <Box minWidth={"15%"}>
                <TaskListContainer
                  activeTaskList={activeList}
                  taskLists={taskStore.taskLists}
                  clickTaskList={setActiveList}
                  createTaskList={createTaskList}
                  updateUserTaskList={updateUserTaskList}
                  deleteUserTaskList={deleteUserTaskList}
                />
              </Box>
              <Box>
                <Divider orientation="vertical" />
              </Box>
              <TaskContainer
                taskList={activeList}
                createTaskForList={createTaskForList}
                updateTask={updateTask}
                deleteTaskFromList={deleteTaskFromList}
              />
            </>
          )}
        </>
      )}
    </Flex>
  );
};

export default observer(TaskHomePage);
