"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

interface DashboardState {
  dateRange: { start: Date; end: Date };
  filters: {
    artist: string;
    songName: string;
    revenueSource: string;
  };
  sortBy: {
    column: string;
    direction: "asc" | "desc";
  };
}

type Action =
  | { type: "SET_DATE_RANGE"; payload: { start: Date; end: Date } }
  | { type: "SET_FILTERS"; payload: Partial<DashboardState["filters"]> }
  | { type: "SET_SORT"; payload: DashboardState["sortBy"] }
  | { type: "RESET_FILTERS" };

const initialState: DashboardState = {
  dateRange: {
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  },
  filters: {
    artist: "",
    songName: "",
    revenueSource: "",
  },
  sortBy: {
    column: "streams",
    direction: "desc",
  },
};

const dashboardReducer = (
  state: DashboardState,
  action: Action
): DashboardState => {
  switch (action.type) {
    case "SET_DATE_RANGE":
      return { ...state, dateRange: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };
    default:
      return state;
  }
};

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
