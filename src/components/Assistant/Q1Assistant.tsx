import { useContext, useEffect, useState } from "react";
import { AuthData, Task } from "../../lib/types";
import { TaskLabel } from "../TaskLabel/TaskLabel";
import { Button } from "../ui/Button";
import { AssistantAction } from "./assistant.lib";
import { moveTask, TasksListAction } from "../containers/dnd.lib";
import { useTodoTasksMutation } from "../TaskLabel/lib/tasks.fn";
import { AuthContext } from "@/lib/contexts";

export function Q1Assistant({tasks}:{tasks: Task[] | undefined}) {
  const [message, setMessage] = useState<string[]>([]);
  const authContext = useContext<AuthData | undefined>(AuthContext);
  const {mutate} = useTodoTasksMutation(authContext);
  
  function getButtonTxt():string {
    if(!!tasks && tasks.length < 4)
      return "Apply & Confirm";
    return "Apply & confirm anyway";
  }

  function isButtonDisabled():boolean {
    if(!tasks || tasks.length < 1){
      return true;
    }
    return false;
  }

  function getTaskActions(task: Task):AssistantAction[] {
    const actions:AssistantAction[] = [];
    
    const moveToQ2:TasksListAction = {
      taskId: task.id,
      moveFrom: "q1",
      moveTo: "q2",
      action: "move"
    }

    if(!!tasks && tasks.length > 3) actions.push({
      message: "Move task to important but not urgent",
      value: "toQ2",
      action: () => moveTask.dispatch(moveToQ2)
    })

    const setTodaysDate:AssistantAction = {
      message: "Set due date for today",
      value: "setDate",
      action: () => mutate(task)
    }

    if(task.type === "todo") actions.push(setTodaysDate);

    return actions;
  }

  useEffect(() => {
    let messages:string[] = [];

    if(!!tasks && tasks.length > 3)
      messages.push("It is good practice to keep no more than 3 tasks in first quadrant for a day, consider changing date for some of above tasks or moving them to other quadrant.");
    messages.push("Confirming will set due date till today");
    setMessage(messages);
  }, [tasks]);

  return (
    <>
      <h4>Assistant for Q1</h4>
      {!!tasks && tasks.length > 0 &&
        tasks.map((task: Task) => (
          <TaskLabel task={task} key={task.id} assistant={true} assistantOptions={getTaskActions(task)} />
        ))
      }
      <div className="order-1 block">
        {!!message && 
          message.map(
            (msg, index) => <p className={"order-1"} key={index}>{msg}</p>
          )
        }
      
        <Button 
          text={getButtonTxt()} 
          disabled={isButtonDisabled()}
        />
      </div>
    </>
  )
}