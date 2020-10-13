import React, { useState, useEffect, createContext } from "react";

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [themeValue, setThemeValue] = useState("light");

  useEffect(() => {
    const defaultTheme = localStorage["cherniaev-com-theme"]
      ? localStorage.getItem("cherniaev-com-theme")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    setThemeValue(defaultTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themeValue, setThemeValue }}>
      {children}
    </ThemeContext.Provider>
  );
};
