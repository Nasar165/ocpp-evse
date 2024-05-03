import { DEAD, ISocket, LIVE } from '@/app/model/websocket';
export class Websocket implements ISocket {
  private socket?: WebSocket;

  Alive(): boolean {
    return this.socket != null && this.socket.readyState == this.socket.OPEN;
  }

  Start(url: string): void {
    if (this.Alive()) throw Error(LIVE);

    this.socket = new WebSocket(url, ['ocpp1.6']);
    console.log('Websocket connection was successful');
  }

  Stop(code?: number): void {
    if (!this.Alive()) throw new Error(DEAD);

    console.log('closing socket');
    this.socket!.close(code ?? 1000);
  }

  Send(message: string) {
    if (!this.Alive()) throw new Error(DEAD);

    this.socket!.send(message);
  }
}
