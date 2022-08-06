/**
 * generate random hex color
 * 
 * @returns string
 */
export const randomColor = (): string => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    const random = Math.random();
    const bit = (random * 16) | 0;
    color += (bit).toString(16);
  };
  return color;
};

