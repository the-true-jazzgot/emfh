import { useEffect, useState } from "react";
import { Q1Assistant } from "./Q1Assistant";
import { assistant, TasksMatrix } from "../../services/assistant.service";

export function AssistantContainer() {
  const [ quadrantsMarix, setQuadrantsMatrix] = useState<TasksMatrix>({} as TasksMatrix);

  useEffect(()=>{
    const subscription = assistant.getTasksQuadrants().subscribe(
      (tasksMatrix: TasksMatrix):void => {
        setQuadrantsMatrix(tasksMatrix);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [quadrantsMarix]);

  const renderFirstQuadrantAssistant = () => { 
    if(!!quadrantsMarix.quadrants && quadrantsMarix.quadrants.length > 0) {
      switch(quadrantsMarix.quadrants[0]) {
        case "q1":
          return <Q1Assistant tasks={quadrantsMarix.q1} />;
        default:
          return "";
      }
    }
  }

  return (
    <div className="fixed_center bg-white">
      {renderFirstQuadrantAssistant()}
    </div>
  )
}
