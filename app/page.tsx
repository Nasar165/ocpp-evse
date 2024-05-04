'use client';

import { SyntheticEvent, useState } from 'react';
import Websocket from './components/socket';
import Input from './components/input';
import { ConState } from './lib/websocket/websocket.model';

const defaultValue = 'ws://localhost:8080/ocpp/JwNpTpPxPm/CHR202305102';

export default function Home() {
  const [url, setUrl] = useState(defaultValue);
  const [online, setOnline] = useState(false);

  const state: ConState = (connected: boolean) => setOnline(connected);

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };

  return (
    <div className='pt-6 text-center'>
      <h1 className='text-4xl'>OCPP 1.6-J EVSE Test tool</h1>
      <div className='w-screen mx-auto mt-8 md:w-2/3 xl:w-1/3'>
        <Input name='url' value={url} onChange={onChange} disabled={online} />
        <Websocket url={url} state={state} online={online} />
      </div>
    </div>
  );
}
