import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EMCategory, Task } from "../types";

interface JsonPlaceholderTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const todosApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos'
});

function convertRawDataToTasks(data:JsonPlaceholderTask[]):Task[] {
  return data.map(item => ({ id: item.id, name: item.title, category: EMCategory.uncategorized })) as Task[];
};

const getTodos = async () => {
  const response = await todosApi.get<JsonPlaceholderTask[]>("");
  return convertRawDataToTasks(response.data);
};

export function toDosQuery() {
  return useQuery({queryKey: ['todos'], queryFn: getTodos});
};