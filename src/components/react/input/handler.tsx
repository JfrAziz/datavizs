/**
 * handle return output from switchInput to boolean
 *
 * @param e
 * @param currentValue
 * @returns
 */
export const switchHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  currentValue?: boolean
): boolean => (!currentValue ? e.currentTarget.value === "on" : false)
