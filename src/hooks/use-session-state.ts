import { Dispatch, useEffect, useState } from "react";

export function useSessionState<T>(key:string, defaultValue:T):[T, Dispatch<T>] {
  const [state, setState] = useState<T>(getSessionData());

  function getSessionData():T {
    const sessionData:string | null = window.sessionStorage.getItem(key);
    if(sessionData !== null) 
    {
      console.log(sessionData);
      return JSON.parse(sessionData);
    }
    return defaultValue;
  }

  useEffect(() => {
    if(getSessionData() !== defaultValue) setState(getSessionData());
  }, []);

  useEffect(() => {
    if(state !== undefined)
      window.sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}