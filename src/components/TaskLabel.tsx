import { Task } from "../types";

export function TaskLabel({task}:{task:Task}) {
  return (
    <article>
        { task.name }
    </article>
  )
}
