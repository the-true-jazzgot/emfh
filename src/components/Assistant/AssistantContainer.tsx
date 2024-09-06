import { useEffect, useState } from "react";
import { EMCategory } from "../../types";
import { Q1Assistant } from "./Q1Assistant";
import { assistant } from "../../services/assistant.service";

export function AssistantContainer() {
  const [ quadrants, setQuadrants ] = useState<EMCategory[]>([]);

  useEffect(()=>{
    const subscription = assistant.getTasksQuadrants().subscribe(
      (quadrants: EMCategory[]) => {
        setQuadrants(quadrants);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [quadrants]);

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

  return (
    <div className="fixed_center bg-white">
      {renderFirstQuadrantAssistant()}
    </div>
  )
}
