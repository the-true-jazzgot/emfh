import { useQuery } from "@tanstack/react-query"

export function toDosQuery() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<Array<any>> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      return await response.json()
    },
  })
}