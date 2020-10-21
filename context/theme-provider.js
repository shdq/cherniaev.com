import React, { useState, useEffect, createContext } from "react";
import { themes } from "../themes/themes";

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const defaultTheme = localStorage["cherniaev-com-theme"]
      ? localStorage.getItem("cherniaev-com-theme")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    if (theme !== defaultTheme) {
      changeTheme(defaultTheme, true);
    }
  }, []);

  const changeTheme = (theme, isSystemCall = false) => {
    document.body.style.setProperty("--color", themes[theme].foreground);
    document.body.style.setProperty(
      "--background-color",
      themes[theme].background
    );

    setTheme(theme);
    if (!isSystemCall) localStorage.setItem("cherniaev-com-theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
