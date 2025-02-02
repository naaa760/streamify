export class WebSocketClient {
  private static instance: WebSocketClient;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private connectionListeners = new Set<(status: boolean) => void>();
  private isConnected = false;

  private constructor() {
    this.connect();
  }

  static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  private connect() {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001";
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.isConnected = true;
      this.connectionListeners.forEach((cb) => cb(true));
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data);
        this.notifyListeners(type, data);
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    this.ws.onclose = () => {
      this.isConnected = false;
      this.connectionListeners.forEach((cb) => cb(false));
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, 1000 * Math.pow(2, this.reconnectAttempts));
      }
    };
  }

  subscribe(type: string, callback: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(callback);
  }

  unsubscribe(type: string, callback: (data: any) => void) {
    this.listeners.get(type)?.delete(callback);
  }

  private notifyListeners(type: string, data: any) {
    this.listeners.get(type)?.forEach((callback) => callback(data));
  }

  getStatus(): boolean {
    return this.isConnected;
  }

  onConnectionChange(callback: (status: boolean) => void) {
    this.connectionListeners.add(callback);
  }

  offConnectionChange(callback: (status: boolean) => void) {
    this.connectionListeners.delete(callback);
  }
}

export const wsClient = WebSocketClient.getInstance();
