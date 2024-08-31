import { EMCategory, Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { useDroppable } from "@dnd-kit/core";

export function SidebarTasksList({tasks}:{tasks:Task[]}) {
  const {setNodeRef} = useDroppable({
    id: "uncategorized"
  });

  return (
    <section id={"uncategorized" as EMCategory} className="col-span-1 row-span-10 bg-container" ref={setNodeRef}>
      { tasks.length > 0 ?
        tasks.map( (task: Task) => (
          <TaskLabel task={task} key={task.id}/>
        )) : null
      }
    </section>
  );
}
