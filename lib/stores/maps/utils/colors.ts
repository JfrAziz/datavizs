import { Legend } from "@stores/maps/types";
import { DEFAULT_FEATURE_COLOR } from "@config/colors";

/**
 * compare a value with value in the legends use some operator to generate a color.
 * 
 * @param value 
 * @param legends 
 * @param operator 
 * @returns string
 */
export const getFeatureColor = (value: string | number, legends: Legend[]): string => {
  let selectedColor: Legend | undefined = undefined

  selectedColor = legends.find(item => {
    if (item.type === "equals") return item.value[0] === value

    return item.value[0] <= value && item.value[1] > value
  })
  return selectedColor ? selectedColor.color : DEFAULT_FEATURE_COLOR
}
