import { Task } from "../types";

export function TaskLabel({task}:{task:Task}) {
  return (
    <article className="rounded border-2 border-indigo-700 bg-indigo-400 text-white font-bold my-2 p-2 text-sm">
        { task.name }
    </article>
  )
}
