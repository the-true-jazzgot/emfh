import { Task } from "../../types";
import { DateInput } from "./DatePicker";
import { useEffect, useState } from "react";

export function TodoTaskLabel({task}:{task:Task}) {
  const [date, setDate] = useState<Date>();

  useEffect(()=>{
    if(!date && !!task.date) {
      setDate(task.date);
    } else {
      task.date = date;
    }
  }, [date]);

  useEffect(()=>{
    setDate(task.date);
  }, [task]);

  return (
    <DateInput date={date} setDate={setDate} />
  )
}
