/**
 * generate random hex color
 * 
 * @returns string
 */
 export const randomColor = () : string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

