
export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;


export interface FeatureColor {
  value: string | number;

  color: string;

  hidden: boolean;
}

type Operator = "less-than" | "greater-than" | "equal"


export const getFeatureColor = (value: string | number, colors: FeatureColor[]): string => {
  return ""
}