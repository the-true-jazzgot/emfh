import { Task } from "@/lib/types";

export interface AssistantAction {
  value: string,
  message: string, 
  action: (task:Task) => void,
  performed?: boolean
}
