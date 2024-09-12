import { makeAutoObservable } from "mobx";
import { TaskListAbs } from "../abstracts/taskList";
import { GeneralTaskList } from "../models/generalTaskList";
import Task from "../models/task";
import { UserTaskList } from "../models/userTaskList";
import { ITaskStore } from "../types/taskStore";

let instance: TaskStore;

class TaskStore implements ITaskStore {
  private inboxList: GeneralTaskList;
  private userListMap: Map<number, UserTaskList>;

  constructor() {
    if (instance) {
      throw new Error("You can only create one instance");
    }
    instance = this;
    this.inboxList = new GeneralTaskList("Inbox");
    this.userListMap = new Map();
    makeAutoObservable(this);
  }

  get taskLists(): ReadonlyArray<TaskListAbs> {
    return [this.inboxList, ...this.userListMap.values()];
  }

  get inbox() {
    return this.inboxList;
  }

  addUserList(list: UserTaskList): UserTaskList {
    if (!this.userListMap.has(list.id)) {
      this.userListMap.set(list.id, list);
    }
    return this.userListMap.get(list.id)!;
  }

  addTaskToList(task: Task): void {
    const list = this.findListById(task.listId || void 0);
    list?.addTask(task);
  }

  removeTaskFromList(task: Task): void {
    const list = this.findListById(task.listId || void 0);
    list?.removeTask(task);
  }

  findListById(listId?: number): TaskListAbs | null {
    if (listId === void 0) {
      return this.inbox;
    }
    return this.userListMap.get(listId) || null;
  }

  cleanUp(): void {
    this.inboxList.empty();
    this.userListMap.clear();
  }
}

const taskStore = new TaskStore();
export default taskStore;
