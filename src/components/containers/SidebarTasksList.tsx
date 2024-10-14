import { useEffect, useState } from "react";
import { EMCategory, Task } from "../../lib/types";
import { TaskLabel } from "../TaskLabel/TaskLabel";
import { useDroppable } from "@dnd-kit/core";
import { getTasksFactory } from "@/lib/subjects";

export function SidebarTasksList() {
  const [ tasks, setTasks ] = useState<Task[]>([]);

  useEffect(() => {
    const subscription = getTasksFactory["uncategorized"]().subscribe(
      (newTasks: Task[]):void => {
        setTasks(newTasks);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [tasks]); 

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
