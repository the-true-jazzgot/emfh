import { ReactNode, useEffect, useState } from "react";
import { Q1Assistant } from "./Q1Assistant";
import { assistant, TasksMatrix } from "@/components/Assistant/assistant.lib";
import { Button } from "../ui/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

export function AssistantContainer({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen:(isOpen:boolean)=>void}) {
  const [quadrantsMatrix, setQuadrantsMatrix] = useState<TasksMatrix>({} as TasksMatrix);
  const [nextQuadrantAssistant, setNextQuadrantAssistant] = useState<ReactNode>();

  useEffect(()=>{
    const subscription = assistant.getAssistantData().subscribe(
      (tasksMatrix: TasksMatrix):void => {
        setQuadrantsMatrix(tasksMatrix);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [quadrantsMatrix]);

  useEffect(()=>{
    const renderNextQuadrantAssistant = ():ReactNode => { 
      if(!!quadrantsMatrix.quadrants && quadrantsMatrix.quadrants.length > 0) {
        switch(quadrantsMatrix.quadrants[0]) {
          case "q1":
            return <Q1Assistant tasks={quadrantsMatrix.q1} />;
          default:
            return "";
        }
      }
    }

    setNextQuadrantAssistant(renderNextQuadrantAssistant);
  }, [quadrantsMatrix])


  const child:ReactNode[] = [<Cross2Icon key={"icon"} className="h-4 w-4" />];

  return (
    <>{isOpen && 
      <div className="fixed_center bg-white p-10 min-w-96 w-4/5 flex justify-between flex-row flex-wrap order-none">
        <Button 
          text="" 
          children={child} 
          fn={()=>setIsOpen(false)} 
          classes="ml-auto order-1"
        />
        {nextQuadrantAssistant}
      </div>
    }</>
  )
}
