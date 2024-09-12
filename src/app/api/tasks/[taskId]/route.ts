import { TASK_ENDPOINT } from "@/app/tasks/consts/TASK_ENDPOINT";
import { TaskResponseDto } from "@/app/tasks/dtos/task.dto";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  const payload = await request.json();
  const response = await fetch(`${TASK_ENDPOINT}/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("failed to update the task");
  }
  const updated: TaskResponseDto = await response.json();
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  const response = await fetch(`${TASK_ENDPOINT}/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("failed to update the task");
  }
  const deleted: TaskResponseDto = await response.json();
  return NextResponse.json(deleted);
}
