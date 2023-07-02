export const sort = (
  a: any,
  b: any,
  type?: "string" | "number" | any,
  reverse: boolean = false
) => {
  console.log("sort fn called")
  const firstItem = (reverse ? b : a) ?? ""
  const secondItem = (reverse ? a : b) ?? ""

  if (type === "number") return Number(firstItem) - Number(secondItem)

  return firstItem.localeCompare(secondItem)
}
