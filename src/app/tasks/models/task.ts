import { makeAutoObservable } from "mobx";
import { TaskResponseDto } from "../dtos/task.dto";

export default class Task implements TaskResponseDto {
  private _id!: number;
  private _title!: string;
  private _userId!: number;
  private _description: string | null = null;
  private _completed: boolean = false;
  private _listId: number | null = null;

  constructor(task: TaskResponseDto) {
    this._id = task.id;
    this._title = task.title;
    this._userId = task.userId;
    this._description = task.description || null;
    this._completed = task.completed || false;
    this._listId = task.listId || null;
    makeAutoObservable(this);
  }

  get id() {
    return this._id;
  }

  set title(value: string) {
    this._title = value;
  }

  get title(): string {
    return this._title;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get userId(): number {
    return this._userId;
  }

  set description(value: string) {
    this._description = value;
  }

  get description(): string | undefined {
    return this._description || void 0;
  }

  set completed(value: boolean) {
    this._completed = value;
  }

  get completed(): boolean | undefined {
    return this._completed;
  }

  set listId(value: number) {
    this._listId = value;
  }

  get listId(): number | undefined {
    return this._listId || void 0;
  }

  toJS(): TaskResponseDto {
    return {
      id: this.id,
      title: this.title,
      userId: this.userId,
      completed: this.completed,
      description: this.description,
      listId: this.listId,
    };
  }
}
