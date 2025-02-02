import { useState, useCallback } from "react";
import { usePreferences } from "@/stores/usePreferences";
import { useAnalytics } from "./useAnalytics";

export const useChartInteractions = (chartId: string) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [selectedElements, setSelectedElements] = useState<Set<string>>(
    new Set()
  );
  const { chartStyle } = usePreferences();
  const { trackEvent } = useAnalytics();

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

  const handleMouseEnter = useCallback(
    (elementId: string) => {
      setHoveredElement(elementId);
      trackEvent("chart_hover", { chartId, elementId });
    },
    [chartId, trackEvent]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null);
  }, []);

  const handleClick = useCallback(
    (elementId: string) => {
      setSelectedElements((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(elementId)) {
          newSet.delete(elementId);
        } else {
          newSet.add(elementId);
        }
        return newSet;
      });
      trackEvent("chart_click", { chartId, elementId });
    },
    [chartId, trackEvent]
  );

  const getElementStyle = useCallback(
    (elementId: string) => {
      const isHovered = hoveredElement === elementId;
      const isSelected = selectedElements.has(elementId);

      return {
        opacity: isHovered || isSelected ? 1 : 0.8,
        scale: isHovered ? 1.1 : isSelected ? 1.05 : 1,
        transition: { duration: chartStyle === "modern" ? 0.3 : 0.1 },
      };
    },
    [hoveredElement, selectedElements, chartStyle]
  );

  return {
    hoveredElement,
    selectedElements,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    getElementStyle,
    getAnimationConfig,
  };
};
