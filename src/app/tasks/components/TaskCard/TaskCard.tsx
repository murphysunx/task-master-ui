import React from "react";
import Task from "../../models/task";
import { observer } from "mobx-react-lite";

interface TaskCardProps {
  task: Task;
  showDescription?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = observer(
  ({ task, showDescription = false }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
        {showDescription && task.description && (
          <p className="text-gray-600 mt-2">{task.description}</p>
        )}
      </div>
    );
  }
);

export default TaskCard;
