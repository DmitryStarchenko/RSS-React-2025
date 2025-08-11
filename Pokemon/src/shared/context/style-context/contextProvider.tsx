import { useState } from 'react';
import { StyleContext } from '.';

type ProviderProps = { children: React.ReactNode };

export function StyleContextProvider({ children }: ProviderProps) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const value = {
    isDarkTheme,
    setIsDarkTheme,
  };

  return (
    <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
  );
}
