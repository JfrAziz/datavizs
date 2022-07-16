import { useEffect } from "react";

/* 
|
| This code below part of debounce function implementation in typescript
|
| Volodymyr Yepishev https://github.com/Bwca/package__merry-solutions__debounce 
| 
*/
interface FunctionWithArguments {
  (...args: any): any;
}

/* 
|
| This code below part of debounce function implementation in typescript
|
| Volodymyr Yepishev https://github.com/Bwca/package__merry-solutions__debounce 
| 
*/
interface DebouncedFunction<F extends FunctionWithArguments> {
  (...args: Parameters<F>): Promise<ReturnType<F>>;
}

/* 
|
| This code below part of debounce function implementation in typescript
|
| Volodymyr Yepishev https://github.com/Bwca/package__merry-solutions__debounce 
| 
*/
interface DebounceReturn<F extends FunctionWithArguments> extends Array<DebouncedFunction<F> | (() => void)> {
  0: (...args: Parameters<F>) => Promise<ReturnType<F>>;
  1: () => void;
}

/* 
|
| This code below part of debounce function implementation in typescript
|
| Volodymyr Yepishev https://github.com/Bwca/package__merry-solutions__debounce 
| 
*/
function debounce<F extends FunctionWithArguments>(fn: F, ms: number): DebounceReturn<F> {
  let timer: ReturnType<typeof setTimeout>;

  const debouncedFunc: DebouncedFunction<F> = (...args) =>
    new Promise((resolve) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        resolve(fn(...args as unknown[]));
      }, ms);
    });

  const teardown = () => {
    clearTimeout(timer);
  };

  return [debouncedFunc, teardown];
}

/* 
|
| This code below part of debounce function implementation in typescript
|
| Volodymyr Yepishev https://github.com/Bwca/package__merry-solutions__debounce 
| 
*/
export const useDebounce = <F extends FunctionWithArguments>(fn: F, ms: number): DebouncedFunction<F> => {
  const [debouncedFun, teardown] = debounce(fn, ms);

  useEffect(() => () => teardown(), []);

  return debouncedFun;
};
