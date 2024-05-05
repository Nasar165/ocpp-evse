'use client';

import React from 'react';
import {
  Reason,
  ConState,
  OnMessageEvent,
} from '../service/websocket/websocket.model';
import WebSocketHook from '../hook/socketHook';
import Button from './button';

type Url = {
  url: string;
  online: boolean;
  state: ConState;
  onMessage: OnMessageEvent;
};

export default function WebSocket({
  url,
  online,
  state,
  onMessage,
}: Url): React.JSX.Element {
  const [socket] = WebSocketHook({ state: state, onMessage: onMessage });

  const start = () => {
    try {
      if (!socket?.Alive()) {
        socket?.Connect(url, state);
      } else socket?.Disconnect(Reason.NORMAL);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button
        onClick={start}
        text={online ? 'Disconnect' : 'Connect'}
        disabled={false}
      />
    </div>
  );
}
