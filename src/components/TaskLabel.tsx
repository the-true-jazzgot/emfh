import { useDraggable } from "@dnd-kit/core";
import { Task } from "../types";
import {CSS} from '@dnd-kit/utilities';

export function TaskLabel({task}:{task:Task}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <article id={task.id} className="rounded border-2 border-indigo-700 bg-indigo-400 text-white font-bold my-2 p-2 text-sm" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      { task.name }
    </article>
  )
}
