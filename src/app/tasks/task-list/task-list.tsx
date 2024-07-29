import pluralize from "@/app/utils/pluralize";
import { partition } from "lodash";
import { useState } from "react";
import TaskCard from "../task-card";
import { Task } from "../task.interface";

const MAX_TASKS_DISPLAYED = 5;

export default function TaskList({
  title,
  tasks,
}: {
  title: string;
  tasks: Task[];
}) {
  const [showAll, setShowAll] = useState(false);
  // sort tasks by completed status and then by title
  const sortedTasks = tasks.sort((a, b) => {
    return a.completed === b.completed
      ? a.title.localeCompare(b.title)
      : a.completed
      ? 1
      : -1;
  });
  const todoCounts = sortedTasks.filter((task) => !task.completed).length;

  return (
    <div data-testid={"task-list-" + title}>
      <div data-testid="task-list-title">
        {title}
        <span data-testid="task-list-counter">
          {todoCounts + " " + pluralize(todoCounts, "task", "tasks")}
        </span>
      </div>
      <div>
        {tasks.length === 0 && <div>Add your first task</div>}
        {tasks.length > 0 &&
          tasks
            .slice(0, showAll ? tasks.length : MAX_TASKS_DISPLAYED)
            .map((task, index) => {
              return (
                <div
                  data-testid={"task-list-item-" + index}
                  key={title + "-" + index}
                >
                  <li>
                    <TaskCard task={task} />
                  </li>
                </div>
              );
            })}
        {tasks.length > MAX_TASKS_DISPLAYED && !showAll && (
          <button
            data-testid="task-list-show-all-btn"
            onClick={() => {
              setShowAll(true);
            }}
          >
            show all
          </button>
        )}
      </div>
    </div>
  );
}
