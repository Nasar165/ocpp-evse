import { CloseEvent, ConState, DEFAULT_TIMER } from '@/app/model/websocket';
import { Socket } from './socket';

let id: ReturnType<typeof setTimeout>;

export class Websocket extends Socket {
  private url: string = '';
  private timer = 0;
  private stateChange: ConState;

  constructor(event: ConState) {
    super();
    this.timer = DEFAULT_TIMER;
    this.stateChange = event;
  }

  Connect(url: string): void {
    this.stateChange(true);
    this.url = url;
    this.Start(url);
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
