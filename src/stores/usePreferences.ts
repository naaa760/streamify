import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Preferences {
  theme: "dark" | "light";
  chartStyle: "modern" | "classic";
  tableRows: number;
  dashboardLayout: string[];
  setTheme: (theme: "dark" | "light") => void;
  setChartStyle: (style: "modern" | "classic") => void;
  setTableRows: (rows: number) => void;
  setDashboardLayout: (layout: string[]) => void;
}

export const usePreferences = create<Preferences>()(
  persist(
    (set) => ({
      theme: "dark",
      chartStyle: "modern",
      tableRows: 10,
      dashboardLayout: ["metrics", "charts", "table"],
      setTheme: (theme) => set({ theme }),
      setChartStyle: (chartStyle) => set({ chartStyle }),
      setTableRows: (tableRows) => set({ tableRows }),
      setDashboardLayout: (dashboardLayout) => set({ dashboardLayout }),
    }),
    {
      name: "user-preferences",
    }
  )
);
