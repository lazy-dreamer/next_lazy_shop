import {useCallback, useRef} from "react";

export function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  return useCallback((...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      func(...args);
    }, delay);
  }, [func, delay]);
}