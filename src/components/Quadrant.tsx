import { useDroppable } from "@dnd-kit/core";
import { EMCategory, Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { useEffect, useState } from "react";
import { filterData, toDosQuery } from "../services/tasks.service";
import { TasksActionsFactory, TasksDispatchFactory, TasksListAction } from "../services/dnd.service";

export function Quadrant({quadrant}:{quadrant: EMCategory}) {
  const { data, isSuccess } = toDosQuery()
  const [ tasks, setTasks ] = useState<Task[]>([]);

  function moveTask(taskId: string, moveTo: EMCategory):void {
    console.log("Move task: "+taskId+"from: "+quadrant+" to: "+moveTo);
    const task = tasks.find(item => item.id === taskId);
    if(!!task) {
      setTasks(
        tasks.filter(item => item.id !== taskId)
      );
      TasksDispatchFactory[moveTo]({taskId: taskId, task: task, action: "add"} as TasksListAction);
    }
  }

  function addTask(task: Task):void {
    setTasks([...tasks, task]);
  }

  useEffect(()=>{
    isSuccess?
    setTasks(filterData(quadrant, data)):
    setTasks([] as Task[])
  }, [data]);

  const {setNodeRef} = useDroppable({
    id: quadrant
  });

  useEffect(() => {
    const subscription = TasksActionsFactory[quadrant]().subscribe(
      (action: TasksListAction) => {
        console.log(action);
        if(action.action ===  "move") moveTask(action.taskId, action.moveTo || "uncategorized");
        if(action.action === "add" && !!action.task) addTask(action.task);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [tasks]); 

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