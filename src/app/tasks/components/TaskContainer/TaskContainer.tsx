import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { TaskListAbs } from "../../abstracts/taskList";
import { TaskResponseDto, UpdateTaskDto } from "../../dtos/task.dto";
import Task from "../../models/task";
import TaskDetailPanel from "../TaskDetailPanel/TaskDetailPanel";
import TaskListForm from "../TaskListForm/TaskListForm";
import TaskListItem from "../TaskListItem/TaskListItem";

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
    <Flex gap={10}>
      <Box>
        <Flex direction={"column"} gap={4}>
          <Flex justifyContent={"space-between"}>
            <Heading size={"md"}>{taskList.name}</Heading>
            <Text>{taskList.tasks.length}</Text>
          </Flex>
          <TaskListForm
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
                      <TaskListItem
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
      {focusedTask && (
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
