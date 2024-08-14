import { TASK_ENDPOINT } from "@/app/tasks/consts/TASK_ENDPOINT";
import { ITask } from "@/app/tasks/interfaces/task.interface";
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

  const updated: ITask = await response.json();
  return NextResponse.json(updated);
}
