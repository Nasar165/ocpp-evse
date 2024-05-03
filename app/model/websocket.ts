const LIVE = 'web socket client is already initialized';
const DEAD = 'web socket client is dead, open a new connection';

interface ISocket {
  Alive(): boolean;
  Start(url: string, event: CloseEvent): void;
  Stop(code: number): void;
}

export type { ISocket };
export { LIVE, DEAD };
