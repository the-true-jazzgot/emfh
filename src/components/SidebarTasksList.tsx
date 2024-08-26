import { Task } from "../types";
import { TaskLabel } from "./TaskLabel";
import { toDosQuery } from "../services/todos.service";

function convertDataToTasks(data:any[]){
  const tasks:Task[] = [];
  data.forEach( item => {
    tasks.push({ id: item.id, name: item.title})
  });
  return tasks;
}

export function SidebarTasksList() {
  const { status, data, error, isFetching } = toDosQuery()
  
  return (
    <section>
      {status === 'pending' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        convertDataToTasks(data).map( task => (
          <TaskLabel task={task} key={task.id}/>
        ))
      )}
      <span>{isFetching ? "Fetching new data" : ""}</span>
    </section>
  )
}
