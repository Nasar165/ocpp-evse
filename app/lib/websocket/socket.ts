import { ConState, DEAD, ISocket, LIVE } from '@/app/model/websocket';

export class Websocket implements ISocket {
  private socket?: WebSocket;
  private stateChange: ConState;

  constructor(event: ConState) {
    this.stateChange = event;
  }

  Alive(): boolean {
    return this.socket != null && this.socket.readyState == this.socket.OPEN;
  }

  Start(url: string): void {
    if (this.Alive()) throw Error(LIVE);

    this.socket = new WebSocket(url, ['ocpp1.6']);
    this.stateChange(true);
    this.setEventListeners();

    console.info('Websocket connection was successful');
  }

  Stop(code?: number): void {
    if (this.socket == null) throw new Error(DEAD);

    try {
      this.stateChange(false);
      this.socket!.close(code ?? 1000);
    } catch (err) {
      throw err;
    } finally {
      this.removeEventListeners();
    }

    console.info('socket closed');
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

  protected close(reason: CloseEvent): void {
    console.info(reason);
    this.Stop(1000);
  }

  protected error(ev: Event): void {
    console.error('an error has occurred', ev);
  }

  protected open(): void {
    this.stateChange(true);
  }

  Send(message: string) {
    if (!this.Alive()) throw new Error(DEAD);
    this.socket!.send(message);
  }
}
