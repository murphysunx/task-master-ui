import { partition } from "lodash";
import { makeAutoObservable } from "mobx";
import { createTask } from "../apis/create-task";
import { DEFAULT_MAX_TASK_LIST_ITEM } from "../consts/default-max-task-list-item";
import { EMPTY_LIST_MESSAGE } from "../consts/empty-list-message";
import { ITask } from "../interfaces/task.interface";

export default class TaskListStore {
  public readonly id: number | undefined;
  private name: string;
  private tasks: ITask[] = [];
  showAll: boolean = false;

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

  get displayedTasks(): ITask[] {
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
    this.tasks.push(task);
  }

  async createTask(title: string, description?: string) {
    const created = await createTask(title, description, this.id);
    this.addTask(created);
    return created;
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
