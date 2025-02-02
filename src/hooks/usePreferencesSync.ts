import { useEffect } from "react";
import { usePreferences } from "@/stores/usePreferences";

export const usePreferencesSync = () => {
  const preferences = usePreferences();

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user_preferences");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        preferences.setTheme(parsed.theme);
        preferences.setChartStyle(parsed.chartStyle);
        preferences.setTableRows(parsed.tableRows);
      } catch (error) {
        console.error("Failed to parse stored preferences:", error);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const data = {
      theme: preferences.theme,
      chartStyle: preferences.chartStyle,
      tableRows: preferences.tableRows,
    };
    localStorage.setItem("user_preferences", JSON.stringify(data));
  }, [preferences.theme, preferences.chartStyle, preferences.tableRows]);

  return preferences;
};
