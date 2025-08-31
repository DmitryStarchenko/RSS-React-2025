export const formatValue = (value: number | undefined): string => {
  if (value === undefined || value === null) return 'N/A';
  if (typeof value === 'number') {
    if (value > 1000000) return (value / 1000000).toFixed(2) + 'M';
    if (value > 1000) return (value / 1000).toFixed(2) + 'K';
    return value.toFixed(2);
  }
  return 'N/A';
};
