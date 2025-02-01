import React, { createContext, useContext, useReducer } from "react";
import { DashboardState } from "../types/dashboard";

const initialState: DashboardState = {
  sortColumn: "streams",
  sortDirection: "desc",
  filters: {
    artist: "",
    songName: "",
    dateRange: [null, null],
  },
  selectedRevenueSource: null,
};

type Action =
  | { type: "SET_SORT"; payload: { column: string; direction: "asc" | "desc" } }
  | {
      type: "SET_FILTER";
      payload: { key: string; value: string | [Date | null, Date | null] };
    }
  | { type: "SET_REVENUE_SOURCE"; payload: string | null };

const dashboardReducer = (
  state: DashboardState,
  action: Action
): DashboardState => {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        sortColumn: action.payload.column,
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
    case "SET_REVENUE_SOURCE":
      return {
        ...state,
        selectedRevenueSource: action.payload,
      };
    default:
      return state;
  }
};

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
