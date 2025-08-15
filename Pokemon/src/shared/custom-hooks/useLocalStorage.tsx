'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage(
  initialValue: string,
  key: string,
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    const item = localStorage.getItem(key);
    return item ? item : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}
