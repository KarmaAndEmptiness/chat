type WSOption = {
  heartbeatInterval?: number;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
};

export interface IWSListener {
  onClose?: (ev: CloseEvent) => any;
  onError?: (ev: Event) => any;
  onMessage?: (ev: MessageEvent) => any;
  onOpen?: (ev: Event) => any;

  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}

class WS implements IWSListener {
  constructor(
    getUrl: () => string | URL,
    options: WSOption = {},
    protocols?: string | string[]
  ) {
    this.getUrl = getUrl;
    this.protocols = protocols;
    this.heartbeatInterval = options.heartbeatInterval ?? 5000;
    this.reconnectInterval = options.reconnectInterval ?? 3000;
    this.maxReconnectAttempts = options.maxReconnectAttempts ?? 3;
  }

  connect(): void {
    this.url = this.getUrl();
    if (!this.url) return;
    this.socket = new WebSocket(this.url, this.protocols);
    this.socket.onopen = (ev: Event) => {
      console.log("✅ WebSocket 连接成功");
      this.reconnectAttempts = 0;
      this.startHeartbeat();
      this.onOpen?.(ev);
    };
    this.socket.onmessage = (ev: MessageEvent) => {
      this.onMessage?.(ev);
    };
    this.socket.onclose = (ev: CloseEvent) => {
      console.warn("⚠️ WebSocket 连接关闭，尝试重连...");
      this.stopHeartbeat();
      this.onClose?.(ev);
      this.reconnect();
    };
    this.socket.onerror = (ev: Event) => {
      console.error("❌ WebSocket 出错:", ev);
      this.onError?.(ev);
      this.close();
    };
  }

  isOpen() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  close(): void {
    this.stopHeartbeat();
    this.socket && this.socket.close();
    this.reconnectTimer && clearTimeout(this.reconnectTimer);
  }

  onOpen?: (ev: Event) => any;
  onMessage?: (ev: MessageEvent) => any;
  onClose?: (ev: CloseEvent) => any;
  onError?: (ev: Event) => any;

  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.socket?.addEventListener<K>(type, listener, options);
  }

  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void {
    this.socket?.removeEventListener<K>(type, listener, options);
  }

  sendMessage(message: any): void {
    if (this.socket && this.isOpen()) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket 未连接，消息发送失败");
    }
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      this.sendMessage({ type: "ping", time: Date.now() });
    }, this.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = undefined;
    }
  }

  private reconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.reconnectTimer = setTimeout(() => {
        console.log(`🔄 正在重连... 第 ${this.reconnectAttempts} 次`);
        this.connect();
      }, this.reconnectInterval);
    } else {
      console.error("🚫 达到最大重连次数，停止重连");
    }
  }

  private socket: WebSocket | null = null;
  private url: string | URL = '';
  private getUrl: () => string | URL;
  private reconnectAttempts: number = 0;
  private heartbeatTimer: number | undefined = undefined;
  private reconnectTimer: number | undefined = undefined;

  private heartbeatInterval: number;
  private reconnectInterval: number;
  private maxReconnectAttempts;
  private protocols?: string | string[];
}
export default WS;
