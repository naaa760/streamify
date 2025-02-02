import { useEffect, useCallback } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { usePreferences } from "@/stores/usePreferences";

export const useKeyboardShortcuts = () => {
  const { toggleTheme } = useTheme();
  const { setTableRows } = usePreferences();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Check if target is an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Ctrl/Cmd + key combinations
      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case "d":
            event.preventDefault();
            toggleTheme();
            break;
          case "e":
            event.preventDefault();
            // Trigger export
            break;
          default:
            break;
        }
        return;
      }

      // Single key shortcuts
      switch (event.key) {
        case "?":
          // Show keyboard shortcuts modal
          break;
        case "1":
        case "2":
        case "3":
          // Switch between views
          break;
        default:
          break;
      }
    },
    [toggleTheme]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
};
