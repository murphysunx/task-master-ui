export interface TaskListResponseDto {
  readonly id: number;
  readonly name: string;
}

export type CreateTaskListDto = {
  name: string;
  ownerId: number;
};
