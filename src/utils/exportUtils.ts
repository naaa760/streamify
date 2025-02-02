import { Stream } from "@/types";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const exportToCSV = (data: Stream[], filename: string) => {
  const headers = ["Song Name", "Artist", "Date", "Streams", "Revenue"];
  const csvContent = [
    headers.join(","),
    ...data.map((item) =>
      [
        `"${item.songName}"`,
        `"${item.artist}"`,
        new Date(item.streamedAt).toLocaleDateString(),
        item.streams,
        item.revenue,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${filename}.csv`);
};

export const exportToExcel = (data: Stream[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Streams");
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToJSON = (data: Stream[], filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, `${filename}.json`);
};
