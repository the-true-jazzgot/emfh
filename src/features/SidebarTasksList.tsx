import { useState } from "react";
import { Task } from "../interfaces";

export function SidebarTasksList() {
  const testData:Task[] = [
    {
      id: 1,
      name: "first task"
    },
    {
      id: 2,
      name: "second task"
    }
  ];

  const [ tasks, setTasks ] = useState<Task[]>(testData);

  return (
    <>
    <aside>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </aside></>
  )
}
