'use client';

import React from 'react';
import {
  Reason,
  ConState,
  OnMessageEvent,
} from '../service/websocket/websocket.model';
import WebSocketHook from '../hook/socketHook';

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
      <button
        className='border border-blue-600 rounded-md px-4 py-2 my-4'
        onClick={() => start()}
      >
        {online ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}
