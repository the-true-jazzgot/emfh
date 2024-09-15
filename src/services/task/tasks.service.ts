import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthData, EMCategory, Task, TaskType } from "../../types";
import { axiosInstance, getRequestSettings } from "../authentification.service";
import { Observable, Subject } from "rxjs";
import { AllTaskTypesDataContract, TaskListContract, TodoTaskDataContract } from "./task.datacontracts";

const getTodos = async (authData:AuthData | undefined, type:string | undefined):Promise<any[]> => {
  if(!authData) {
    throw Error("Habitica API token missing or broken, login to get it");
  }

  let requestSettings:AxiosRequestConfig<AllTaskTypesDataContract[]> = getRequestSettings(authData);
  !!type ? requestSettings = {...requestSettings, params: {type: type.toString() +"s"}} :null;

  const response:AxiosResponse<TaskListContract> = await axiosInstance.get("/tasks/user", requestSettings);

  console.log(response.data);

  return response.data.data;
};

export const todoKeys = {
  all: (username: string | undefined)=> ['todos', username] as const,
  type: (username: string | undefined, type: TaskType) => [...todoKeys.all(username), type.toString() +"s"] as const
}

export function toDosQuery(type?:TaskType) {
  const queryClient = useQueryClient();
  const authData:AuthData | undefined = queryClient.getQueryData(['authData']);
  const queryKey = type? todoKeys.type(authData?.username, type) : todoKeys.all(authData?.username);

  return useQuery({
    queryKey: queryKey,
    queryFn:  async () => await getTodos(authData, type),
    enabled: true,
    initialData: [] as any[],
    refetchInterval: 900000
  });
};

export  function convertServerDataToLocalData(rawTasks:AllTaskTypesDataContract[], habits:boolean, dailies: boolean, todos: boolean):Task[] {
  const data:AllTaskTypesDataContract[] = filterDataByType(habits, dailies, todos, rawTasks);
  return data.map((item: { id: string, text: string, type: TaskType, date?: Date, nextDue: Date[] }):Task => ({ //task data contract
    id: item.id, name: item.text, category: "uncategorized", date: item.date, type: item.type
  }));
};

export const filterDataByCategory = (category:EMCategory, allTasks:Task[]):Task[] => {
  return allTasks?.filter(item => item.category === category) || [] as Task[];
}

export const filterDataByType = (habits:boolean, dailies:boolean, todos:boolean, allTasks:AllTaskTypesDataContract[]):AllTaskTypesDataContract[] => {
  let returnTasks:AllTaskTypesDataContract[] = [];
  let filteredTasks: AllTaskTypesDataContract[] = [];
  if(habits) {
    filteredTasks = allTasks?.filter(item => item.type === "habit");
    returnTasks = [...filteredTasks];
  };
  if(dailies) {
    filteredTasks = allTasks?.filter(item => item.type === "daily");
    returnTasks = [...returnTasks,...filteredTasks];
  }
  if(todos) {
    filteredTasks = allTasks?.filter(item => item.type === "todo");
    returnTasks = [...returnTasks,...filteredTasks];
  }
  return returnTasks;
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

function getUpdateTodoTaskParameters(localtask: Task, servertask: TodoTaskDataContract, authData: AuthData): AxiosRequestConfig {
  let queryBodyParameters:any = { data: {}};
  if(!!localtask.date && localtask.date !== servertask.date) queryBodyParameters.data.date = localtask.date;
  return {...getRequestSettings(authData), ...queryBodyParameters};
}

const updateTodoTask = async (localtask:Task):Promise<TodoTaskDataContract> => {
  const queryClient = useQueryClient();
  const authData:AuthData | undefined = queryClient.getQueryData(['authData']);
  if(!authData) {
    throw new Error("No authentication data - login to reciveive");
  }
  const servertask:TodoTaskDataContract | undefined = queryClient.getQueryData(["todos", authData.username, localtask.id]); //TODO: useQuery insted of getQueryData
  if(!servertask) {
    throw new Error("Task no longer exists on Habitica account");
  }
  const response = await axiosInstance.put<TodoTaskDataContract>(`/tasks/${localtask.id}`, getUpdateTodoTaskParameters(localtask, servertask, authData));
  return response.data;
}

export function useTasksMutation(){
  const queryClient = useQueryClient(); //invalidateQuery
  return useMutation({
    mutationFn: (task:Task) => updateTodoTask(task),
    //TODO: invalidateQuery
  });
}