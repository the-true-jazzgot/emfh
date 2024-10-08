import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthData, EMCategory, Task, TaskType } from "../../../types";
import { AuthContext, getRequestSettings } from "../../header/lib/authentication";
import { Observable, Subject } from "rxjs";
import { AllTaskTypesDataContract, SingleTaskDataContract, TaskListContract, TodoTaskDataContract } from "./task.datacontracts";
import { useContext } from "react";
import { axiosInstance } from "@/config/APIconfig";

const getTodos = async (authData:AuthData | undefined, type:string | undefined, id?: string):Promise<any[] | any> => {
  if(!authData) throw new Error("Habitica API token missing or broken, login to get it");

  let requestSettings:AxiosRequestConfig = getRequestSettings(authData);
  
  if(!!id) {
    const response:AxiosResponse<SingleTaskDataContract> = await axiosInstance.get(`/tasks/${id}`, requestSettings);
    return response.data.data;
  }
  
  !!type ? requestSettings = {...requestSettings, params: {type: type.toString() +"s"}} :null;
  const response:AxiosResponse<TaskListContract> = await axiosInstance.get("/tasks/user", requestSettings);
  return response.data.data;
};

export const todoKeys = {
  all: (username: string | undefined)=> ['todos', username] as const,
  type: (username: string | undefined, type: TaskType) => [...todoKeys.all(username), type.toString() +"s"] as const,
  single: (username: string | undefined, id: string) => [...todoKeys.all(username), id] as const,
}

export function toDosQuery(type?:TaskType, id?:string) {
  const authData:AuthData | undefined = useContext<AuthData | undefined>(AuthContext);
  const queryKey = id ? 
    todoKeys.single(authData?.username, id) 
    :type ? 
      todoKeys.type(authData?.username, type) 
      :todoKeys.all(authData?.username);

  return useQuery({
    queryKey: queryKey,
    queryFn:  async () => await getTodos(authData, type, id),
    enabled: true,
    refetchInterval: 900000,
    refetchOnWindowFocus: false
  });
};

export  function convertServerDataToLocalData(rawTasks:AllTaskTypesDataContract[], storageData:Task[], habits:boolean, dailies: boolean, todos: boolean):Task[] {
  const data:AllTaskTypesDataContract[] = filterServerDataByType(rawTasks, habits, dailies, todos);
  const localData:Task[] = [];

  data.forEach(serverTask => {
    const storageTask = storageData.find(item => item.id === serverTask.id);
    let localTask:Task = {
      id: serverTask.id, 
      name: serverTask.text, 
      l_category: "uncategorized", 
      date: !!serverTask.nextDue ? serverTask.nextDue[0] : serverTask.date, 
      type: serverTask.type, 
      l_validated: false
    }
    if(!!storageTask) {
      localTask.l_category = storageTask.l_category;
      localTask.l_validated = storageTask.l_validated;
      localTask.l_validationDate = storageTask.l_validationDate;
    }
    localData.push(localTask);
  });
  return localData;
};

export const filterLocalDataByCategory = (category:EMCategory, allTasks:Task[]):Task[] => {
  return allTasks?.filter(item => item.l_category === category) || [] as Task[];
}

export const filterServerDataByType = (allTasks:AllTaskTypesDataContract[], habits:boolean, dailies:boolean, todos:boolean):AllTaskTypesDataContract[] => {
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

function getUpdateTodoTaskParameters(localtask: Task, authData: AuthData): AxiosRequestConfig {
  let queryBodyParameters:any = { data: {}};
  queryBodyParameters.data.date = localtask.date;
  return {...getRequestSettings(authData), ...queryBodyParameters};
}

const updateTodoTask = async (localtask: Task, authData:AuthData | undefined):Promise<TodoTaskDataContract> => {
  if(!authData) {
    throw new Error("No authentication data - login to reciveive");
  }
  const params = getUpdateTodoTaskParameters(localtask, authData);
  const response = await axiosInstance({method: 'put', url: `${params.baseURL}/tasks/${localtask.id}`, headers: params.headers, data: params.data});
  return response.data.data;
}

export function useTodoTasksMutation(authData:AuthData | undefined){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (localtask:Task) => await updateTodoTask(localtask, authData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all(authData?.username),
      });
      queryClient.invalidateQueries({
        queryKey: todoKeys.type(authData?.username, response.type),
      });
      queryClient.invalidateQueries({
        queryKey: todoKeys.single(authData?.username, response.id)
      });
    }
  });
} 