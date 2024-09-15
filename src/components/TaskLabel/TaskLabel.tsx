import { Task } from "../../types";
import { DailyTaskLabel } from "./DailyTaskLabel";
import { HabitTaskLabel } from "./HabitTaskLabel";
import { TodoTaskLabel } from "./TodoTaskLabel";

export function TaskLabel({task}:{task:Task}) {
  return (
    <>
      {task.type === "todo" && <TodoTaskLabel task={task} />}
      {task.type === "daily" && <DailyTaskLabel task={task} />}
      {task.type === "habit" && <HabitTaskLabel task={task} />}
    </>
  )
}
