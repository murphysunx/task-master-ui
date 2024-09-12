import { action, computed, makeObservable, observable } from "mobx";
import Task from "../models/task";
import { ITask } from "../types/task";
import { TaskList } from "../types/taskList";

interface TaskListActions {
  /**
   * add a task to this list
   * @param task a task
   */
  addTask(task: ITask): void;
  /**
   * remove a task from this list
   * @param task a task
   */
  removeTask(task: ITask): void;
  /**
   * remove all tasks from this list
   */
  empty(): void;
}

export abstract class TaskListAbs implements TaskList, TaskListActions {
  taskMap: Map<number, Task> = new Map();

  constructor(public name: string) {}

  addTask(task: Task) {
    this.taskMap.set(task.id, task);
  }

  removeTask(task: Task) {
    this.taskMap.delete(task.id);
  }

  get tasks(): ReadonlyArray<Task> {
    return [...this.taskMap.values()];
  }

  empty(): void {
    this.taskMap.clear();
  }
}
