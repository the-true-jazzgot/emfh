import { useDroppable } from "@dnd-kit/core";
import { EMCategory, Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { useEffect, useState } from "react";
import { filterData, toDosQuery } from "../services/tasks.service";
import { TasksActionsFactory, TasksDispatchFactory, TasksListAction } from "../services/dnd.service";
import { assistantFactory } from "../services/assistant.service";

export function Quadrant({quadrant}:{quadrant: EMCategory}) {
  const { data, isSuccess } = toDosQuery()
  const [ tasks, setTasks ] = useState<Task[]>([]);

  function updateTasks(newTasks: Task[]):void {
    assistantFactory[quadrant](newTasks);
    setTasks(newTasks);
  }

  function moveTask(taskId: string, moveTo: EMCategory):void {
    const task = tasks.find(item => item.id === taskId);
    if(!!task) {
      updateTasks(
        tasks.filter(item => item.id !== taskId)
      );
      task.category = moveTo;
      TasksDispatchFactory[moveTo]({taskId: taskId, task: task, action: "add"} as TasksListAction);
    }
  }

  useEffect(() => {
    const subscription = TasksActionsFactory[quadrant]().subscribe(
      (action: TasksListAction) => {
        if(action.action ===  "move") moveTask(action.taskId, action.moveTo || "uncategorized");
        if(action.action === "add" && !!action.task) updateTasks([...tasks,action.task]);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [tasks]); 

  useEffect(()=>{
    isSuccess?
    setTasks(filterData(quadrant, data)):
    setTasks([] as Task[])
  }, [data]);

  const {setNodeRef} = useDroppable({
    id: quadrant
  });

  return (
    <section id={quadrant} ref={setNodeRef} className={"js-" + quadrant + " col-span-2 row-span-5 rounded bg-container p-2"} >
      { tasks.length > 0 ?
        tasks.map( (task: Task) => (
          <TaskLabel task={task} key={task.id}/>
        )) : null
      }
    </section>
  );
}