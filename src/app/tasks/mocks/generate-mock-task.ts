import { faker } from "@faker-js/faker";
import { ITask } from "../interfaces/task.interface";

export function generateMockTasks(count: number, listId?: number) {
  const tasks: ITask[] = Array(count)
    .fill(0)
    .map((_) => {
      return {
        id: faker.number.int(),
        title: faker.music.songName(),
        completed: faker.datatype.boolean(),
        description: faker.location.streetAddress(),
        listId,
      };
    });
  return tasks;
}
