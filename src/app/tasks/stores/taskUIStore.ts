import { makeAutoObservable } from "mobx";
import { TaskListAbs } from "../abstracts/taskList";
import Task from "../models/task";
import taskStore from "./taskStore";

let instance: TaskUIStore;

class TaskUIStore {
  private task!: Task | null;
  private taskList!: TaskListAbs;

  constructor() {
    if (instance) {
      throw new Error("You can only create one instance");
    }
    instance = this;
    this.reset();
    makeAutoObservable(this);
  }

  set focusedTask(task: Task | null) {
    this.task = task;
  }

  get focusedTask(): Task | null {
    return this.task;
  }

  set focusedTaskList(list: TaskListAbs) {
    this.taskList = list;
  }

  get focusedTaskList(): TaskListAbs {
    return this.taskList;
  }

  reset() {
    this.task = null;
    this.taskList = taskStore.inbox;
  }
}

const taskUIStore = new TaskUIStore();
export default taskUIStore;
