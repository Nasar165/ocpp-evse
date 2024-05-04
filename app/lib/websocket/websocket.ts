import {
  CloseEvent,
  ConState,
  DEFAULT_TIMER,
  IWebSocket,
} from '@/app/lib/websocket/websocket.model';
import { Socket } from './socket';

let id: ReturnType<typeof setTimeout>;

export class Websocket extends Socket implements IWebSocket {
  private url: string = '';
  private stateChange: ConState;

  constructor(private timer = DEFAULT_TIMER, event: ConState) {
    super();
    this.stateChange = event;
  }

  SetTimer(time: number): void {
    if (time < 1000) return;
    this.timer = time;
  }

  Connect(url: string): void {
    clearTimeout(id);
    this.Start(url);
    this.stateChange(true);
    this.url = url;
    this.setEventListeners();
  }

  Disconnect(code: number): void {
    try {
      this.stateChange(false);
      this.Stop(code);
    } catch (error) {
      throw error;
    } finally {
      this.removeEventListeners();
    }
  }

  protected setEventListeners(): void {
    this.socket!.addEventListener('close', this.close.bind(this));
    this.socket!.addEventListener('error', this.error.bind(this));
    this.socket!.addEventListener('open', this.open.bind(this));
  }

  protected removeEventListeners(): void {
    this.socket!.removeEventListener('close', this.close.bind(this));
    this.socket!.removeEventListener('error', this.error.bind(this));
    this.socket!.addEventListener('open', this.open.bind(this));
  }

  protected retry(): void {
    clearTimeout(id);
    console.log('connection lost retrying');
    id = setTimeout(() => {
      this.Start(this.url);
    }, this.timer);
  }

  protected error(ev: Event): void {
    console.error('websocket an error has occurred', ev);
    const socket = ev.currentTarget as WebSocket;

    if (socket.readyState == socket.CLOSED) {
      this.stateChange(false);
      this.removeEventListeners();
      this.retry();
    }
  }

  protected close(reason: CloseEvent): void {
    if (this.socket?.readyState != this.socket?.OPEN) return;
    console.info(reason);
    this.Stop(CloseEvent.NORMAL);
  }

  protected open(): void {
    this.stateChange(true);
  }
}
