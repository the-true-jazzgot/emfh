import { Task } from "../../types";
import { TaskLabel } from "../TaskLabel";

export function Q1Assistant({tasks}:{tasks: Task[] | undefined}) {

  return (
    <>
    <h4>Assistant for Q1</h4>
    {tasks?.map(task=>{
      <TaskLabel task={task}/>
    })}
    </>
  )
}