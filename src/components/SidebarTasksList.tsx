import { Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { toDosQuery } from "../services/todos.service";

export function SidebarTasksList() {
  const { status, data, error, isFetching, refetch } = toDosQuery();;
  
  return (
    <section className="col-span-1 row-span-10">
      {status === 'pending' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        data.map( (task: Task) => (
          <TaskLabel task={task} key={task.id}/>
        ))
      )}
      <span>{isFetching ? "Fetching new data" : ""}</span>
      <button onClick={ ()=> {refetch()}}>CLICK</button>
    </section>
  );
}
