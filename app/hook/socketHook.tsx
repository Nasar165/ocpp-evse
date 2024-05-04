import { useEffect, useRef, useState } from 'react';
import {
  ConState,
  IWebSocket,
  OnMessageEvent,
} from '../service/websocket/websocket.model';
import { Websocket } from '../service/websocket/websocket';

type Url = { state: ConState; onMessage: OnMessageEvent };

export default function WebSocketHook({ state, onMessage }: Url): [IWebSocket] {
  const [socket, setSocket] = useState<IWebSocket>();
  const stateRef = useRef(state);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    setSocket(new Websocket(stateRef.current, onMessageRef.current));
  }, []);

  return [socket!];
}
