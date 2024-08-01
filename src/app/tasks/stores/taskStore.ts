import { makeAutoObservable } from "mobx";
import TaskListStore from "./TaskListStore";

class TaskStore {
  taskLists: Map<string, TaskListStore> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  // Add a new task list
  addTaskList(id: string, name: string): void {
    if (!this.taskLists.has(id)) {
      this.taskLists.set(id, new TaskListStore({ id, name }));
    }
  }

  // Remove a task list by ID
  removeTaskList(id: string): void {
    this.taskLists.delete(id);
  }

  // Get a task list by ID
  getTaskList(id: string): TaskListStore | undefined {
    return this.taskLists.get(id);
  }

  // Get all task lists
  get allTaskLists(): TaskListStore[] {
    return Array.from(this.taskLists.values());
  }
}

export default TaskStore;
