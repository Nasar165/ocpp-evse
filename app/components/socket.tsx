'use client';

import React, { useEffect, useState } from 'react';
import { Websocket } from '../lib/websocket/socket';
import { ConState, ISocket } from '../model/websocket';

type Url = { url: string; online: boolean; state: ConState };

export default function Socket({ url, online, state }: Url): React.JSX.Element {
  const [socket, setSocket] = useState<ISocket>();

  const start = () => {
    try {
      if (!socket?.Alive()) {
        socket?.Start(url, state);
        setSocket(socket);
      } else socket?.Stop(1000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setSocket(new Websocket(state));
  }, []);

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
