import { useEffect, useRef } from "react";

export const useA11y = (options: {
  ariaLabel?: string;
  role?: string;
  description?: string;
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    if (options.ariaLabel) {
      element.setAttribute("aria-label", options.ariaLabel);
    }
    if (options.role) {
      element.setAttribute("role", options.role);
    }
    if (options.description) {
      element.setAttribute("aria-description", options.description);
    }

    return () => {
      element.removeAttribute("aria-label");
      element.removeAttribute("role");
      element.removeAttribute("aria-description");
    };
  }, [options]);

  return ref;
};
