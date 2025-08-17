'use client';
import { useEffect, useState } from 'react';
import { StyleContext } from './context';

type ProviderProps = { children: React.ReactNode };

export function StyleContextProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return (
    <StyleContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </StyleContext.Provider>
  );
}
