import { useEffect, useState } from "react";

export const useLocalStorage = <T>(id: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(id);
    if (storedValue) return JSON.parse(storedValue);

    if (typeof initialValue === "function") return (initialValue as () => T)();
    else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
};
