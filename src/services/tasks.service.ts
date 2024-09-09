import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AuthData, EMCategory, Task } from "../types";
import { getGetRequestSettings } from "./authentification.service";
import { Observable, Subject } from "rxjs";

// interface ChecklistContract {
//   completed: boolean,
//   text: string,
//   id: string
// };

// type Attribute = "str" | "int" | "per" | "con";

// interface TaskContract { //TODO
//   _id: string,
//   userId: string,
//   text:string,
//   type:TaskType,
//   notes:string,
//   tags:[],
//   value:10,
//   priority:1,
//   attribute:Attribute,
//   challenge:{},
//   group:{
//     assignedUsers:any[],
//     approval:{
//       required:boolean,
//       approved:boolean,
//       requested:boolean
//     }
//   },
//   reminders:any[],
//   createdAt:string,
//   updatedAt:string,
//   id:string
// };

interface TaskListContract {
  success:boolean,
  data:any[], //TaskContract[]
  notifications:any[],
  userV: number,
  appVersion: string
}

const axiosInstance:AxiosInstance = axios.create();

const getTodos = async (authData:AuthData | undefined):Promise<any[]> => {
  if(!authData) {
    throw Error("Habitica API token missing or broken, login to get it");
  }

  const response:AxiosResponse<TaskListContract> = await axiosInstance.get("/tasks/user", getGetRequestSettings(authData));
  return response.data.data;
};

export function toDosQuery() {
  const queryClient = useQueryClient();
  const authData:AuthData | undefined = queryClient.getQueryData(['authData']);

  return useQuery({
    queryKey: ['todos', authData?.username],
    queryFn:  async () => await getTodos(authData),
    enabled: !!authData,
    initialData: [] as any[],
    refetchInterval: 1800000
  });
};

export  function convertRawDataToTasks(data:any[]):Task[] {
  return data.map((item: { id: string, text: string }):Task => ({
    id: item.id, name: item.text, category: "uncategorized" 
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