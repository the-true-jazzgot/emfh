import { AllTaskTypesDataContract } from "@/components/TaskLabel/lib/task.datacontracts";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useStorageState } from "./use-storage-state";
import { AuthData, EMCategory, Task } from "../types";
import { AuthContext } from "../contexts";
import { moveTask, TasksListAction, tasksQ1, tasksQ2, tasksQ3, tasksQ4, tasksUncategorized, updateTask } from "../subjects";

export interface UseAllTasksProps {
  data: AllTaskTypesDataContract[], 
  areDailies: boolean, 
  areHabits: boolean, 
  areTodos: boolean
}

export function useAllTasks({data, areHabits, areDailies, areTodos}:UseAllTasksProps) {
  const authContext = useContext<AuthData | undefined>(AuthContext);
  const [allTasks, setAllTasks] = useStorageState<Task[]>([], !!authContext ? authContext.username : "anonymous");
  const [uncategorized, setUncategorized] = useState<Task[]>([]);
  const [q1, setQ1] = useState<Task[]>([]);
  const [q2, setQ2] = useState<Task[]>([]);
  const [q3, setQ3] = useState<Task[]>([]);
  const [q4, setQ4] = useState<Task[]>([]);

  interface Quadrants {
    get: Task[],
    set: Dispatch<SetStateAction<Task[]>>,
    send: (tasks: Task[]) => void
  }
  
  const quadrantsFactory:Record<EMCategory, Quadrants> = {
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

  function filterLocalDataByType(allTasks:Task[], habits:boolean=areHabits, dailies:boolean=areDailies, todos:boolean=areTodos):Task[] {
    let typeTasks:Task[] = [];
    let filteredTasks: Task[] = [];
    if(habits) {
      typeTasks = allTasks?.filter(item => item.type === "habit");
      filteredTasks = [...typeTasks];
    };
    if(dailies) {
      typeTasks = allTasks?.filter(item => item.type === "daily");
      filteredTasks = [...filteredTasks,...typeTasks];
    }
    if(todos) {
      typeTasks = allTasks?.filter(item => item.type === "todo");
      filteredTasks = [...filteredTasks,...typeTasks];
    }
    return filteredTasks;
  }

  function filterServerDataByType(allTasks:AllTaskTypesDataContract[]):AllTaskTypesDataContract[] {
    return allTasks?.filter(item => item.type !== "reward");;
  }

  function convertServerDataToLocalData(rawTasks:AllTaskTypesDataContract[], storageData:Task[]):Task[] {
    const data:AllTaskTypesDataContract[] = filterServerDataByType(rawTasks);
    const localData:Task[] = [];
  
    data.forEach(serverTask => {
      const storageTask = storageData.find(item => item.id === serverTask.id);
      let localTask:Task = {
        id: serverTask.id, 
        name: serverTask.text, 
        l_category: "uncategorized", 
        date: !!serverTask.nextDue ? serverTask.nextDue[0] : serverTask.date, 
        type: serverTask.type, 
        l_validated: false
      }
      if(!!storageTask) {
        localTask.l_category = storageTask.l_category;
        localTask.l_validated = storageTask.l_validated;
        localTask.l_validationDate = storageTask.l_validationDate;
      }
      localData.push(localTask);
    });
    return localData;
  };

  //TODO: task validation
  function taskUpdate(task:Task):void {
    //TODO: task validation
    let updatedTaskList:Task[] = allTasks.map(item=>{
      if(item.id === task.id){
        return task
      } else {
        return item;
      }
    });
    setAllTasks(updatedTaskList);
  }

  const filterLocalDataByCategory = (category:EMCategory, allTasks:Task[]):Task[] => {
    return allTasks?.filter(item => item.l_category === category) || [] as Task[];
  }

  function handleCategoryListChange(category: EMCategory):void {
    quadrantsFactory[category].send(quadrantsFactory[category].get);
  }

  useEffect(()=>{
    const filteredTasks = filterLocalDataByType(allTasks)
    setQ1(filterLocalDataByCategory("q1", filteredTasks));
    setQ2(filterLocalDataByCategory("q2", filteredTasks));
    setQ3(filterLocalDataByCategory("q3", filteredTasks));
    setQ4(filterLocalDataByCategory("q4", filteredTasks));
    setUncategorized(filterLocalDataByCategory("uncategorized", filteredTasks));
  }, [allTasks, areDailies, areHabits, areTodos]);

  useEffect(()=>{
    if(!!data) handleCategoryListChange("q1");
  }, [q1]);

  useEffect(()=>{
    if(!!data) handleCategoryListChange("q2");
  }, [q2]);

  useEffect(()=>{
    if(!!data) handleCategoryListChange("q3");
  }, [q3]);

  useEffect(()=>{
    if(!!data) handleCategoryListChange("q4");
  }, [q4]);

  useEffect(()=>{
    if(!!data) handleCategoryListChange("uncategorized");
  }, [uncategorized]);

  useEffect(()=>{
    const update = updateTask.receive().subscribe((task:Task)=>{
      taskUpdate(task);
    });

    return ()=>update.unsubscribe();
  });

  useEffect(() => {
    const subscription = moveTask.receive().subscribe(
      (action: TasksListAction) => {
        const task:Task | undefined = allTasks.find(item => item.id === action.taskId);
        if(!!task){
          task.l_category = action.moveTo;
          taskUpdate(task);
        };
      }
    );

    return () => {
      subscription.unsubscribe();
    }
  });

  useEffect(() => {
    if(!authContext) throw "errorNoAuth";
    if(!!data) {
      const caonvertedData:Task[] = convertServerDataToLocalData(data, allTasks);
      setAllTasks(caonvertedData);
    }
  }, [data]);

  return {q1, q2, q3, q4, uncategorized};
}


