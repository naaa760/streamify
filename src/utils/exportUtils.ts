import { Stream } from "@/types";

export const exportToCSV = (data: Stream[], filename: string) => {
  const headers = [
    "Song Name",
    "Artist",
    "Date Streamed",
    "Streams",
    "User ID",
    "Revenue",
    "Revenue Source",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((item) =>
      [
        `"${item.songName}"`,
        `"${item.artist}"`,
        new Date(item.streamedAt).toISOString(),
        item.streams,
        item.userId,
        item.revenue,
        `"${item.revenueSource}"`,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
