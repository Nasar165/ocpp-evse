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
    console.info('Websocket connection was successful');
  }

  Stop(code?: number): void {
    if (!this.Alive()) throw new Error(DEAD);
    this.socket!.close(code ?? 1000);
    this.stateChange(false);
    console.info('socket closed');
  }

  Send(message: string) {
    if (!this.Alive()) throw new Error(DEAD);

    this.socket!.send(message);
  }
}
