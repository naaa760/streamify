import { useMemo, useState } from "react";
import { Stream } from "@/types";

type FilterOperator = "equals" | "contains" | "greaterThan" | "lessThan";

interface FilterCondition {
  field: keyof Stream;
  operator: FilterOperator;
  value: string | number;
}

export const useAdvancedFilter = (data: Stream[]) => {
  const [filters, setFilters] = useState<FilterCondition[]>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return filters.every((filter) => {
        const value = item[filter.field];
        switch (filter.operator) {
          case "equals":
            return value === filter.value;
          case "contains":
            return String(value)
              .toLowerCase()
              .includes(String(filter.value).toLowerCase());
          case "greaterThan":
            return Number(value) > Number(filter.value);
          case "lessThan":
            return Number(value) < Number(filter.value);
          default:
            return true;
        }
      });
    });
  }, [data, filters]);

  const addFilter = (filter: FilterCondition) => {
    setFilters((prev) => [...prev, filter]);
  };

  const removeFilter = (index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  return {
    filters,
    filteredData,
    addFilter,
    removeFilter,
    clearFilters,
  };
};
