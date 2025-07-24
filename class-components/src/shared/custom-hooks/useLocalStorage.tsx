import { useEffect, useState } from 'react';

export function useLocalStorage(initialValue: string, key: string) {
  const getValue = () => {
    const value = localStorage.getItem(key);
    return value ? value : initialValue;
  };
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
}
