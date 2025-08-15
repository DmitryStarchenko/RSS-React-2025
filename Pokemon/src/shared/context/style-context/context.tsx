'use client';
import { createContext, Dispatch, SetStateAction } from 'react';

type Value = {
  isDarkTheme: boolean;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
};

const value = {
  isDarkTheme: false,
  setIsDarkTheme: () => {},
};

const StyleContext = createContext<Value>(value);
export default StyleContext;
