import { makeAutoObservable } from "mobx";
import { ITaskList } from "../interfaces/taskList.interface";

export default class TaskList implements ITaskList {
  id!: string;
  name!: string;
  showAll: boolean;

  constructor(taskList: ITaskList) {
    makeAutoObservable(this);
    Object.assign(this, taskList);
    this.showAll = false;
  }
}
