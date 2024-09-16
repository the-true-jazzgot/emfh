import { TaskType } from "@/types";

interface ChecklistDataContract {
  completed: boolean,
  text: string,
  id: string
};

type Attribute = "str" | "int" | "per" | "con";
type Priority = 0.1 | 1 | 1.5 | 2

interface TaskDataContract {
  _id: string,
  userId: string,
  text:string,
  type:TaskType,
  notes:string,
  tags:string[],
  value:number,
  priority:Priority,
  attribute:Attribute,
  challenge:{},
  group:{},
  reminders:any[],
  createdAt:Date,
  updatedAt:Date,
  id:string,
  byHabitica: boolean
};

export interface TodoTaskDataContract extends TaskDataContract {
  date?: Date,
  completed: boolean,
  collapseChecklist: boolean,
  checklist: ChecklistDataContract[],
}

type Frequency = "monthly" | "weekly" | "daily";

interface Repeat {
  m: boolean,
  t: boolean,
  w: boolean,
  th: boolean,
  f: boolean,
  s: boolean,
  su: boolean
}

export interface DailyTaskDataContract extends TaskDataContract {
  checklist: ChecklistDataContract[],
  frequency: Frequency,
  everyX: number,
  startDate: Date,
  repeat: Repeat,
  streak: number,
  daysOfMonth: any[],
  weeksOfMonth: any[],
  nextDue?: Date[],
  yesterDaily: boolean,
  history: {}[],
  completed: boolean,
  collapseChecklist: boolean,
  isDue: boolean
}

export interface HabitTaskDataContract extends TaskDataContract {
  up: boolean,
  down: boolean,
  counterUp: number,
  counterDown: number,
  frequency: Frequency,
  history: {}[]
}

export interface AllTaskTypesDataContract extends HabitTaskDataContract, DailyTaskDataContract, TodoTaskDataContract {};

export interface TaskListContract {
  success:boolean,
  data:AllTaskTypesDataContract[],
  notifications:any[],
  userV: number,
  appVersion: string
}
