import { useEffect } from "react";

interface FunctionWithArguments {
  (...args: any): any;
}


interface DebouncedFunction<F extends FunctionWithArguments> {
  (...args: Parameters<F>): Promise<ReturnType<F>>;
}


interface DebounceReturn<F extends FunctionWithArguments> extends Array<DebouncedFunction<F> | (() => void)> {
  0: (...args: Parameters<F>) => Promise<ReturnType<F>>;
  1: () => void;
}

/**
 * Debounce function implementation in typescript
 * 
 * Volodymyr Yepishev https://github.com/Bwca/package__merry-solutions__debounce 
 * 
 * @param fn function
 * @param ms milisecond
 * @returns 
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

/**
 * hooks function for debounce implementation in typescript
 * 
 * @param fn 
 * @param ms 
 * @returns 
 */
export const useDebounce = <F extends FunctionWithArguments>(fn: F, ms: number): DebouncedFunction<F> => {
  const [debouncedFun, teardown] = debounce(fn, ms);

  useEffect(() => () => teardown(), []);

  return debouncedFun;
};
