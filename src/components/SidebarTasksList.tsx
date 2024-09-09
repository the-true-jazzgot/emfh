import { useEffect, useState } from "react";
import { convertRawDataToTasks, filterData, toDosQuery } from "../services/tasks.service";
import { EMCategory, Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { useDroppable } from "@dnd-kit/core";
import { TasksActionsFactory, TasksDispatchFactory, TasksListAction } from "../services/dnd.service";
import { assistantFactory } from "../services/assistant.service";

export function SidebarTasksList() {
  const { data, isSuccess } = toDosQuery();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  
  function updateTasks(newTasks: Task[]):void {
    assistantFactory["uncategorized"](newTasks);
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
    const subscription = TasksActionsFactory["uncategorized"]().subscribe(
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
    setTasks(filterData("uncategorized", convertRawDataToTasks(data))):
    setTasks([] as Task[])
  }, [data]);

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
