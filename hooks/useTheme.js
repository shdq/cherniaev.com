import { useContext } from "react";
import { ThemeContext } from "../context/theme-provider";

export const useTheme = () => useContext(ThemeContext);
