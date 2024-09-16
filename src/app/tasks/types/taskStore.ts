import { TaskListAbs } from "../abstracts/taskList";
import { GeneralTaskList } from "../models/generalTaskList/generalTaskList";
import Task from "../models/task/task";
import { UserTaskList } from "../models/userTaskList/userTaskList";

export interface ITaskStore {
  /**
   * all task lists sorted in a specific order
   */
  taskLists: ReadonlyArray<TaskListAbs>;
  /**
   * the inbox list
   */
  inbox: GeneralTaskList;
  /**
   * add a user list to the store
   * @param dto task list response dto
   */
  addUserList(list: UserTaskList): UserTaskList;
  /**
   * find a task list by id
   * @param id list id
   */
  findListById(id?: number): TaskListAbs | null;
  /**
   * add a task to a list
   * @param task a task
   */
  addTaskToList(task: Task): void;
  /**
   *
   * @param task a task
   */
  removeTaskFromList(task: Task): void;
  /**
   * remove all lists from the store and remove tasks in the inbox
   */
  cleanUp(): void;
}
