import { NextRequest, NextResponse } from "next/server";
import { TASK_ENDPOINT } from "../../tasks/consts/TASK_ENDPOINT";
import { TaskResponseDto } from "../../tasks/dtos/task.dto";

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

  const tasks: TaskResponseDto[] = await response.json();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  function generateCreateTaskEndpoint(taskListId?: number) {
    return taskListId === void 0
      ? TASK_ENDPOINT
      : `${TASK_ENDPOINT}/${taskListId}`;
  }
  const endpoint = generateCreateTaskEndpoint();
  const payload = await request.json();
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("failing creating task");
  }
  const created: TaskResponseDto = await response.json();
  return NextResponse.json(created);
}
