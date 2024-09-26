import { AuthContext } from "@/services/authentification.service";
import { Task } from "../../types";
import { DateInput } from "./DatePicker";
import { useContext, useEffect, useState } from "react";
import { useTodoTasksMutation } from "@/services/task/tasks.service";

export function TodoTaskLabel({task}:{task:Task}) {
  const [date, setDate] = useState<Date>();
  const authData = useContext(AuthContext);
  const {mutate} = useTodoTasksMutation(authData);

  useEffect(()=>{
    if(!date && !!task.date) {
      setDate(task.date);
    } if(!!task.date && date != task.date) {
      task.date = date;
      mutate(task);
    }
  }, [date]);

  useEffect(()=>{
    setDate(task.date);
  }, [task]);

  return (
    <DateInput date={date} setDate={setDate} />
  )
}
