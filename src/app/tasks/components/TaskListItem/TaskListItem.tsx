import { CloseIcon } from "@chakra-ui/icons";
import { Checkbox, IconButton } from "@chakra-ui/react";

import { observer } from "mobx-react-lite";
import React from "react";
import Task from "../../models/task";
import TaskListStore from "../../stores/taskListStore";
import EditableTaskTitle from "../EditableTaskTitle/EditableTaskTitle";

interface TaskListItemProps {
  listStore: TaskListStore;
  task: Task;
  showDescription?: boolean;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  listStore,
  task,
  showDescription = false,
}) => {
  return (
    <div
      data-testid={`task-${task.id}-container`}
      className="hover:bg-sky-100 shadow-md p-4 border-b border-solid border-gray-700 flex items-center gap-2"
      onClick={($event) => {
        listStore.focusTask(task);
      }}
    >
      {/* need to wrap checkbox in a div because needs to stop click event propagation */}
      <div className="flex" onClick={($event) => $event.stopPropagation()}>
        <Checkbox
          isChecked={!!task.completed}
          onChange={($event) => {
            task.toggle();
          }}
        />
      </div>
      <div className="flex-grow">
        <EditableTaskTitle task={task} />
        {showDescription && task.description && (
          <p
            className="text-gray-600 mt-2"
            data-testid={`task-${task.id}-description`}
          >
            {task.description}
          </p>
        )}
      </div>
      <IconButton
        data-testid={`task-${task.id}-delete-button`}
        className="hover:text-red-600"
        aria-label="Delete Task"
        variant="ghost"
        icon={<CloseIcon />}
        onClick={($event) => {
          listStore.deleteTask(task);
        }}
      />
    </div>
  );
};

export default observer(TaskListItem);
