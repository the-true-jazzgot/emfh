import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { assistant, TasksMatrix } from "../services/assistant.service";
import { EMCategory, Task } from "../types";
import { Button } from "./ui_elements/Button";
import { convertRawDataToTasks, filterData, tasksQ1, tasksQ2, tasksQ3, tasksQ4, tasksUncategorized, toDosQuery } from "../services/tasks.service";
import { moveTask, TasksListAction } from "../services/dnd.service";

export function Controls() {
  const { data, status } = toDosQuery();
  const [uncategorized, setUncategorized] = useState<Task[]>([]);
  const [q1, setQ1] = useState<Task[]>([]);
  const [q2, setQ2] = useState<Task[]>([]);
  const [q3, setQ3] = useState<Task[]>([]);
  const [q4, setQ4] = useState<Task[]>([]);

  interface quadrants {
    get: Task[],
    set: Dispatch<SetStateAction<Task[]>>,
    send: (tasks: Task[]) => void
  }

  const quadrantsFactory:Record<EMCategory, quadrants> = {
    "q1": {
      get: q1,
      set: setQ1,
      send: tasksQ1.dispatch
    },
    "q2": {
      get: q2,
      set: setQ2,
      send: tasksQ2.dispatch
    },
    "q3": {
      get: q3,
      set: setQ3,
      send: tasksQ3.dispatch
    },
    "q4": {
      get: q4,
      set: setQ4,
      send: tasksQ4.dispatch
    },
    "uncategorized": {
      get: uncategorized,
      set: setUncategorized,
      send: tasksUncategorized.dispatch
    }
  }

  useEffect(()=>{
    tasksQ1.dispatch(q1);
  }, [q1]);

  useEffect(()=>{
    tasksQ2.dispatch(q2);
  }, [q2]);

  useEffect(()=>{
    tasksQ3.dispatch(q3);
  }, [q3]);

  useEffect(()=>{
    tasksQ4.dispatch(q4);
  }, [q4]);

  useEffect(()=>{
    tasksUncategorized.dispatch(uncategorized);
  }, [uncategorized]);
  

  useEffect(() => {
    const receivedData = convertRawDataToTasks(data);
    setQ1(filterData("q1", receivedData));
    setQ2(filterData("q2", receivedData));
    setQ3(filterData("q3", receivedData));
    setQ4(filterData("q4", receivedData));
    setUncategorized(filterData("uncategorized", receivedData));
  }, [data, status]);

  useEffect(() => {
    const subscription = moveTask.receive().subscribe(
      (action: TasksListAction) => {
        const from = quadrantsFactory[action.moveFrom];
        const to = quadrantsFactory[action.moveTo];
        const taskToMove:Task | undefined = from.get.find((item:Task) => item.id === action.taskId);
        let moveToTasks:Task[] = [];

        if(!!to.get) to.get.forEach(item => moveToTasks.push(item));
        if(!!taskToMove) {
          taskToMove.category = action.moveTo;
          moveToTasks.push(taskToMove);
        };
        from.set(from.get.filter((item:Task) => item.id !== action.taskId) as Task[]);
        to.set(moveToTasks);
      }
    );

    return () => {
      subscription.unsubscribe();
    }
  }, [data, q1, q2, q3, q4, uncategorized]);
  
  const evaluateMatrix = ():void => {
    const quadrants:EMCategory[] = [];
    let tasksMatrix: TasksMatrix = {quadrants};

    tasksMatrix.q1 = q1;
    if(q1.length > 3 && !quadrants.find(item => item === "q1")) {
        quadrants.push("q1");
    }
    else {
      autoresolveQ1(q1);
    }

    assistant.setAssistantData(tasksMatrix);
  }

  function isDisabled():boolean {
    if(q1.length < 4 && q2.length < 1 && q3.length < 1 && q4.length < 1) return true;
    return false;
  };

  return (
    <footer className="col-span-5 row-span-1">
      <Button text="Apply" fn={evaluateMatrix} disabled={isDisabled()} />
    </footer>
  );
}

function autoresolveQ1(q1: Task[]) {
  const currentdate:Date = new Date();
  q1.forEach(item => {
    item.date = currentdate;
  });
  // useMutateQ1(q1);
}

