export function omit(obj: any, omitKey: string) : any{
  return Object.keys(obj)
    .filter(key => key != omitKey)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {});
}