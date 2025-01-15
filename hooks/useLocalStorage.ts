import { useState, useEffect } from "react";

type UseLocalStorage<T> = {
  localItems: T;
  setLocalItems: (value: T) => void;
};

export function useLocalStorage<T>(
  key: string = "localCartItems",
  initialValue: T = [] as unknown as T,
): UseLocalStorage<T> {
  const [localItems, setLocalItemsState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setLocalItems = (value: T) => {
    try {
      const valueToStore = JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
      setLocalItemsState(value);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedValue = localStorage.getItem(key);
        setLocalItemsState(
          storedValue ? (JSON.parse(storedValue) as T) : initialValue,
        );
      } catch (error) {
        console.error(`Error syncing localStorage key "${key}":`, error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return { localItems, setLocalItems };
}
