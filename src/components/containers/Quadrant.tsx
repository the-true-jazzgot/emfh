import { useDroppable } from "@dnd-kit/core";
import { EMCategory, Task } from "../../lib/types";
import { TaskLabel } from "../TaskLabel/TaskLabel";
import { useEffect, useState } from "react";
import { getTasksFactory } from "@/lib/subjects";

export function Quadrant({quadrant}:{quadrant: EMCategory}) {
  const [ tasks, setTasks ] = useState<Task[]>([]);

  useEffect(() => {
    const subscription = getTasksFactory[quadrant]().subscribe(
      (newTasks: Task[]):void => {
        setTasks(newTasks);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [tasks]); 

  const {setNodeRef} = useDroppable({
    id: quadrant
  });

  return (
    <section id={quadrant} ref={setNodeRef} className={"js-" + quadrant + " col-span-2 row-span-5 rounded bg-container p-2"} >
      {tasks.length > 0 &&
        tasks.map((task: Task) => (
          <TaskLabel task={task} key={task.id}/>
        ))
      }
    </section>
  );
}