import { useEffect } from 'react';

export const useClickOutside = (
  elementId: string,
  callback: () => void,
  isActive: boolean = true,
) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      const element = document.getElementById(elementId);
      if (element && !element.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementId, callback, isActive]);
};
