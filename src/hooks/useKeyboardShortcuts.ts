import { useEffect } from "react";

type ShortcutHandler = () => void;

interface ShortcutMap {
  [key: string]: ShortcutHandler;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutMap) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isCtrlPressed = event.ctrlKey || event.metaKey;

      // Handle Ctrl/Cmd + key combinations
      if (isCtrlPressed) {
        const shortcutKey = `ctrl+${key}`;
        if (shortcuts[shortcutKey]) {
          event.preventDefault();
          shortcuts[shortcutKey]();
        }
      }
      // Handle single key shortcuts
      else if (shortcuts[key]) {
        event.preventDefault();
        shortcuts[key]();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};
