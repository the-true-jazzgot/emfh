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

interface TodoTaskDataFields {
  date?: Date,
  completed: boolean,
  collapseChecklist: boolean,
  checklist: ChecklistDataContract[],
}

export interface TodoTaskDataContract extends TodoTaskDataFields, TaskDataContract {};

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

interface DailyTaskDataFields {
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

export interface DailyTaskDataContract extends TaskDataContract, DailyTaskDataFields {};

interface HabitTaskDataFields {
  up: boolean,
  down: boolean,
  counterUp: number,
  counterDown: number,
  frequency: Frequency,
  history: {}[]
}

export interface HabitTaskDataContract extends TaskDataContract, HabitTaskDataFields {};

export interface AllTaskTypesDataContract extends TaskDataContract, Partial<HabitTaskDataFields>, Partial<DailyTaskDataFields>, Partial<TodoTaskDataFields> {};

export interface TaskListContract {
  success:boolean,
  data:(HabitTaskDataContract | DailyTaskDataContract | TodoTaskDataContract)[],
  notifications:any[],
  userV:number,
  appVersion: string
}

export interface SingleTaskDataContract {
  success:boolean,
  data:HabitTaskDataContract | DailyTaskDataContract | TodoTaskDataContract,
  notifications:any[],
  userV:number,
  appVersion: string
}