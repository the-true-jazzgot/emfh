import axios, { AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import { habiticaAPIconf } from "../config/APIconfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthData } from "../types";

export interface UserCredentials {
  username: string,
  password: string
};
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

const axiosInstance = axios.create(habiticaAPIconf);

export let tempAuthData:AuthData;

function parseResponse(response:LoginDataContract):AuthData{
  return {
    id: response.data.id,
    apiToken: response.data.apiToken,
    username: response.data.username
  }
}

const getAuthenticationData = async (userCredentials:UserCredentials):Promise<AuthData> => {
  const response = await axiosInstance.post<LoginDataContract>("/user/auth/local/login", {...userCredentials});
  tempAuthData = parseResponse(response.data); //temporary workaround
  console.log(tempAuthData);
  return parseResponse(response.data);
}

export function useCredentialData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loginData:UserCredentials):Promise<AuthData> => getAuthenticationData(loginData),
    mutationKey: ['authData']
  });
};

export function getGetRequestSettings(authData:AuthData = tempAuthData):AxiosRequestConfig {
  console.log({
    baseURL: habiticaAPIconf.baseURL,
    headers: {
      ...habiticaAPIconf.headers,
      'x-api-user' : authData?.id, 
      'x-api-key' : authData?.apiToken
    }
  });
  if (authData) return {
    baseURL: habiticaAPIconf.baseURL,
    headers: {
      ...habiticaAPIconf.headers,
      'x-api-user' : authData?.id, 
      'x-api-key' : authData?.apiToken
    }
  };
  
  return habiticaAPIconf;
}