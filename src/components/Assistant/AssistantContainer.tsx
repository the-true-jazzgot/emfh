import { useEffect, useState } from "react";
import { Q1Assistant } from "./Q1Assistant";
import { assistant, TasksMatrix } from "../../services/assistant.service";

export function AssistantContainer() {
  const [ quadrantsMatrix, setQuadrantsMatrix] = useState<TasksMatrix>({} as TasksMatrix);

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

  const renderFirstQuadrantAssistant = () => { 
    if(!!quadrantsMatrix.quadrants && quadrantsMatrix.quadrants.length > 0) {
      switch(quadrantsMatrix.quadrants[0]) {
        case "q1":
          return <Q1Assistant tasks={quadrantsMatrix.q1} />;
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
