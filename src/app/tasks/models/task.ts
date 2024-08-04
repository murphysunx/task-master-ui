import { makeAutoObservable } from "mobx";
import { ITask } from "../interfaces/task.interface";

export default class Task implements ITask {
  id!: string;
  title!: string;
  description?: string | undefined;
  completed?: boolean | undefined;

  constructor(task: ITask) {
    makeAutoObservable(this);
    Object.assign(this, task);
  }
}
