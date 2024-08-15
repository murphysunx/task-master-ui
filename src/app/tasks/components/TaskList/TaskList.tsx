import { observer } from "mobx-react-lite";
import React from "react";
import TaskListStore from "../../stores/taskListStore";
import TaskListForm from "../TaskListForm/TaskListForm";
import TaskListItem from "../TaskListItem/TaskListItem";

interface TaskListProps {
  store: TaskListStore;
}

const TaskListView: React.FC<TaskListProps> = ({ store }) => {
  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between">
          <h1
            className="text-xl mb-2"
            data-testid={`task-list-${store.listName}`}
          >
            {store.listName}
          </h1>
          <div data-testid={`${store.listName}-todo-count`}>
            {store.todoCount}
          </div>
        </div>
        <TaskListForm store={store} />
      </div>
      <div className="mb-2">
        {store.allTasks.length === 0 ? (
          <div className="flex justify-center items-center min-h-96">
            <p>Add your first task</p>
          </div>
        ) : (
          <>
            <ul>
              {store.displayedTasks.map((task) => (
                <li key={task.id} data-testid={`${store.listName}-${task.id}`}>
                  <TaskListItem listStore={store} task={task} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {store.showAllButtonVisible && (
        <div className="flex justify-center">
          <button
            onClick={() => store.toggleShowAll()}
            data-testid={`${store.listName}-show-all-button`}
          >
            Show All
          </button>
        </div>
      )}
    </div>
  );
};

export default observer(TaskListView);
