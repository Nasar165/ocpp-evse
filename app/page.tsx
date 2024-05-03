'use client';

import { SyntheticEvent, useState } from 'react';
import Websocket from './components/socket';
import Input from './components/input';

export default function Home() {
  const [url, setUrl] = useState(
    'ws://localhost:8080/ocpp/JwNpTpPxPm/CHR202305102'
  );

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);

    setUrl(event.currentTarget.value);
  };

  return (
    <div className='pt-6 text-center'>
      <h1 className='text-4xl'>OCPP 1.6-J EVSE Test tool</h1>
      <div className='w-1/3 mx-auto mt-8'>
        <Input name='url' value={url} onChange={onChange} />
        <Websocket url={url} />
      </div>
    </div>
  );
}
