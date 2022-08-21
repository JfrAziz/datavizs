/**
 * check value is NaN and return default number value
 * 
 * @param value 
 * @param fallback 
 * @returns 
 */
export const handleNaN = (value: any, fallback: number) => {
  if (isNaN(value)) return fallback;
  return value
} 