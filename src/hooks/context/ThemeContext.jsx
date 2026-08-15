/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../useLocalStorage";

const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  function toggleTheme() {
    setTheme((currentVal) => (currentVal === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = { theme, toggleTheme };

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
