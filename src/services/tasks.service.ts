import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthData, EMCategory, Task, TaskType } from "../types";
import { axiosInstance, getRequestSettings } from "./authentification.service";
import { Observable, Subject } from "rxjs";

interface ChecklistDataContract {
  completed: boolean,
  text: string,
  id: string
};

type Attribute = "str" | "int" | "per" | "con";

export interface TaskDataContract { //TODO: verify and extend
  _id: string,
  userId: string,
  text:string,
  type:TaskType,
  notes:string,
  date: Date,
  tags:[],
  value:10,
  priority:1,
  attribute:Attribute,
  challenge:{},
  group:{
    assignedUsers:any[],
    approval:{
      required:boolean,
      approved:boolean,
      requested:boolean
    }
  },
  reminders:any[],
  createdAt:Date,
  updatedAt:Date,
  checklist: ChecklistDataContract[],
  id:string
};

interface TaskListContract {
  success:boolean,
  data:TaskDataContract[],
  notifications:any[],
  userV: number,
  appVersion: string
}

const getTodos = async (authData:AuthData | undefined, type?:string):Promise<any[]> => {
  if(!authData) {
    throw Error("Habitica API token missing or broken, login to get it");
  }

  let requestSettings:AxiosRequestConfig<TaskDataContract[]> = getRequestSettings(authData);
  !!type ? requestSettings = {...requestSettings, params: {type: type}} :null;
  const response:AxiosResponse<TaskListContract> = await axiosInstance.get("/tasks/user", requestSettings);
  return response.data.data;
};

export function toDosQuery(type?:TaskType) {
  const queryClient = useQueryClient();
  const authData:AuthData | undefined = queryClient.getQueryData(['authData']);
  const queryType = !!type ? type.toString() +"s" : undefined;

  return useQuery({
    queryKey: ['todos', authData?.username], //TODO: add filter for type
    queryFn:  async () => await getTodos(authData, queryType), //TODO: pass optional type value
    enabled: !!authData,
    initialData: [] as any[],
    refetchInterval: 1800000
  });
};

export  function convertRawDataToTasks(data:TaskDataContract[]):Task[] {
  return data.map((item: { id: string, text: string, date?: Date }):Task => ({
    id: item.id, name: item.text, category: "uncategorized", date: item.date || undefined
  }));
};

export const filterData = (category:EMCategory, allTasks:Task[]):Task[] => {
  return allTasks?.filter(item => item.category === category) || [] as Task[];
}

const uncategorizedSubject:Subject<Task[]> = new Subject();

export const tasksUncategorized = {
  dispatch: (tasks: Task[]):void => uncategorizedSubject.next(tasks),
  receive: ():Observable<Task[]> => uncategorizedSubject.asObservable()
};

const subjectQ1:Subject<Task[]> = new Subject();

export const tasksQ1 = {
  dispatch: (tasks: Task[]):void => subjectQ1.next(tasks),
  receive: ():Observable<Task[]> => subjectQ1.asObservable()
};

const subjectQ2:Subject<Task[]> = new Subject();

export const tasksQ2 = {
  dispatch: (tasks: Task[]):void => subjectQ2.next(tasks),
  receive: ():Observable<Task[]> => subjectQ2.asObservable()
};

const subjectQ3:Subject<Task[]> = new Subject();

export const tasksQ3 = {
  dispatch: (tasks: Task[]):void => subjectQ3.next(tasks),
  receive: ():Observable<Task[]> => subjectQ3.asObservable()
};

const subjectQ4:Subject<Task[]> = new Subject();

export const tasksQ4 = {
  dispatch: (tasks: Task[]):void => subjectQ4.next(tasks),
  receive: ():Observable<Task[]> => subjectQ4.asObservable()
};

export const getTasksFactory: Record<EMCategory, () => Observable<Task[]>> = {
  "uncategorized": tasksUncategorized.receive,
  "q1": tasksQ1.receive,
  "q2": tasksQ2.receive,
  "q3": tasksQ3.receive,
  "q4": tasksQ4.receive
}

function getUpdateTaskParameters(localtask: Task, servertask: TaskDataContract, authData: AuthData): AxiosRequestConfig {
  let queryBodyParameters:any = { data: {}};
  if(!!localtask.date && localtask.date !== servertask.date) queryBodyParameters.data.date = localtask.date;
  return {...getRequestSettings(authData), ...queryBodyParameters};
}

const updateTask = async (localtask:Task):Promise<TaskDataContract> => {
  const queryClient = useQueryClient();
  const authData:AuthData | undefined = queryClient.getQueryData(['authData']);
  if(!authData) {
    throw new Error("No authentication data - login to set");
  }
  const servertask:TaskDataContract | undefined = queryClient.getQueryData(["todos", authData.username, localtask.id]); //TODO: useQuery insted of getQueryData
  if(!servertask) {
    throw new Error("Task no longer exists on Habitica account");
  }
  const response = await axiosInstance.put<TaskDataContract>(`/tasks/${localtask.id}`, getUpdateTaskParameters(localtask, servertask, authData));
  return response.data;
}

export function useTasksMutation(){
  const queryClient = useQueryClient(); //invalidateQuery
  return useMutation({
    mutationFn: (task:Task) => updateTask(task),
    //TODO: invalidateQuery
  });
}