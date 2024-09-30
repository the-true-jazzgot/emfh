import { ReactNode, useEffect, useState } from "react";
import { Q1Assistant } from "./Q1Assistant";
import { assistant, TasksMatrix } from "../../services/assistant.service";
import { Button } from "../ui/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

export function AssistantContainer() {
  const [quadrantsMatrix, setQuadrantsMatrix] = useState<TasksMatrix>({} as TasksMatrix);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(()=>{
    const subscription = assistant.getAssistantData().subscribe(
      (tasksMatrix: TasksMatrix):void => {
        setQuadrantsMatrix(tasksMatrix);
        if(tasksMatrix.quadrants.length > 0) {
          setIsOpen(true);
        };
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [quadrantsMatrix]);

  const renderFirstQuadrantAssistant = ():ReactNode => { 
    if(!!quadrantsMatrix.quadrants && quadrantsMatrix.quadrants.length > 0) {
      switch(quadrantsMatrix.quadrants[0]) {
        case "q1":
          return <Q1Assistant tasks={quadrantsMatrix.q1} />;
        default:
          return "";
      }
    }
  }

  const child:ReactNode[] = [<Cross2Icon className="h-4 w-4" />];

  return (
    <>
    {isOpen && <div className="fixed_center bg-white p-10 min-w-96 w-4/5 flex justify-between flex-row flex-wrap order-none">
      <Button text="" children={child} fn={()=>setIsOpen(false)} classes="ml-auto order-1" />
      {renderFirstQuadrantAssistant()}
    </div>
    } 
    </>
  )
}
