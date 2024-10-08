import { AuthData } from "@/types";
import { getRequestSettings, UserCredentials } from "./authentication";
import { axiosInstance } from "@/config/APIconfig";
import { useQueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { useSessionState } from "@/hooks/use-session-state";
import { useEffect, useState } from "react";
import { Subject } from "rxjs";

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

const subject:Subject<UserCredentials> = new Subject<UserCredentials>();
export const updateCredentials = (credentials: UserCredentials):void => subject.next(credentials);

function useCredentialData(userCredentials:UserCredentials, enabled?:boolean):UseQueryResult<LoginDataContract> {
  const queryClient = useQueryClient();
  const authData:AuthData | undefined = queryClient.getQueryData(['authData']);

  const getAuthenticationData = async (userCredentials:UserCredentials):Promise<LoginDataContract> => {
    const response = await axiosInstance.post<LoginDataContract>("/user/auth/local/login", {...userCredentials});
    return response.data;
  }

  return useQuery<LoginDataContract>({
    queryFn: async () => await getAuthenticationData(userCredentials),
    queryKey: ['authData'],
    enabled: enabled && userCredentials.username !== "" && userCredentials.password !== "" && !authData
  });
};

export function useAuthData() {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({username: "", password: ""});
  const [authData,setAuthData] = useSessionState<AuthData | undefined>("emfh_login", undefined);
  const [requestSettings, setRequestSettings] = useState<AxiosRequestConfig>(getRequestSettings(authData));

  function parseResponse(response:LoginDataContract):AuthData{
    return {
      id: response.data.id,
      apiToken: response.data.apiToken,
      username: response.data.username
    };
  }

  const {data, isSuccess, refetch} = useCredentialData(userCredentials, !!authData);

  useEffect(()=>{
    if(userCredentials.username !== "") {
      refetch();
      if(!!data)
        setAuthData(parseResponse(data));
    }
  }, [userCredentials]);

  useEffect(()=>{
    if(!!data) {
      setAuthData(parseResponse(data));
    }
  }, [data]);

  useEffect(()=>{
    if(!!authData) {
      setRequestSettings(getRequestSettings(authData));
    }
  }, [authData]);

  useEffect(()=>{
    const subscription = subject.subscribe(
      (credentials:UserCredentials)=>{
        setUserCredentials(credentials);
        if(credentials.username === ""){
          setAuthData(undefined);
        }
      }
    );

    return ()=>subscription.unsubscribe();
  });
  
  return {authData, isSuccess, requestSettings};
}
