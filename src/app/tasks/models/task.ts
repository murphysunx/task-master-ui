import { makeAutoObservable } from "mobx";
import { ITask, Toggleable } from "../interfaces/task.interface";

export default class Task implements ITask, Toggleable {
  id!: number;
  title!: string;
  description?: string | null = null;
  completed?: boolean | null = null;

  constructor(task: ITask) {
    Object.assign(this, task);
    makeAutoObservable(this);
  }

  toggle() {
    this.completed = !this.completed;
    const payload = this.toPlain();
    // sync
    fetch(`/api/tasks/${this.id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(`updated task`, data))
      .catch((reason) => console.error(`fail to toggle task`));
  }

  delete() {
    return fetch(`/api/tasks/${this.id}`, {
      method: "DELETE",
    }).catch((reason) => {
      console.error("fail to delete task");
    });
  }

  toPlain(): ITask {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
    };
  }
}
