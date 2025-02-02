"use client";

import { useState, useEffect } from "react";
import { wsClient } from "@/lib/websocket";

export const DebugPanel = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnection = (status: boolean) => {
      setIsConnected(status);
      addLog(`WebSocket ${status ? "connected" : "disconnected"}`);
    };

    const handleMessage = (type: string, data: any) => {
      addLog(`Received ${type}: ${JSON.stringify(data)}`);
    };

    wsClient.onConnectionChange(handleConnection);
    wsClient.subscribe("*", handleMessage);

    return () => {
      wsClient.offConnectionChange(handleConnection);
      wsClient.unsubscribe("*", handleMessage);
    };
  }, []);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toISOString()} - ${message}`]);
  };

  return (
    <div className="fixed bottom-4 left-4 p-4 bg-black/90 border border-gray-700 rounded-lg max-w-md">
      <h3 className="text-white font-bold mb-2">Debug Panel</h3>
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-gray-400">
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      <div className="max-h-48 overflow-auto text-sm">
        {logs.map((log, i) => (
          <div key={i} className="text-gray-400 border-t border-gray-800 py-1">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};
