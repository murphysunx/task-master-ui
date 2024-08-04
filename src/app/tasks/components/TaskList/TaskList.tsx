import { observer } from "mobx-react-lite";
import React from "react";
import TaskListStore from "../../stores/taskListStore";
import TaskCard from "../TaskCard/TaskCard";

interface TaskListProps {
  store: TaskListStore;
}

export const TaskListView: React.FC<TaskListProps> = observer(({ store }) => {
  return (
    <div>
      <h1>{store.listName}</h1>
      <p>{store.todoMessage}</p>
      {store.allTasks.length === 0 ? (
        <p>Add your first task</p>
      ) : (
        <>
          <ul>
            {store.displayedTasks.map((task) => (
              <li key={task.id}>
                <TaskCard task={task} />
              </li>
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
