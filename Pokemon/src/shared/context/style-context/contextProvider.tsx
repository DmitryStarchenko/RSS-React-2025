'use client';
import { useState } from 'react';
import StyleContext from './context';

type ProviderProps = { children: React.ReactNode };

export default function StyleContextProvider({ children }: ProviderProps) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const value = {
    isDarkTheme,
    setIsDarkTheme,
  };

  return (
    <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
  );
}
