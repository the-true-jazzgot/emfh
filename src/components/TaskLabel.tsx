import { useDraggable } from "@dnd-kit/core";
import { EMCategory, Task } from "../types";
import {CSS} from '@dnd-kit/utilities';

export function TaskLabel({task}:{task:Task}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <article id={task.id} data-category={task.category as EMCategory} className="rounded bg-white font-bold my-2 p-2 text-sm text-habitxt" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      { task.name }
    </article>
  )
}
