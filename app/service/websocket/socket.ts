import {
  DEAD,
  ISocket,
  LIVE,
  Reason,
} from '@/app/service/websocket/websocket.model';

export class Socket implements ISocket {
  protected socket?: WebSocket;

  Alive(): boolean {
    return this.socket != null && this.socket.readyState == this.socket.OPEN;
  }

  Start(url: string): void {
    if (this.Alive()) throw Error(LIVE);
    this.socket = new WebSocket(url, ['ocpp1.6']);
    console.info('Websocket connection was successful');
  }

  Stop(code?: number): void {
    if (this.socket == null) throw new Error(DEAD);
    this.socket!.close(code ?? Reason.NORMAL);
    console.info('socket closed');
  }

  Send(message: string) {
    if (!this.Alive()) throw new Error(DEAD);
    this.socket!.send(message);
  }
}
