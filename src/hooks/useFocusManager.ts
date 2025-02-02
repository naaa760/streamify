import { useCallback, useRef } from "react";

export const useFocusManager = (itemsCount: number) => {
  const currentFocusIndex = useRef(0);

  const handleKeyNavigation = useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event;
      let newIndex = currentFocusIndex.current;

      switch (key) {
        case "ArrowDown":
          newIndex = Math.min(currentFocusIndex.current + 1, itemsCount - 1);
          break;
        case "ArrowUp":
          newIndex = Math.max(currentFocusIndex.current - 1, 0);
          break;
        case "Home":
          newIndex = 0;
          break;
        case "End":
          newIndex = itemsCount - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      currentFocusIndex.current = newIndex;
      const element = document.querySelector(
        `[data-focus-index="${newIndex}"]`
      ) as HTMLElement;
      element?.focus();
    },
    [itemsCount]
  );

  return {
    handleKeyNavigation,
    getFocusProps: (index: number) => ({
      "data-focus-index": index,
      tabIndex: 0,
      onKeyDown: handleKeyNavigation,
    }),
  };
};
