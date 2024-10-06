import { Dispatch, useEffect, useState } from "react";

export function useStorageState<T>(defaultValue: T, key: string):[T, Dispatch<T>] {
  const [value, setValue] = useState(() => {
    const storageValue:string | null = window.localStorage.getItem(key);

    return storageValue !== null
      ? JSON.parse(storageValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
