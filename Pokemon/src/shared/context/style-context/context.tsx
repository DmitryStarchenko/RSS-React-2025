'use client';
import { createContext } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const StyleContext = createContext<ThemeContextType | undefined>(
  undefined,
);
