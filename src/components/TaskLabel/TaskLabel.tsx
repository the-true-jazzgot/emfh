import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import { EMCategory, Task } from "../../lib/types";
import { DailyTaskLabel } from "./DailyTaskLabel";
import { HabitTaskLabel } from "./HabitTaskLabel";
import { TodoTaskLabel } from "./TodoTaskLabel";
import { AssistantAction } from "../Assistant/assistant.lib";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/ui_elements/select";

export interface TaskLabelProps {
  task: Task,
  assistant?: boolean, 
  assistantOptions?: AssistantAction[]
}

export function TaskLabel({task, assistant, assistantOptions}:TaskLabelProps) {
  const [options, setOptions] = useState<AssistantAction[] | undefined>(assistantOptions);
  const [selectedOption, setSelectedOption] = useState<string>(getDefaultOption());
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform)
  };

  function getDefaultOption():string {
    options?.forEach(option=>{
      if(option.performed === true) return option.value;
    });
    return "";
  }

  function handleSelection(value:string):void {
    if(!options) throw new Error("no actions");
    const newOptions:AssistantAction[] = options.map<AssistantAction>(
      action => {
        action.performed = false;
        return action;
      }
    );

    const option:AssistantAction | undefined = newOptions.find(
      item => !!item && item.value === value
    );
    
    if(!!option) {
      option.performed = true;
      option.action(task);
    }

    setOptions(newOptions);
    setSelectedOption(value);
  }

  return (
    <article id={task.id} 
      data-category={task.l_category as EMCategory} 
      className="relative rounded bg-white font-bold my-2 p-2 text-sm text-habitxt w-full order-1" 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
    >
      <h3>{ task.name }</h3>
      <span className="inline-block text-xs right-2 absolute top-2">{ task.type }</span>
      {task.type === "todo" && <TodoTaskLabel task={task} />}
      {task.type === "daily" && <DailyTaskLabel task={task} />}
      {task.type === "habit" && <HabitTaskLabel task={task} />}
      {!!assistant && !!assistantOptions &&
        <Select value={selectedOption} onValueChange={value => handleSelection(value)} defaultValue={selectedOption}>
          <SelectTrigger>
            <SelectValue placeholder="Choose quick action" />
          </SelectTrigger>
          <SelectContent>
            {assistantOptions.map(option => 
              <SelectItem key={option.value} value={option.value}>{option.message}</SelectItem>
            )}
          </SelectContent>
        </Select>
      }
    </article>
  );
}
