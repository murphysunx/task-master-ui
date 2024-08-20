import { makeAutoObservable } from "mobx";
import { ITask, Toggleable } from "../interfaces/task.interface";

export default class Task implements Toggleable {
  id!: number;
  title!: string;
  description: string | null = null;
  completed: boolean | null = null;
  listId: number | null = null;

  constructor(task: ITask) {
    Object.assign(this, task);
    makeAutoObservable(this);
  }

  toggle() {
    this.completed = !this.completed;
    return this.patchTask({ completed: this.completed });
  }

  delete() {
    return fetch(`/api/tasks/${this.id}`, {
      method: "DELETE",
    }).catch((reason) => {
      console.error("fail to delete task");
    });
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
    return this.patchTask({ title: newTitle });
  }

  updateDescription(newDescription: string) {
    this.description = newDescription;
    return this.patchTask({
      description: this.description,
    });
  }

  private patchTask(payload: Omit<Partial<ITask>, "id">): Promise<ITask> {
    // sync
    return fetch(`/api/tasks/${this.id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((reason) => console.error(`fail to update task`));
  }
}
