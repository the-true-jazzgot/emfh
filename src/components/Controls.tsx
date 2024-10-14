import { useContext, useEffect, useState } from "react";
import { AuthData, EMCategory, Task, TaskType } from "../lib/types";
import { Button } from "./ui/Button";
import { useTodosQuery, useTodoTasksMutation } from "@/components/TaskLabel/lib/tasks.fn";
import { CheckboxWL } from "./ui/CheckboxWL";
import { AuthContext } from "@/lib/contexts";
import { useToast } from "@/lib/hooks/use-toast";
import { AssistantContainer } from "./Assistant/AssistantContainer";
import { assistant, TasksMatrix, updateTask } from "@/lib/subjects";
import { useAllTasks } from "@/lib/hooks/use-all-tasks";



export function Controls() {
  const authContext = useContext<AuthData | undefined>(AuthContext);
  const [areHabits, setAreHabits] = useState<boolean>(false);
  const [areDailies, setAreDailies] = useState<boolean>(false);
  const [areTodos, setAreTodos ] = useState<boolean>(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const {data} = useTodosQuery(setQueryCategory());
  const {q1, q2, q3, q4, uncategorized} = useAllTasks({data, areHabits, areDailies, areTodos});
  const {mutate} = useTodoTasksMutation(authContext);
  const {toast} = useToast();

  const setAssistantData = ():void => {
    const quadrants:EMCategory[] = [];
    let tasksMatrix: TasksMatrix = {quadrants};

    tasksMatrix.q1 = q1;
    if(q1.length > 3 && !quadrants.find(item => item === "q1")) {
        quadrants.push("q1");
    }

    tasksMatrix.q2 = q2;
    if(q2.length > 0 && !quadrants.find(item => item === "q2")) {
      quadrants.push("q2");
    }

    tasksMatrix.q3 = q3;
    tasksMatrix.q4 = q4;
    if(q4.length > 0 && !quadrants.find(item => item === "q4")) {
      quadrants.push("q4");
    }

    assistant.setAssistantData(tasksMatrix);
  }

  function setQueryCategory():TaskType | undefined { //if only one category is selected pull only that one, otherwise pull all
    if(areHabits && !areDailies && !areTodos) return "habit";
    if(!areHabits && areDailies && !areTodos) return "daily";
    if(!areHabits && !areDailies && areTodos) return "todo";
    return undefined;
  }

  useEffect(() => {
    setAssistantData();
  }, [q1, q2, q3, q4, uncategorized]);

  
  function autoresolveQ1(q1: Task[]) {
    const currentdate:Date = new Date();
    q1.forEach(item => {
      item.date = currentdate;
      item.l_validated = true;
      item.l_validationDate = currentdate;
      updateTask.dispatch(item);
      mutate(item);
    });

    toast({
      title: "All urgent and important task are updated",
      description: `Set due date for today - ${currentdate.toLocaleDateString()}`,
    });
  }

  function isDisabled():boolean {
    if(q1.length < 1 && q2.length < 1 && q3.length < 1 && q4.length < 1) return true;
    return false;
  };

  return (
    <>
      <footer className="flex col-span-5 row-span-1">
        <Button text="Apply" fn={()=>autoresolveQ1(q1)} disabled={isDisabled()} />
        <Button text="Open assistant" fn={()=>setIsAssistantOpen(true)} disabled={isDisabled()} />
        <div className="flex">
          <CheckboxWL id="habits" label="Habits" onCheckedChange={val => setAreHabits(val)} checked={areHabits} />
          <CheckboxWL id="dailies" label="Dailies" onCheckedChange={val => setAreDailies(val)} checked={areDailies} />
          <CheckboxWL id="todos" label="ToDos" onCheckedChange={val => setAreTodos(val)} checked={areTodos} />
        </div>
      </footer>
      <AssistantContainer isOpen={isAssistantOpen} setIsOpen={setIsAssistantOpen} />
    </>
  );
}


