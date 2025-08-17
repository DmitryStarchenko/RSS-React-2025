import { useEffect, useState } from 'react';

export function useLocalStorage(
  initialValue: string,
  key: string,
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    setValue(item ? item : initialValue);
  }, [key, initialValue]);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}
