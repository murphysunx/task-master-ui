import { TASK_ENDPOINT } from "@/app/tasks/consts/TASK_ENDPOINT";
import { TaskListResponseDto } from "@/app/tasks/dtos/taskList.dto";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { listId: string } }
) {
  const { listId } = params;
  const payload = await request.json();
  const response = await fetch(`${TASK_ENDPOINT}/lists/${listId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("failed to update the task");
  }
  const updated: TaskListResponseDto = await response.json();
  return NextResponse.json(updated);
}
