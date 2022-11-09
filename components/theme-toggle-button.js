import Image from "next/image";
import sunIcon from "../public/images/sun.svg";
import moonIcon from "../public/images/moon.svg";

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
        <Image src={sunIcon} className={icon} alt="Sun Icon" />
      ) : (
        <Image src={moonIcon} className={icon} alt="Moon Icon" />
      )}
    </button>
  );
}
