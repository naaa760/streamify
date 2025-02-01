"use client";

import { useVirtual } from "react-virtual";
import { useRef, memo } from "react";
import { motion } from "framer-motion";
import { Stream } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatters";

interface Props {
  data: Stream[];
  rowHeight?: number;
}

export const VirtualizedTable = memo(({ data, rowHeight = 40 }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="max-h-[600px] overflow-auto"
      style={{
        height: `${Math.min(600, data.length * rowHeight)}px`,
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => {
          const item = data[virtualRow.index];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${rowHeight}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="border-b border-gray-800 hover:bg-white/5"
            >
              <div className="grid grid-cols-5 gap-4 px-4 py-2">
                <div className="truncate">{item.songName}</div>
                <div className="truncate">{item.artist}</div>
                <div>{formatDate(item.streamedAt)}</div>
                <div>{formatNumber(item.streams)}</div>
                <div className="truncate">{item.userId}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

VirtualizedTable.displayName = "VirtualizedTable";
