import { useEffect, useState } from "react";
import { filterData, toDosQuery } from "../services/tasks.service";
import { EMCategory, Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { useDroppable } from "@dnd-kit/core";
import { TasksActionsFactory, TasksDispatchFactory, TasksListAction } from "../services/dnd.service";

export function SidebarTasksList() {
  const { data, isSuccess } = toDosQuery();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  function moveTask(taskId: string, moveTo: EMCategory):void {
    const task = tasks.find(item => item.id === taskId);
    if(!!task) {
      setTasks(
        tasks.filter(item => item.id !== taskId)
      );
      task.category = moveTo;
      TasksDispatchFactory[moveTo]({taskId: taskId, task: task, action: "add"} as TasksListAction);
    }
  }

  function addTask(task: Task):void {
    setTasks([...tasks, task]);
  }

  useEffect(() => {
    const subscription = TasksActionsFactory["uncategorized"]().subscribe(
      (action: TasksListAction) => {
        if(action.action ===  "move") moveTask(action.taskId, action.moveTo || "uncategorized");
        if(action.action === "add" && !!action.task) addTask(action.task);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [tasks]);

  useEffect(()=>{
    isSuccess?
    setTasks(filterData("uncategorized", data)):
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
