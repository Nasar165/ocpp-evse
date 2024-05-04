const CloseEvent = Object.freeze({
  NORMAL: 1000,
  INTERNALERROR: 1011,
});

const DEFAULT_TIMER = 3600;
const LIVE = 'web socket client is already initialized';
const DEAD = 'web socket client is dead, open a new connection';

type ConState = (connected: boolean) => void;

interface ISocket extends IAlive {
  Start(url: string, event: ConState): void;
  Stop(code: number): void;
}

interface IWebSocket extends IAlive {
  Connect(url: string, event: ConState): void;
  Disconnect(code: number): void;
}

interface IAlive {
  Alive(): boolean;
}

export type { IWebSocket, ISocket, ConState };
export { LIVE, DEAD, DEFAULT_TIMER, CloseEvent };
