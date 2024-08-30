import { Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { useDroppable } from "@dnd-kit/core";

export function SidebarTasksList({tasks}:{tasks:Task[]}) {
  const {setNodeRef} = useDroppable({
    id: "sidebar"
  });

  return (
    <section className="col-span-1 row-span-10" ref={setNodeRef}>
      <h2>{!!tasks ? tasks[0]?.name : "No tasks passed"}</h2>
      { tasks.length > 0 ?
        tasks.map( (task: Task) => (
          <TaskLabel task={task} key={task.id}/>
        )) : null
      }
    </section>
  );
}
