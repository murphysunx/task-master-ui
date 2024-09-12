import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useCallback, useContext } from "react";
import { TaskStoreContext } from "../../contexts/taskStore";
import { TaskUIStoreContext } from "../../contexts/taskUIStore";
import { CreateTaskDto, UpdateTaskDto } from "../../dtos/task.dto";
import Task from "../../models/task";
import { UserTaskList } from "../../models/userTaskList";
import TaskListFocusPanel from "../TaskListFocusPanel/TaskListFocusPanel";
import TaskListForm from "../TaskListForm/TaskListForm";
import TaskListItem from "../TaskListItem/TaskListItem";
import { toJS } from "mobx";

const TaskContainer = () => {
  const taskUIStore = useContext(TaskUIStoreContext);
  const taskStore = useContext(TaskStoreContext);

  const createTaskForList = useCallback(
    async (title: string) => {
      const listId =
        taskUIStore.focusedTaskList instanceof UserTaskList
          ? taskUIStore.focusedTaskList.id
          : void 0;
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          userId: 1,
          title,
          listId,
        } satisfies CreateTaskDto),
      });
      if (!response.ok) {
        throw new Error(
          `Fail to create a task for ${taskUIStore.focusedTaskList.name} list`
        );
      }
      const data = await response.json();
      const task = new Task(data);
      taskUIStore.focusedTaskList.addTask(task);
      return task;
    },
    [taskUIStore.focusedTaskList]
  );

  const focusTask = useCallback(
    (value: Task) => {
      taskUIStore.focusedTask = value;
    },
    [taskUIStore]
  );

  const toggleTask = useCallback(async (task: Task) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !task.completed,
      } satisfies UpdateTaskDto),
    });
    if (!response.ok) {
      throw new Error("Fail to toggle a task");
    }
    task.completed = !task.completed;
  }, []);

  const updateTaskTitle = useCallback(async (newTitle: string, task: Task) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: newTitle,
      } satisfies UpdateTaskDto),
    });
    if (!response.ok) {
      throw new Error("Fail to update a task's title");
    }
    task.title = newTitle;
  }, []);

  const updateTaskDescription = useCallback(
    async (newDescription: string, task: Task) => {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          description: newDescription,
        } satisfies UpdateTaskDto),
      });
      if (!response.ok) {
        throw new Error("Fail to update a task's description");
      }
      task.description = newDescription;
    },
    []
  );

  const deleteTask = useCallback(
    async (task: Task) => {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Fail to delete a task");
      }
      taskStore.removeTaskFromList(task);
      if (taskUIStore.focusedTask === task) {
        taskUIStore.focusedTask = null;
      }
    },
    [taskStore, taskUIStore]
  );

  return (
    <Flex gap={10}>
      <Box>
        <Flex direction={"column"} gap={4}>
          <Flex justifyContent={"space-between"}>
            <Heading size={"md"}>{taskUIStore.focusedTaskList.name}</Heading>
            <Text>{taskUIStore.focusedTaskList.tasks.length}</Text>
          </Flex>
          <TaskListForm createTaskForList={createTaskForList} />
          <Box mb={2}>
            {taskUIStore.focusedTaskList.tasks.length === 0 ? (
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Text>Add your first task</Text>
              </Flex>
            ) : (
              <>
                <ul>
                  {taskUIStore.focusedTaskList.tasks.map((task) => (
                    <li key={task.id}>
                      <TaskListItem
                        task={task.toJS()}
                        focusTask={() => focusTask(task)}
                        toggleTask={() => toggleTask(task)}
                        updateTaskTitle={(title: string) =>
                          updateTaskTitle(title, task)
                        }
                        deleteTask={() => deleteTask(task)}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Box>
        </Flex>
      </Box>
      <Box>
        <Divider orientation="vertical" />
      </Box>
      {taskUIStore.focusedTask && (
        <Box>
          <TaskListFocusPanel
            task={taskUIStore.focusedTask.toJS()}
            toggleTask={() => toggleTask(taskUIStore.focusedTask!)}
            updateTaskTitle={(title: string) =>
              updateTaskTitle(title, taskUIStore.focusedTask!)
            }
            updateTaskDescription={(description: string) =>
              updateTaskDescription(description, taskUIStore.focusedTask!)
            }
          />
        </Box>
      )}
    </Flex>
  );
};

export default observer(TaskContainer);
