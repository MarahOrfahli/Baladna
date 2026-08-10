/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const ThemeContext = createContext("light");
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((currentVal) => (currentVal === "light" ? "dark" : "light"));
  }

  const value = { theme, toggleTheme };

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
