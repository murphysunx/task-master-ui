export interface ITask {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
  listId?: number;
}
