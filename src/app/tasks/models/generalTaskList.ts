import { action, computed, makeObservable, observable } from "mobx";
import { TaskListAbs } from "../abstracts/taskList";

export class GeneralTaskList extends TaskListAbs {
  constructor(name: string) {
    super(name);
    makeObservable(this, {
      name: observable,
      taskMap: observable,
      addTask: action,
      removeTask: action,
      tasks: computed,
      empty: action,
    });
  }
}
