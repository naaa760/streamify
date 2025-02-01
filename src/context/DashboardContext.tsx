"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

interface DashboardState {
  sortBy: string;
  sortDirection: "asc" | "desc";
  filters: {
    artist: string;
    songName: string;
    dateRange: [Date | null, Date | null];
  };
  selectedRevenueSector: string | null;
  timeRange: "1w" | "1m" | "3m" | "6m" | "1y" | "all";
}

type DashboardAction =
  | { type: "SET_SORT"; payload: { column: string; direction: "asc" | "desc" } }
  | { type: "SET_FILTER"; payload: { key: string; value: any } }
  | { type: "SET_REVENUE_SECTOR"; payload: string | null }
  | { type: "SET_TIME_RANGE"; payload: DashboardState["timeRange"] };

const initialState: DashboardState = {
  sortBy: "streams",
  sortDirection: "desc",
  filters: {
    artist: "",
    songName: "",
    dateRange: [null, null],
  },
  selectedRevenueSector: null,
  timeRange: "1m",
};

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
} | null>(null);

function dashboardReducer(
  state: DashboardState,
  action: DashboardAction
): DashboardState {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload.column,
        sortDirection: action.payload.direction,
      };
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };
    case "SET_REVENUE_SECTOR":
      return {
        ...state,
        selectedRevenueSector: action.payload,
      };
    case "SET_TIME_RANGE":
      return {
        ...state,
        timeRange: action.payload,
      };
    default:
      return state;
  }
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
