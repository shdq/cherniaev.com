import { useTheme, Button } from "spartak-ui";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const Toggle = () => {
  const { theme, setTheme } = useTheme();
  const isThemeDark = theme === "dark";
  return (
    <Button
      onClick={() => {
        setTheme(isThemeDark ? "light" : "dark");
      }}
      icon={isThemeDark ? <IconSun /> : <IconMoon />}
      variant="text"
    />
  );
};
