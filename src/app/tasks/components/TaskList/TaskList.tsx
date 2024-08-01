import React from "react";
import { observer } from "mobx-react-lite";
import TaskListStore from "../../stores/TaskListStore";

interface TaskListProps {
  store: TaskListStore;
}

export const TaskListView: React.FC<TaskListProps> = observer(({ store }) => {
  return (
    <div>
      <h1>{store.name}</h1>
      <p>
        {store.nonCompletedTasksCount}{" "}
        {store.nonCompletedTasksCount === 1 ? "task" : "tasks"} remaining
      </p>
      {store.tasks.length === 0 ? (
        <p>Add your first task</p>
      ) : (
        <>
          <ul>
            {store.displayedTasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
          {store.showAllButtonVisible && (
            <button onClick={() => store.toggleShowAll()}>Show All</button>
          )}
        </>
      )}
    </div>
  );
});
