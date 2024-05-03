const LIVE = 'web socket client is already initialized';
const DEAD = 'web socket client is dead, open a new connection';

type CloseEvent = (code: number) => void;

interface ISocket {
  Alive(): boolean;
  Start(url: string, event: CloseEvent): void;
  Stop(code: number): void;
}

export type { ISocket, CloseEvent };
export { LIVE, DEAD };
