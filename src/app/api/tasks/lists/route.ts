import { TASK_ENDPOINT } from "@/app/tasks/consts/TASK_ENDPOINT";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const response = await fetch(`${TASK_ENDPOINT}/lists`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}
