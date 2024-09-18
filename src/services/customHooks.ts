import { Dispatch, useEffect, useState } from "react";

export function usePersistState<T>(defaultValue: T, key: string):[T, Dispatch<T>] {
  const [value, setValue] = useState(() => {
    const stickyValue:string | null = window.localStorage.getItem(key);

    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function useSessionState() {

}