'use client';

import React, { useEffect, useState } from 'react';
import { Websocket } from '../lib/websocket/socket';
import { CloseEvent, ISocket } from '../model/websocket';

type Url = { url: string };

export default function Socket({ url }: Url): React.JSX.Element {
  const [socket, setSocket] = useState<ISocket>();

  const closeEvent: CloseEvent = (code: number) => console.log(code);

  const start = () => {
    try {
      if (!socket?.Alive()) {
        socket?.Start(url, closeEvent);
        setSocket(socket);
      } else socket?.Stop(1000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setSocket(new Websocket());
  }, []);

  return (
    <div>
      <button
        className='border border-blue-600 rounded-md px-4 py-2 my-4'
        onClick={() => start()}
      >
        {socket?.Alive() ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}
