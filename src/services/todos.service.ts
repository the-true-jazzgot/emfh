import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../types";

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
  return data.map(item => ({ id: item.id, name: item.title })) as Task[];
};

const getTodos = async () => {
  const response = await todosApi.get("");
  return convertRawDataToTasks(response.data);
};

export function toDosQuery() {
  return useQuery({queryKey: ['todos'], queryFn: getTodos});
};