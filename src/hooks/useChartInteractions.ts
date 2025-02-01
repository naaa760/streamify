import { useState, useCallback } from "react";
import { usePreferences } from "@/stores/usePreferences";

export const useChartInteractions = () => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const { chartStyle } = usePreferences();

  const getAnimationConfig = useCallback(() => {
    return chartStyle === "modern"
      ? {
          animate: {
            duration: 800,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
          },
        }
      : {
          animate: {
            duration: 400,
            easing: "linear",
          },
          hover: {
            scale: 1.05,
            transition: { duration: 0.1 },
          },
        };
  }, [chartStyle]);

  const handleMouseEnter = useCallback((elementId: string) => {
    setHoveredElement(elementId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null);
  }, []);

  return {
    hoveredElement,
    handleMouseEnter,
    handleMouseLeave,
    getAnimationConfig,
  };
};
