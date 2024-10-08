import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { TaskListAbs } from "../../abstracts/taskList";
import { TaskResponseDto, UpdateTaskDto } from "../../dtos/task.dto";
import Task from "../../models/task/task";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import TaskDetailPanel from "../TaskDetailPanel/TaskDetailPanel";
import TaskItem from "../TaskItem/TaskItem";

type TaskContainerProps = {
  taskList: TaskListAbs;
  /**
   * create a new task
   * @param title new task title
   * @returns
   */
  createTaskForList: (
    title: string,
    taskList: TaskListAbs
  ) => Promise<TaskResponseDto>;
  /**
   * update a task's detail
   * @param taskId task id
   * @param updates task updates
   * @returns
   */
  updateTask: (task: Task, updates: UpdateTaskDto) => Promise<void>;
  /**
   * delete a task
   * @param task a task
   * @returns
   */
  deleteTaskFromList: (task: Task, list: TaskListAbs) => Promise<void>;
};

/**
 * a container that shows all tasks in a task list
 */
const TaskContainer = ({
  taskList,
  createTaskForList,
  updateTask,
  deleteTaskFromList: deleteTask,
}: TaskContainerProps) => {
  const [focusedTask, setFocusedTask] = useState<Task | null>(null);

  const toggleTask = useCallback(
    async (task: Task) => {
      return updateTask(task, { completed: !task.completed });
    },
    [updateTask]
  );

  const updateTaskTitle = useCallback(
    async (task: Task, newTitle: string) => {
      return updateTask(task, { title: newTitle });
    },
    [updateTask]
  );

  const updateTaskDescription = useCallback(
    async (task: Task, newDescription: string) => {
      return updateTask(task, { description: newDescription });
    },
    [updateTask]
  );

  return (
    <Flex gap={4} flexGrow={1}>
      <Box minWidth={"30%"}>
        <Flex direction={"column"} gap={4}>
          <Flex justifyContent={"space-between"}>
            <Heading size={"md"}>{taskList.name}</Heading>
            <Text>{taskList.tasks.length}</Text>
          </Flex>
          <CreateTaskForm
            createTaskForList={(title: string) =>
              createTaskForList(title, taskList)
            }
          />
          <Box mb={2}>
            {taskList.tasks.length === 0 ? (
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Text>Add your first task</Text>
              </Flex>
            ) : (
              <>
                <ul>
                  {taskList.tasks.map((task) => (
                    <li key={task.id}>
                      <TaskItem
                        task={task.toJS()}
                        focusTask={() => setFocusedTask(task)}
                        toggleTask={() => toggleTask(task)}
                        updateTaskTitle={(title: string) =>
                          updateTaskTitle(task, title)
                        }
                        deleteTask={async () => {
                          await deleteTask(task, taskList);
                          if (task === focusedTask) {
                            setFocusedTask(null);
                          }
                        }}
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
      {focusedTask && taskList.containTask(focusedTask) && (
        <Box>
          <TaskDetailPanel
            task={focusedTask}
            toggleTask={() => toggleTask(focusedTask)}
            updateTaskTitle={(title: string) =>
              updateTaskTitle(focusedTask, title)
            }
            updateTaskDescription={(description: string) =>
              updateTaskDescription(focusedTask, description)
            }
          />
        </Box>
      )}
    </Flex>
  );
};

export default observer(TaskContainer);
