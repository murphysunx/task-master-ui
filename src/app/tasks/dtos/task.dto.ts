import { TaskListResponseDto } from "./taskList.dto";

export interface TaskResponseDto {
  readonly id: number;
  readonly title: string;
  readonly userId: number;
  readonly description?: string;
  readonly completed?: boolean;
  readonly listId?: number;
}

export type CreateTaskDto = Omit<TaskResponseDto, "id">;

export type UpdateTaskDto = Partial<Omit<TaskResponseDto, "id" | "listId">>;

export type TasksWithListsDto = {
  lists: TaskListResponseDto[];
  tasks: TaskResponseDto[];
};
