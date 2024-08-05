import { describe, expect, test, vi } from "vitest";
import { ITask } from "../interfaces/task.interface";
import { CREATE_TASK_ENDPOINT_BASE, createTask } from "./create-task";

global.fetch = vi.fn();
const mockedFetch = vi.mocked(fetch);

describe("create-task", () => {
  const taskName = "New Task";
  const taskDescription = "My New Task";

  test("should call fetch with correct endpoint and body", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: "1",
          title: taskName,
          description: taskDescription,
          completed: false,
        } satisfies ITask),
    } as Response);
    await createTask(taskName, taskDescription);
    expect(fetch).toHaveBeenCalledWith(CREATE_TASK_ENDPOINT_BASE, {
      method: "post",
      body: JSON.stringify({
        title: taskName,
        description: taskDescription,
      }),
    } as RequestInit);
  });

  test("should throw an error when failing", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);
    expect(createTask(taskName, taskDescription)).rejects.toThrowError();
  });
});
