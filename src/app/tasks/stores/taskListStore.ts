import { makeAutoObservable } from "mobx";
import { ITask } from "../interfaces/task.interface";
import { ITaskList } from "../interfaces/taskList.interface";

export default class TaskListStore {
  id: string;
  name: string;
  tasks: ITask[] = [];
  showAll: boolean = false;

  constructor(taskList: ITaskList) {
    this.id = taskList.id;
    this.name = taskList.name;
    makeAutoObservable(this);
  }

  get nonCompletedTasksCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  get emptyMessage(): string {
    return this.tasks.length === 0 ? "Add your first task" : "";
  }

  get displayedTasks(): ITask[] {
    const sortedTasks = this.tasks
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
    const nonCompletedTasks = sortedTasks.filter((task) => !task.completed);
    const completedTasks = sortedTasks.filter((task) => task.completed);

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
}
