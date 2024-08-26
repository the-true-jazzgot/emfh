import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const todosApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos'
});

export const getTodos = async () => {
  const response = await todosApi.get("");
  return response.data;
}

export function toDosQuery() {
  return useQuery({queryKey: ['todos'], queryFn: getTodos});
}