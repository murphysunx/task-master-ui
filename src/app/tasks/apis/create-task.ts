import { ITask } from "../interfaces/task.interface";

export const CREATE_TASK_ENDPOINT_BASE = "http://localhost:3000/tasks/";

function generateCreateTaskEndpoint(taskListId?: string) {
  return taskListId
    ? CREATE_TASK_ENDPOINT_BASE + taskListId
    : CREATE_TASK_ENDPOINT_BASE;
}

export async function createTask(
  title: string,
  description?: string,
  taskListId?: string
) {
  const endpoint = generateCreateTaskEndpoint(taskListId);
  const response = await fetch(endpoint, {
    method: "post",
    body: JSON.stringify({
      title,
      description,
      taskListId,
    }),
  });
  if (!response.ok) {
    throw new Error("failing creating task");
  }

  const created: ITask = await response.json();
  return created;
}
