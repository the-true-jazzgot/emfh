import { AxiosRequestConfig } from "axios";
import { habiticaAPIconf } from "../../../config/APIconfig";
import { AuthData } from "../../../types";
import { createContext } from "react";



export interface UserCredentials {
  username: string,
  password: string
};

export function getRequestSettings(authData:AuthData | undefined):AxiosRequestConfig {
  if (!!authData) return {
    baseURL: habiticaAPIconf.baseURL,
    headers: {
      ...habiticaAPIconf.headers,
      'x-api-user' : authData.id, 
      'x-api-key' : authData.apiToken
    }
  };
  
  return habiticaAPIconf;
}

export const AuthContext = createContext<AuthData | undefined>(undefined);
