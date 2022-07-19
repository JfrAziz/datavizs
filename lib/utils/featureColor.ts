import { DEFAULT_FEATURE_COLOR } from "@config/colors";


export interface FeatureColor {
  value: string | number;

  color: string;

  hidden: boolean;
}

export type Operator = "less-than" | "greater-than" | "equal"


export const getFeatureColor = (value: string | number, colors: FeatureColor[], operator: Operator): string => {
  let selectedColor: FeatureColor | undefined = undefined
  switch (operator) {
    case "equal":
      selectedColor = colors.find(item => value === item.value)
      break;

    case "greater-than":
      selectedColor = colors.slice().reverse().find(item => value >= item.value)
      console.log(selectedColor)
      break;

    case "less-than":
      selectedColor = colors.find(item => value <= item.value)

      break;
  }
  console.log(value)
  return selectedColor ? selectedColor.color : DEFAULT_FEATURE_COLOR
}


export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
