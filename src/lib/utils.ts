import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosRequestConfig } from "axios";
import { habiticaAPIconf } from "../config/APIconfig";
import { AuthData } from "./types";

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

/**** Tailwind ****/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
