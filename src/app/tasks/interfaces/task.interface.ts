export interface ITask {
  id: number;
  title: string;
  description?: string | null;
  completed?: boolean | null;
  listId?: number | null;
}

export interface Toggleable {
  toggle(): void;
}
