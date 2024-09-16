import { CreateTaskListDto } from "../dtos/taskList.dto";
import { ITask } from "./task";

export interface TaskList {
  readonly name: string;
  /**
   * all tasks in this list
   */
  tasks: ReadonlyArray<ITask>;
}

export type CreateTaskListFormFields = Omit<CreateTaskListDto, "ownerId">;
