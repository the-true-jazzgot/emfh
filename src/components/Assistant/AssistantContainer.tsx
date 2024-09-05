import { useEffect, useState } from "react";
import { assistant } from "../../services/assistant.service";
import { EMCategory, Task } from "../../types";
import { Q1Assistant } from "./Q1Assistant";

export function AssistantContainer() {
  const [quadrants, setQuadrants] = useState<EMCategory[]>([]);

  const renderFirstQuadrantAssistant = () => { 
    if(quadrants.length > 0) {
      switch(quadrants[0]) {
        case "q1":
          return <Q1Assistant />;
          break;
        default:
          return "";
      }
    }
  }

  useEffect(() => {
    const subscription = assistant.getTasksQuadrants().subscribe(
      (receivedQuadrants: EMCategory[]) => {
        setQuadrants(receivedQuadrants);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [quadrants]); 

  return (
    <div className="fixed_center bg-white">
      {renderFirstQuadrantAssistant()}
    </div>
  )
}
