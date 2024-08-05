import { Input } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import TaskListStore from "../../stores/taskListStore";
import TaskCard from "../TaskCard/TaskCard";

interface TaskListProps {
  store: TaskListStore;
}

export const TaskListView: React.FC<TaskListProps> = observer(({ store }) => {
  const [draftTaskTitle, setDraftTaskTitle] = useState("");

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between">
          <h1 className="text-xl mb-2">{store.listName}</h1>
          <div data-testid={`${store.id}-todo-count`}>{store.todoCount}</div>
        </div>
        <form
          onSubmit={async () => {
            if (draftTaskTitle.length > 0) {
              await store.createTask(draftTaskTitle);
              setDraftTaskTitle("");
            }
          }}
        >
          <Input
            data-testid={`${store.listName}-add-input`}
            name="full_name"
            type="text"
            className="w-full bg-transparent h-10"
            placeholder="+ Add task"
            onChange={(event) => {
              event.preventDefault();
              setDraftTaskTitle(event.target.value);
            }}
          />
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
                <li key={task.id}>
                  <TaskCard task={task} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {store.showAllButtonVisible && (
        <div className="flex justify-center">
          <button onClick={() => store.toggleShowAll()}>Show All</button>
        </div>
      )}
    </div>
  );
});
