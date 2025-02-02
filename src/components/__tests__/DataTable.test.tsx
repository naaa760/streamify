import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "../DataTable";
import { DashboardProvider } from "@/context/DashboardContext";

describe("DataTable", () => {
  it("renders the table with data", () => {
    render(
      <DashboardProvider>
        <DataTable />
      </DashboardProvider>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("allows sorting by clicking column headers", () => {
    render(
      <DashboardProvider>
        <DataTable />
      </DashboardProvider>
    );

    const songHeader = screen.getByText(/song/i);
    fireEvent.click(songHeader);

    // Check if sort indicator is visible
    expect(screen.getByTestId("sort-indicator")).toBeInTheDocument();
  });
});
