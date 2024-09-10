import axios, { AxiosRequestConfig } from "axios";
import { habiticaAPIconf } from "../config/APIconfig";
import { useQuery } from "@tanstack/react-query";
import { AuthData } from "../types";

interface LoginDataContract {
  appVersion: string,
  data:{ 
    id: string,
    apiToken: string,
    newUser: boolean,
    username: string
  },
  success: boolean
};

export interface UserCredentials {
  username: string,
  password: string
};

export const axiosInstance = axios.create(habiticaAPIconf); //TODO: move to more general service

function parseResponse(response:LoginDataContract):AuthData{
  return {
    id: response.data.id,
    apiToken: response.data.apiToken,
    username: response.data.username
  };
}

const getAuthenticationData = async (userCredentials:UserCredentials):Promise<AuthData> => {
  const response = await axiosInstance.post<LoginDataContract>("/user/auth/local/login", {...userCredentials});
  return parseResponse(response.data);
}

export function useCredentialData(userCredentials:UserCredentials) {
  return useQuery({
    queryFn: async () => await getAuthenticationData(userCredentials),
    queryKey: ['authData'],
    enabled: userCredentials.username !== "" && userCredentials.password !== ""
  });
};

export function getRequestSettings(authData:AuthData):AxiosRequestConfig {
  if (authData) return {
    baseURL: habiticaAPIconf.baseURL,
    headers: {
      ...habiticaAPIconf.headers,
      'x-api-user' : authData.id, 
      'x-api-key' : authData.apiToken
    }
  };
  
  return habiticaAPIconf;
}