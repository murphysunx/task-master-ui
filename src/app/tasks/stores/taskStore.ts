import { computed, makeAutoObservable } from "mobx";
import { ITaskList } from "../interfaces/taskList.interface";
import TaskList from "../models/task-list";

class TaskStore {
  taskLists: TaskList[] = [];

  constructor() {
    makeAutoObservable(this, {
      getTaskListById: computed,
    });
  }

  addTaskList(taskList: ITaskList) {
    this.taskLists.push(new TaskList(taskList));
  }

  getTaskListById(id: string) {
    return this.taskLists.find((taskList) => taskList.id === id);
  }

  removeTaskList(id: string) {
    this.taskLists = this.taskLists.filter((taskList) => taskList.id !== id);
  }
}

const taskStore = new TaskStore();
export default taskStore;
