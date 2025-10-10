import { getToken, isLogin } from "./auth";
import WS, { type IWSListener } from "./websocket";
function getWSUrl(): string {
  if (!isLogin()) window.location.reload();
  return `${
    import.meta.env.VITE_API_WS_URL
  }/wss/default.io?token=${getToken()}`;
}

class WSSingleton implements Partial<IWSListener> {
  constructor() {
    if (this.ws) return this;
    this.ws = new WS(getWSUrl);
    this.bindEvents();
  }
  connect() {
    if (this.isConnected()) return;
    this.ws?.connect();
  }
  isConnected() {
    return this.ws?.isOpen();
  }
  close() {
    if (!this.ws) return;
    this.ws.close();
  }
  onOpen?: (ev: Event) => any;
  onMessage?: (ev: MessageEvent) => any;
  onClose?: (ev: CloseEvent) => any;
  onError?: (ev: Event) => any;
  private bindEvents() {
    if (!this.ws) return;
    this.ws.onOpen = (ev: Event) => {
      this.onOpen?.(ev);
    };
    this.ws.onMessage = (ev: MessageEvent) => {
      this.onMessage?.(ev);
    };
    this.ws.onClose = (ev:CloseEvent)=>{
      this.onClose?.(ev)
    }
    this.ws.onError = (ev:Event) =>{
      this.onError?.(ev)
    }
  }
  private ws: WS | null = null;
}
export default new WSSingleton();
