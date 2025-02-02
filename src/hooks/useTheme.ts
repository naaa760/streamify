import { useEffect } from "react";
import { usePreferences } from "@/stores/usePreferences";

const themes = {
  dark: {
    background: "#000000",
    foreground: "#ffffff",
    primary: "#eb5757",
    secondary: "#333333",
    accent: "#70a1ff",
    success: "#7bed9f",
    error: "#ff4757",
    warning: "#ffa502",
  },
  light: {
    background: "#ffffff",
    foreground: "#000000",
    primary: "#eb5757",
    secondary: "#f5f5f5",
    accent: "#4d7cfe",
    success: "#2ed573",
    error: "#ff4757",
    warning: "#ffa502",
  },
};

export const useTheme = () => {
  const { theme } = usePreferences();

  useEffect(() => {
    const root = document.documentElement;
    const colors = themes[theme];

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme]);

  return themes[theme];
};
