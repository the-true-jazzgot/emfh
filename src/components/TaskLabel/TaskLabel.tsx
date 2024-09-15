import { useDraggable } from "@dnd-kit/core";
import { EMCategory, Task } from "../../types";
import {CSS} from '@dnd-kit/utilities';
import {DateInput} from "./DatePicker";

export function TaskLabel({task}:{task:Task}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <article id={task.id} data-category={task.category as EMCategory} className="rounded bg-white font-bold my-2 p-2 text-sm text-habitxt" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h3>{ task.name }</h3>
      <DateInput />
    </article>
  )
}
