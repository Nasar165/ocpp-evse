const LIVE = 'web socket client is already initialized';
const DEAD = 'web socket client is dead, open a new connection';

type ConState = (connected: boolean) => void;

interface ISocket {
  Alive(): boolean;
  Start(url: string, event: ConState): void;
  Stop(code: number): void;
}

export type { ISocket, ConState };
export { LIVE, DEAD };
