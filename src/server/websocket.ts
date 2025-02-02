import WebSocket, { WebSocketServer } from "ws";

interface StreamUpdate {
  type: "stream_update";
  data: {
    id: string;
    songName: string;
    streams: number;
  };
}

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  // Send test data every 5 seconds
  const interval = setInterval(() => {
    const update: StreamUpdate = {
      type: "stream_update",
      data: {
        id: Math.random().toString(),
        songName: "Test Song",
        streams: Math.floor(Math.random() * 1000),
      },
    };
    ws.send(JSON.stringify(update));
  }, 5000);

  ws.on("close", () => {
    clearInterval(interval);
  });
});
