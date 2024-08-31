import { Task } from "../types";
import { TaskLabel } from "./TaskLabel";

export function Assistant({tasks}:{tasks: Task[]}) {
    let a = () => {
        if(tasks.length > 0) return (<TaskLabel task={tasks[0]} />)
    };
    return (
      <div className="fixed_center bg-white">
        {a()}
      </div>
    )
}
