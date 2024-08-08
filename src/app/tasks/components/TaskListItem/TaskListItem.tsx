import { Checkbox } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { ITask } from "../../interfaces/task.interface";

interface TaskListItemProps {
  task: ITask;
  showDescription?: boolean;
}

const TaskListItem: React.FC<TaskListItemProps> = observer(
  ({ task, showDescription = false }) => {
    return (
      <div className="shadow-md p-4 border-b border-solid border-gray-700 flex items-center gap-2">
        <Checkbox
          checked={task.completed}
          className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
        />
        <div className="flex flex-col ">
          <h2
            className="text-lg font-semibold text-gray-800"
            data-testid={`task-${task.id}-title`}
          >
            {task.title}
          </h2>
          {showDescription && task.description && (
            <p
              className="text-gray-600 mt-2"
              data-testid={`task-${task.id}-description`}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default TaskListItem;
