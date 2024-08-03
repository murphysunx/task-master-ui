import { partition } from "lodash";
import { makeAutoObservable } from "mobx";
import { ITask } from "../interfaces/task.interface";
import pluralize from "@/app/utils/pluralize";

export default class TaskListStore {
  private name: string;
  private tasks: ITask[] = [];
  showAll: boolean = false;

  constructor(name: string) {
    this.name = name;
    makeAutoObservable(this);
  }

  get todoMessage() {
    const todos = this.tasks.filter((t) => !t.completed);
    return `${todos.length} ${pluralize(todos.length, "task", "tasks")} remaining`;
  }

  get emptyMessage(): string {
    return this.tasks.length === 0 ? "Add your first task" : "";
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
    return this.showAll ? allTasks : allTasks.slice(0, 5);
  }

  get showAllButtonVisible(): boolean {
    return this.tasks.length > 5 && !this.showAll;
  }

  addTask(task: ITask): void {
    this.tasks.push(task);
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
