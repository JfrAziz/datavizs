import { Legend } from "@stores/maps/types";
import { DEFAULT_FEATURE_COLOR } from "@config/colors";

/**
 * Legend value is an array value with size 1 or 2. If the type is equals, 
 * just index 0 is used for comparison, but if the type is range, index 0 and 1
 * were used. example [a, b] will be compared a <= value < b 
 * 
 * @param value 
 * @param legends 
 * @returns string
 */
export const getFeatureColor = (value: string | number, legends: Legend[]): string => {
  let selectedColor: Legend | undefined = undefined

  selectedColor = legends.find(item => {
    if (item.type === "single") return item.value.toString() === value.toString()

    if (item.value.min === undefined || item.value.max === undefined) return false

    return item.value.min <= value && item.value.max >= value
  })
  return selectedColor ? selectedColor.color : DEFAULT_FEATURE_COLOR
}
