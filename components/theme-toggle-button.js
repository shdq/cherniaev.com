import React from "react";
import { toggleButton, icon } from "./theme-toggle-button.module.css";
import { useTheme } from "../hooks/useTheme";

export default function Toggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      title={`Switch to the ${nextTheme} theme`}
      className={toggleButton}
      onClick={() => {
        setTheme(nextTheme);
      }}
    >
      {theme === "dark" ? (
        <img className={icon} src="/images/sun.svg" alt="Sun Icon" />
      ) : (
        <img className={icon} src="/images/moon.svg" alt="Moon Icon" />
      )}
    </button>
  );
}
