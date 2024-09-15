import { useDraggable } from "@dnd-kit/core";
import { EMCategory, Task } from "../../types";
import {CSS} from '@dnd-kit/utilities';
import {DateInput} from "./DatePicker";
import { useEffect, useState } from "react";

export function TaskLabel({task}:{task:Task}) {
  const [date, setDate] = useState<Date>();

  useEffect(()=>{
    if(!date && !!task.date) {
      setDate(task.date);
    } else {
      task.date = date;
    }
  }, [date]);

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <article id={task.id} data-category={task.category as EMCategory} className="relative rounded bg-white font-bold my-2 p-2 text-sm text-habitxt" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <span className="inline-block text-xs right-2 absolute">{ task.type }</span>
      <h3>{ task.name }</h3>
      <DateInput date={date} setDate={setDate} />
    </article>
  )
}
