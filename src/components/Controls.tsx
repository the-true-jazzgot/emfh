import { useEffect, useState } from "react";
import { assistant, assistantQ1, assistantQ2, assistantQ3, assistantQ4, assistantUncategorized, TasksMatrix } from "../services/assistant.service";
import { EMCategory, Task } from "../types";
import { Button } from "./ui_elements/Button";

export function Controls() {
  const [uncategorized, setUncategorized] = useState<Task[]>([]);
  const [q1, setQ1] = useState<Task[]>([]);
  const [q2, setQ2] = useState<Task[]>([]);
  const [q3, setQ3] = useState<Task[]>([]);
  const [q4, setQ4] = useState<Task[]>([]);

  useEffect(() => {
    const subscription = assistantUncategorized.getTasksQuadrants().subscribe(
      (receivedTasks: Task[]) => {
        setUncategorized(receivedTasks);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [uncategorized]); 

  useEffect(() => {
    const subscription = assistantQ1.getTasksQuadrants().subscribe(
      (receivedTasks: Task[]) => {
        setQ1(receivedTasks);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [q1]); 

  useEffect(() => {
    const subscription = assistantQ2.getTasksQuadrants().subscribe(
      (receivedTasks: Task[]) => {
        setQ2(receivedTasks);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [q2]); 

  useEffect(() => {
    const subscription = assistantQ3.getTasksQuadrants().subscribe(
      (receivedTasks: Task[]) => {
        setQ3(receivedTasks);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [q3]); 

  useEffect(() => {
    const subscription = assistantQ4.getTasksQuadrants().subscribe(
      (receivedTasks: Task[]) => {
        setQ4(receivedTasks);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [q4]); 
  
  const evaluateMatrix = ():void => {
    const quadrants:EMCategory[] = [];
    let tasksMatrix: TasksMatrix = {quadrants};

    if(q1.length > 3 && !quadrants.find(item => item === "q1")) {
        quadrants.push("q1");
        tasksMatrix.q1 = q1;
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
