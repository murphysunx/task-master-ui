import { Box, Checkbox, Flex } from "@chakra-ui/react";
import { ITask } from "../../types/task";
import EditableTaskDescription from "../EditableTaskDescription/EditableTaskDescription";
import EditableTaskTitle from "../EditableTaskTitle/EditableTaskTitle";

type TaskDetailPanelProps = {
  task: ITask;
  /**
   * toggle the completion status of a task
   * @param task a task
   * @returns
   */
  toggleTask: (task: ITask) => Promise<void>;
  /**
   * update a task's title
   * @param title new title
   * @param task a task
   * @returns
   */
  updateTaskTitle: (newTitle: string, task: ITask) => Promise<void>;
  /**
   * update a task's description
   * @param newDescription text
   * @param task a task
   * @returns
   */
  updateTaskDescription: (newDescription: string, task: ITask) => Promise<void>;
};

const TaskDetailPanel = ({
  task,
  toggleTask,
  updateTaskTitle,
  updateTaskDescription,
}: TaskDetailPanelProps) => {
  return (
    <Box>
      <Flex gap="4">
        <Checkbox
          size="lg"
          isChecked={!!task.completed}
          onChange={() => {
            toggleTask(task);
          }}
        />
        <EditableTaskTitle
          task={task}
          updateTaskTitle={updateTaskTitle}
          size="xl"
        />
      </Flex>
      <EditableTaskDescription
        task={task}
        updateTaskDescription={updateTaskDescription}
      />
    </Box>
  );
};

export default TaskDetailPanel;
