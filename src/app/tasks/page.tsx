import { useEffect, useState } from "react";
import TaskCard from "./task-card";
import { ITask } from "./interfaces/task.interface";

async function getData(): Promise<ITask[]> {
  // const res = await fetch("https://api.example.com/...");
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();
  return [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      completed: false,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      completed: true,
    },
  ];
}

export default async function TaskDashboard() {
  const tasks: ITask[] = await getData();

  return (
    <div data-testid="task-dashboard">
      <h1>Tasks</h1>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} showDescription />
        ))}
      </div>
    </div>
  );
}
