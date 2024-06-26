enum Reason {
  NORMAL = 1000,
  INTERNALERROR = 1011,
}

const DEFAULT_TIMER = 3600;
const LIVE = 'web socket client is already initialized';
const DEAD = 'web socket client is dead, open a new connection';

type OnMessageEvent = (ev: MessageEvent) => void;
type ConState = (connected: boolean, writer?: IWriter) => void;
type MilliSeconds = number;

interface ISocket extends IAlive {
  Start(url: string, event: ConState): void;
  Stop(code: number): void;
}

interface IWebSocket extends IAlive, IWriter {
  Connect(url: string, event: ConState): void;
  Disconnect(code: number): void;
  SetTimer(time: MilliSeconds): void;
}

interface IWriter {
  Write<T>(data: T): void;
}

interface IAlive {
  Alive(): boolean;
}

export type { IWebSocket, ISocket, ConState, OnMessageEvent, IWriter };
export { LIVE, DEAD, DEFAULT_TIMER, Reason };
