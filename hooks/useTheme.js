import { useContext } from "react";
import { ThemeContext } from "../context/theme-provider";
import { themes } from "../themes/themes";

export const useTheme = () => {
  const { theme, setThemeValue } = useContext(ThemeContext);

  const setTheme = (value) => {
    document.body.style.setProperty("--color", themes[value].foreground);
    document.body.style.setProperty(
      "--background-color",
      themes[value].background
    );

    localStorage.setItem("cherniaev-com-theme", value);
    setThemeValue(value);
  };

  if (theme === "dark") setTheme(theme);

  return { theme: theme, setTheme };
};
