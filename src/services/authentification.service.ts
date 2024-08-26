import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function Authentication() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<Array<any>> => {
      const response = await fetch('https://habitica.com/api/v3/user/auth/local/login');
      return await response.json()
    },
  })
}