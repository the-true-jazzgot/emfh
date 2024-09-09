import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AuthData, EMCategory, Task } from "../types";
import { getGetRequestSettings } from "./authentification.service";

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
  data:any[],
  notifications:any[],
  userV: number,
  appVersion: string
}

const axiosInstance:AxiosInstance = axios.create();

export  function convertRawDataToTasks(data:any[]):Task[] {
  return data.map((item: { id: string, text: string }):Task => ({
    id: item.id, name: item.text, category: "uncategorized" 
  }));
};

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

export const filterData = (category:EMCategory, allTasks:Task[]):Task[] => {
  return allTasks?.filter(item => item.category === category) || [] as Task[];
}

