import { AuthContext } from "@/lib/contexts"
import { Task } from "../../lib/types";
import { DateInput } from "./DatePicker";
import { useContext, useEffect, useState } from "react";
import { useTodoTasksMutation } from "@/components/TaskLabel/lib/tasks.fn";

export function TodoTaskLabel({task}:{task:Task}) {
  const [date, setDate] = useState<Date>();
  const authData = useContext(AuthContext);
  const {mutate} = useTodoTasksMutation(authData);

  useEffect(()=>{
    if(!date && !!task.date) {
      setDate(task.date);
    } else if(!!task.date && !!date) {
      if(new Date(date).toISOString() !== new Date(task.date).toISOString()) {
        task.date = date;
        mutate(task);
      }
    }
  }, [date]);

  useEffect(()=>{
    setDate(task.date);
  }, [task]);

  return (
    <DateInput date={date} setDate={setDate} />
  )
}
