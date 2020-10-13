import React from "react";
import { toggleButton, icon } from "./theme-toggle-button.module.css";
import { useTheme } from "../hooks/useTheme";

export default function Toggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      title={`Switch to the ${theme === "dark" ? "light" : "dark"} theme`}
      className={toggleButton}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
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
