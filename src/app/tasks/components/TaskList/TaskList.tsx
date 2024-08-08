import { Input } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import TaskListStore from "../../stores/taskListStore";
import TaskListItem from "../TaskListItem/TaskListItem";
import { clsx } from "clsx";

interface TaskListProps {
  store: TaskListStore;
}

export const TaskListView: React.FC<TaskListProps> = observer(({ store }) => {
  const [draftTaskTitle, setDraftTaskTitle] = useState("");

  const submit = async () => {
    console.log("submit");
    if (draftTaskTitle.length > 0) {
      await store.createTask(draftTaskTitle);
      setDraftTaskTitle("");
    }
  };

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
        <form onSubmit={submit}>
          <Input
            data-testid={`${store.listName}-add-input`}
            name="full_name"
            type="text"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            placeholder="+ Add task"
            onChange={(event) => {
              event.preventDefault();
              setDraftTaskTitle(event.target.value);
            }}
          />
          <input type="submit" hidden />
        </form>
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
                  <TaskListItem task={task} />
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
});
