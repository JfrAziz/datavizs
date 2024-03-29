/**
 * Remove some key from an object
 * @param obj any
 * @param omitKey string
 * @returns any
 */
export function omit(obj: any, omitKey: string[]) : any {
  return Object.keys(obj)
    .filter(key => !omitKey.includes(key))
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {});
}