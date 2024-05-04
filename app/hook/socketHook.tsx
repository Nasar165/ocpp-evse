import { useEffect, useRef, useState } from 'react';
import { ConState, IWebSocket } from '../lib/websocket/websocket.model';
import { Websocket } from '../lib/websocket/websocket';

type Url = { state: ConState };

export default function WebSocketHook({ state }: Url): [IWebSocket] {
  const [socket, setSocket] = useState<IWebSocket>();
  const ref = useRef(state);

  useEffect(() => {
    setSocket(new Websocket(ref.current));
  }, []);

  return [socket!];
}
