import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthData, Task, TaskType } from "../../../lib/types";
import { SingleTaskDataContract, TaskListContract, TodoTaskDataContract } from "./task.datacontracts";
import { useContext } from "react";
import { axiosInstance } from "@/config/APIconfig";
import { AuthContext } from "@/lib/contexts";
import { getRequestSettings } from "@/lib/utils";

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

export function useTodosQuery(type?:TaskType, id?:string) {
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