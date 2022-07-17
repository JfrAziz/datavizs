/* 
|
| TODO: add comment
|
*/
export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

/* 
|
| TODO: add comment
|
*/
export interface FeatureColor {
  value: string | number;

  color: string;

  hidden: boolean;
}

/* 
|
| TODO: add comment
|
*/
export const getFeatureColor = (value: string | number, colors: FeatureColor[]): string => {
  return ""
}