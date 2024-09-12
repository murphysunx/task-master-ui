import { CloseIcon } from "@chakra-ui/icons";
import { Checkbox, IconButton } from "@chakra-ui/react";
import React from "react";
import { ITask } from "../../types/task";
import EditableTaskTitle from "../EditableTaskTitle/EditableTaskTitle";

interface TaskListItemProps {
  task: ITask;
  /**
   * focus on a task
   * @param task a task
   * @returns
   */
  focusTask: () => void;
  /**
   * toggle the completion status of a task
   * @param task a task
   * @returns
   */
  toggleTask: () => Promise<void>;
  /**
   * update a task's title
   * @param title new title
   * @param task a task
   * @returns
   */
  updateTaskTitle: (newTitle: string) => Promise<void>;
  /**
   * delete a task
   * @param task a task
   * @returns
   */
  deleteTask: () => Promise<void>;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  focusTask,
  toggleTask,
  updateTaskTitle,
  deleteTask,
}) => {
  return (
    <div
      className="hover:bg-sky-100 shadow-md p-4 border-b border-solid border-gray-700 flex items-center gap-2"
      onClick={($event) => {
        focusTask();
      }}
    >
      {/* need to wrap checkbox in a div because needs to stop click event propagation */}
      <div className="flex" onClick={($event) => $event.stopPropagation()}>
        <Checkbox
          isChecked={!!task.completed}
          onChange={($event) => {
            toggleTask();
          }}
        />
      </div>
      <div className="flex-grow">
        <EditableTaskTitle task={task} updateTaskTitle={updateTaskTitle} />
      </div>
      <IconButton
        className="hover:text-red-600"
        aria-label="Delete Task"
        variant="ghost"
        icon={<CloseIcon />}
        onClick={($event) => {
          deleteTask();
        }}
      />
    </div>
  );
};

export default TaskListItem;
