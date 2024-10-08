import { action, computed, makeObservable, observable } from "mobx";
import { TaskListAbs } from "../../abstracts/taskList";
import { TaskListResponseDto } from "../../dtos/taskList.dto";

export class UserTaskList extends TaskListAbs implements TaskListResponseDto {
  readonly id: number;

  constructor(taskList: TaskListResponseDto) {
    super(taskList.name);
    this.id = taskList.id;
    makeObservable(this, {
      name: observable,
      taskMap: observable,
      addTask: action,
      removeTask: action,
      tasks: computed,
      empty: action,
      update: action,
    });
  }

  update(taskList: TaskListResponseDto) {
    this.name = taskList.name;
  }
}
