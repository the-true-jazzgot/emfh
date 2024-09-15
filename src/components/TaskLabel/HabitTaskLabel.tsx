import { useDraggable } from "@dnd-kit/core";
import { EMCategory, Task } from "../../types";
import {CSS} from '@dnd-kit/utilities';

export function HabitTaskLabel({task}:{task:Task}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform)
  };

  return (
    <article id={task.id} data-category={task.category as EMCategory} className="relative rounded bg-white font-bold my-2 p-2 text-sm text-habitxt" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h3>{ task.name }</h3>
      <span className="inline-block text-xs right-2 absolute">{ task.type }</span>
    </article>
  )
}
