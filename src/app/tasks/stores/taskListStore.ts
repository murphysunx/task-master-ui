import { partition } from "lodash";
import { makeAutoObservable } from "mobx";
import { DEFAULT_MAX_TASK_LIST_ITEM } from "../consts/DEFAULT_MAX_TASK_LIST_ITEM";
import { EMPTY_LIST_MESSAGE } from "../consts/EMPTY_LIST_MESSAGE";
import { ITask } from "../interfaces/task.interface";
import Task from "../models/task";

export default class TaskListStore {
  public readonly id: number | undefined;
  private name: string;
  private tasks: Task[] = [];
  showAll: boolean = false;

  error?: string;

  constructor(name: string, taskListId?: number) {
    this.id = taskListId;
    this.name = name;
    makeAutoObservable(this);
  }

  get todoCount() {
    return this.tasks.filter((task) => !task.completed).length;
  }

  get emptyMessage(): string {
    return this.tasks.length === 0 ? EMPTY_LIST_MESSAGE : "";
  }

  get displayedTasks(): Task[] {
    const sortedTasks = this.tasks
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
    const [nonCompletedTasks, completedTasks] = partition(
      sortedTasks,
      (task) => !task.completed
    );
    const allTasks = [...nonCompletedTasks, ...completedTasks];
    return this.showAll
      ? allTasks
      : allTasks.slice(0, DEFAULT_MAX_TASK_LIST_ITEM);
  }

  get showAllButtonVisible(): boolean {
    return this.tasks.length > DEFAULT_MAX_TASK_LIST_ITEM && !this.showAll;
  }

  addTask(task: ITask): void {
    const existing = this.tasks.find((t) => t.id === task.id);
    if (existing) {
      // merge task
      existing.title = task.title;
      existing.description = task.description;
      existing.completed = task.completed;
    } else {
      this.tasks.push(new Task(task));
    }
  }

  async loadTasksFromServer(): Promise<void> {
    const response = await fetch("/api/tasks", { method: "get" });
    if (response.ok) {
      const tasks: ITask[] = await response.json();
      tasks.forEach((task) => this.addTask(task));
    } else {
      this.error = "Fail to load tasks from the server";
    }
  }

  async createTask(title: string, description?: string) {
    const response = await fetch("/api/tasks", {
      method: "post",
      body: JSON.stringify({
        title,
        description,
        userId: 1,
      }),
    });
    if (response.ok) {
      const createdTask: ITask = await response.json();
      this.addTask(createdTask);
      return createdTask;
    } else {
      this.error = "Fail to create the new task";
    }
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  get allTasks() {
    return this.tasks;
  }

  get listName() {
    return this.name;
  }
}
