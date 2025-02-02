"use client";

import { createContext, useContext, useEffect } from "react";
import { usePreferences } from "@/stores/usePreferences";

const ThemeContext = createContext<{
  theme: "dark" | "light";
  toggleTheme: () => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = usePreferences();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
