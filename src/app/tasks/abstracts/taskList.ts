import Task from "../models/task/task";
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
  /**
   * check if the task list contains a specific task
   * @param task a task
   */
  containTask(task: ITask): boolean;
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

  containTask(task: ITask): boolean {
    return this.taskMap.has(task.id);
  }
}
