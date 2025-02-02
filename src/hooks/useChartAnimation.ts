import { useCallback } from "react";
import { motion } from "framer-motion";

export const useChartAnimation = (type: "bar" | "line" | "pie") => {
  const getAnimationProps = useCallback(() => {
    switch (type) {
      case "bar":
        return {
          initial: { scaleY: 0 },
          animate: { scaleY: 1 },
          transition: { duration: 0.5, ease: "easeOut" },
        };
      case "line":
        return {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1, ease: "easeInOut" },
        };
      case "pie":
        return {
          initial: { scale: 0, rotate: -90 },
          animate: { scale: 1, rotate: 0 },
          transition: { duration: 0.5, ease: "backOut" },
        };
      default:
        return {};
    }
  }, [type]);

  return {
    MotionPath: motion.path,
    MotionRect: motion.rect,
    MotionCircle: motion.circle,
    getAnimationProps,
  };
};
