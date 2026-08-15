import { useState, useEffect } from "react";

function localStorageValue(localvalue) {
  return typeof localvalue === "string" ? localvalue : JSON.parse(localvalue);
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);

    return localValue ? localStorageValue(localValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
