import { useState, useEffect } from "react";

function checkValue(localvalue) {
  return isString(localvalue) ? localvalue : JSON.parse(localvalue);
}

function isString(localvalue) {
  return typeof localvalue === "string" ? true : false;
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    console.log(localValue);
    return localValue ? checkValue(localValue) : initialValue;
  });

  useEffect(() => {
    const temp = isString(value) ? value : JSON.stringify(value);
    localStorage.setItem(key, temp);
  }, [key, value]);

  return [value, setValue];
}
