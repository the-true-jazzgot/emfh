import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import { EMCategory, Task } from "../../types";
import { DailyTaskLabel } from "./DailyTaskLabel";
import { HabitTaskLabel } from "./HabitTaskLabel";
import { TodoTaskLabel } from "./TodoTaskLabel";

export function TaskLabel({task}:{task:Task}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform)
  };
  
  return (
    <article id={task.id} data-category={task.category as EMCategory} className="relative rounded bg-white font-bold my-2 p-2 text-sm text-habitxt" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h3>{ task.name }</h3>
      <span className="inline-block text-xs right-2 absolute top-2">{ task.type }</span>
      {task.type === "todo" && <TodoTaskLabel task={task} />}
      {task.type === "daily" && <DailyTaskLabel task={task} />}
      {task.type === "habit" && <HabitTaskLabel task={task} />}
    </article>
  )
}
