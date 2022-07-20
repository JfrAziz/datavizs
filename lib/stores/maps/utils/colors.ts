import { DEFAULT_FEATURE_COLOR } from "@config/colors";
import { Legend, LegendOperator } from "@stores/maps/types";

/**
 * compare a value with value in the legends use some operator to generate a color.
 * 
 * @param value 
 * @param legends 
 * @param operator 
 * @returns string
 */
export const getFeatureColor = (value: string | number, legends: Legend[], operator: LegendOperator): string => {
  let selectedColor: Legend | undefined = undefined
  switch (operator) {
    case "equal":
      selectedColor = legends.find(item => value === item.value)
      break;

    case "greater-than":
      selectedColor = legends.slice().reverse().find(item => value >= item.value)
      break;

    case "less-than":
      selectedColor = legends.find(item => value <= item.value)

      break;
  }
  return selectedColor ? selectedColor.color : DEFAULT_FEATURE_COLOR
}
