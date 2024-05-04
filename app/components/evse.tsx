'use client';

import { SyntheticEvent, useRef, useState } from 'react';
import Input from './input';
import { ConState, IWriter } from '../service/websocket/websocket.model';
import WebSocket from './WebSocket';
import { ChargingSocket, IChargingSocket } from '../service/ocpp/connector';
import { StatusNotification } from '../service/ocpp/status.notificiation';

const defaultValue = 'ws://localhost:8080/ocpp/JwNpTpPxPm/CHR202305102';

export default function Evse() {
  const [url, setUrl] = useState(defaultValue);
  const [online, setOnline] = useState(false);
  const [writer, setWriter] = useState<IWriter>();
  const chargingSocket = useRef<IChargingSocket>(
    new ChargingSocket(StatusNotification.UNAVAILABLE)
  );

  const onlineChange: ConState = (connected: boolean, writer?: IWriter) => {
    setOnline(connected);
    setWriter(writer);
    // send BootNotification
  };

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };

  const onMessage = (ev: MessageEvent) => {
    console.log(ev);
  };

  return (
    <div className='w-screen mx-auto mt-8 md:w-2/3 xl:w-1/3'>
      <Input name='url' value={url} onChange={onChange} disabled={online} />
      <WebSocket
        url={url}
        state={onlineChange}
        onMessage={onMessage}
        online={online}
      />
    </div>
  );
}