import { useEffect, useState } from "react";
import { filterData, toDosQuery } from "../services/todos.service";
import { EMCategory, Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { useDroppable } from "@dnd-kit/core";

export function SidebarTasksList() {
  const { data, isSuccess } = toDosQuery();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(()=>{
    isSuccess?
    setTasks(filterData("uncategorized", data)):
    setTasks([] as Task[])
  }, [data]);

  const {setNodeRef} = useDroppable({
    id: "uncategorized"
  });

  return (
    <section id={"uncategorized" as EMCategory} className="col-span-1 row-span-10" ref={setNodeRef}>
      <h2>{!!tasks ? tasks[0]?.name : "No tasks passed"}</h2>
      { tasks.length > 0 ?
        tasks.map( (task: Task) => (
          <TaskLabel task={task} key={task.id}/>
        )) : null
      }
    </section>
  );
}
