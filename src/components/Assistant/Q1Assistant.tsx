import { Task } from "../../types";
import { TaskLabel } from "../TaskLabel/TaskLabel";

export function Q1Assistant({tasks}:{tasks: Task[] | undefined}) {
  return (
    <>
    <h4>Assistant for Q1</h4>
    {!!tasks && tasks.length > 0 &&
      tasks.map((task: Task) => (
        <TaskLabel task={task} key={task.id}/>
      ))
    }
    </>
  )
}