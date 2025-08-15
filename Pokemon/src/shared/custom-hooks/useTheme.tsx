import { useContext } from 'react';
import { StyleContext } from '../context/style-context/context';

export function useTheme() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
