"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const shortcuts = [
  { key: "Ctrl + D", description: "Toggle dark mode" },
  { key: "Ctrl + E", description: "Export data" },
  { key: "?", description: "Show keyboard shortcuts" },
  { key: "1-3", description: "Switch between views" },
];

export const KeyboardShortcutsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-black/50 border border-gray-700 rounded-full p-2 text-white hover:border-[#eb5757] transition-colors"
        aria-label="Show keyboard shortcuts"
      >
        ?
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-[10%] md:inset-auto md:top-[20%] md:left-1/2 md:-translate-x-1/2 max-w-lg w-full bg-black/90 border border-gray-700 rounded-lg p-6 z-50"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Keyboard Shortcuts
              </h2>
              <div className="space-y-2">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-400">
                      {shortcut.description}
                    </span>
                    <kbd className="px-2 py-1 bg-gray-800 rounded text-sm text-white">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
