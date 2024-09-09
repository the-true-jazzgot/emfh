import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosInstance } from "axios";
import { AuthData, EMCategory, Task } from "../types";
import { getGetRequestSettings } from "./authentification.service";

// interface ChecklistContract {
//   completed: boolean,
//   text: string,
//   id: string
// };

// type Attribute = "habit" | "daily" | "todo" | "reward";

// interface TaskContract {
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

// interface TaskListContract {
//   success:boolean,
//   data:any[],
//   notifications:any[]
// }

const axiosInstance:AxiosInstance = axios.create();

function convertRawDataToTasks(data:any):Task[] {
  return data.data.map((item: { id: any; text: any; }) => ({ id: item.id, name: item.text, category: "uncategorized" })) as Task[];
};

const getTodos = async (authData:AuthData | undefined):Promise<Task[]> => {
  if(!authData) {
    throw Error("Habitica API token missing or broken, login to get it");
  }

  console.log("geTodos - attempting API call")

  const response = await axiosInstance.get<any[]>("/tasks/user", getGetRequestSettings(authData));
  return convertRawDataToTasks(response.data);
};

export function toDosQuery() {
  const queryClient = useQueryClient();
  const authData:AuthData | undefined = queryClient.getQueryData(['authData']);

  return useQuery({
    queryKey: ['todos', authData?.username],
    queryFn:  async () => await getTodos(authData),
    enabled: !!authData,
    initialData: [] as Task[],
    refetchInterval: 1800000
  });
};

export const filterData = (category:EMCategory, allTasks:Task[]):Task[] => {
  return allTasks?.filter(item => item.category === category) || [] as Task[];
}

// let exampleData = {
//   "success":true,
//   "data":[{
//     "_id":"8a9d461b-f5eb-4a16-97d3-c03380c422a3",
//     "userId":"b0413351-405f-416f-8787-947ec1c85199",
//     "text":"15 minute break",
//     "type":"reward",
//     "notes":"",
//     "tags":[],
//     "value":10,
//     "priority":1,
//     "attribute":"str",
//     "challenge":{},
//     "group":{
//       "assignedUsers":[],
//       "approval":{
//         "required":false,
//         "approved":false,
//         "requested":false
//       }
//     },
//     "reminders":[],
//     "createdAt":"2017-01-07T17:52:09.121Z",
//     "updatedAt":"2017-01-11T14:25:32.504Z",
//     "id":"8a9d461b-f5eb-4a16-97d3-c03380c422a3"
//   },
//   ,{
//     "_id":"84c2e874-a8c9-4673-bd31-d97a1a42e9a3",
//     "userId":"b0413351-405f-416f-8787-947ec1c85199",
//     "alias":"prac31",
//     "text":"Practice Task 31",
//     "type":"daily",
//     "notes":"",
//     "tags":[],"value":1,
//     "priority":1,
//     "attribute":"str",
//     "challenge":{},
//     "group":{
//       "assignedUsers":[],
//       "approval":{
//         "required":false,
//         "approved":false,
//         "requested":false
//       }
//     },
//     "reminders":[{
//       "time":"2017-01-13T16:21:00.074Z",
//       "startDate":"2017-01-13T16:20:00.074Z",
//       "id":"b8b549c4-8d56-4e49-9b38-b4dcde9763b9"
//     }],
//     "createdAt":"2017-01-13T16:34:06.632Z",
//     "updatedAt":"2017-01-13T16:49:35.762Z",
//     "checklist":[{
//       "completed": true,
//       "text": "read wiki",
//       "id": "91edadda-fb62-4e6e-b110-aff26f936678"
//     },
//     {
//       "completed": false,
//       "text": "write code",
//       "id": "d1ddad50-ab22-49c4-8261-9996ae337b6a"
//     }],
//     "collapseChecklist":false,
//     "completed":true,
//     "history":[],
//     "streak":1,
//     "repeat":{
//       "su":false,
//       "s":false,
//       "f":true,
//       "th":true,
//       "w":true,
//       "t":true,
//       "m":true
//     },
//     "startDate":"2017-01-13T00:00:00.000Z",
//     "everyX":1,
//     "frequency":"weekly",
//     "id":"84c2e874-a8c9-4673-bd31-d97a1a42e9a3"
//   }],
//   "notifications":[]
// }
