/**
 * return a data with column provided in filter params
 *
 * @param data
 * @param filter
 */
export const dataFilter = (data: Record<string, any>[], filter: string[]) => {
  return data.map((item) => {
    const data = {}
    for (let variable of filter) {
      Object.assign(data, { [variable]: item[variable] })
    }
    return data
  })
}
