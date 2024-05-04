'use client';

import React from 'react';
import { CloseEvent, ConState } from '../lib/websocket/websocket.model';
import WebSocketHook from '../hook/socketHook';

type Url = { url: string; online: boolean; state: ConState };

export default function Socket({ url, online, state }: Url): React.JSX.Element {
  const [socket] = WebSocketHook({ state: state });

  const start = () => {
    try {
      if (!socket?.Alive()) {
        socket?.Connect(url, state);
      } else socket?.Disconnect(CloseEvent.NORMAL);
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
