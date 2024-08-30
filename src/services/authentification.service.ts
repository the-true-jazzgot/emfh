import axios from "axios";
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

function parseResponse(response:LoginDataContract):AuthData{
  return {
    id: response.data.id,
    apiToken: response.data.apiToken,
    username: response.data.username
  }
}

const getAuthenticationData = async (userCredentials:UserCredentials):Promise<AuthData> => {
  const response = await axiosInstance.post<LoginDataContract>("/user/auth/local/login", {...userCredentials});
  return parseResponse(response.data);
}

export function useCredentialData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loginData:UserCredentials) => getAuthenticationData(loginData),
    mutationKey: ['authData']
  });
}