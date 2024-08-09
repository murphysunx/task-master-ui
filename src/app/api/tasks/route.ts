import { NextResponse } from "next/server";
import { TASK_ENDPOINT } from "../../tasks/consts/TASK_ENDPOINT";
import { ITask } from "../../tasks/interfaces/task.interface";

export async function GET(request: Request) {
  const response = await fetch(
    `${TASK_ENDPOINT}?${new URLSearchParams({ userId: "1" })}`,
    {
      method: "get",
    }
  );
  if (!response.ok) {
    throw new Error("failing getting all tasks");
  }

  const tasks: ITask[] = await response.json();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  function generateCreateTaskEndpoint(taskListId?: number) {
    return taskListId === void 0 ? TASK_ENDPOINT : TASK_ENDPOINT + taskListId;
  }
  const endpoint = generateCreateTaskEndpoint();
  const response = await fetch(endpoint, {
    method: "post",
    body: request.body,
  });
  if (!response.ok) {
    throw new Error("failing creating task");
  }

  const created: ITask = await response.json();
  return NextResponse.json(created);
}
