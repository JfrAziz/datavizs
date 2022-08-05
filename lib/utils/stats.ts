/**
 * return quantile value or array of quantile value
 * 
 * @param array sorted array
 * @param quantileValue 
 * @returns 
 */
export function quantile(array: number[], quantileValue: number | number[]) : number | number[] {
  if (Array.isArray(quantileValue)) {
    const result: number[] = []

    quantileValue.forEach(value => result.push(quantile(array, value) as number))

    return result
  }

  const idx = quantileValue * (array.length - 1)

  if (Math.floor(idx) === idx) return array[idx]

  const index = Math.floor(idx)

  return array[index] + (array[index + 1] - array[index]) * (idx - Math.floor(idx));
}