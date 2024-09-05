import { useDroppable } from "@dnd-kit/core";
import { EMCategory, Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { useEffect, useState } from "react";
import { filterData, toDosQuery } from "../services/todos.service";

export function Quadrant({quadrant}:{quadrant: EMCategory}) {
  const { data, isSuccess } = toDosQuery()
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(()=>{
    isSuccess?
    setTasks(filterData(quadrant, data)):
    setTasks([] as Task[])
  }, [data]);

  const {setNodeRef} = useDroppable({
    id: quadrant
  });

  return (
    <section id={quadrant} ref={setNodeRef} className={"js-" + quadrant + " col-span-2 row-span-5 rounded border-2 border-indigo-700 bg-indigo-200 p-2"} >
      { tasks.length > 0 ?
        tasks.map( (task: Task) => (
          <TaskLabel task={task} key={task.id}/>
        )) : null
      }
    </section>
  );
}