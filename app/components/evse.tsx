'use client';

import { SyntheticEvent, useRef, useState } from 'react';
import Input from './input';
import { ConState, IWriter } from '../service/websocket/websocket.model';
import WebSocket from './WebSocket';
import { ChargingSocket, IChargingSocket } from '../service/ocpp/connector';
import { HandleOcpp } from '../service/ocpp/ocpp.handler';
import { SendBootNotification } from '../service/ocpp/command/boot-notification/bootnotification';
import StatusNotificationUI from './status.notification';
import {
  ChargePointErrorCodes,
  StatusNotification,
} from '../service/ocpp/command/status-notification/status.notificiation';
import { SendStatusNotification } from '../service/ocpp/command/status-notification/statusnotification';

const defaultValue = 'ws://localhost:8080/ocpp/JwNpTpPxPm/CHR202305102';

export default function Evse() {
  const [url, setUrl] = useState(defaultValue);
  const [online, setOnline] = useState(false);
  const writer = useRef<Array<IWriter>>([]);
  const [socket, setSocket] = useState<IChargingSocket>(new ChargingSocket());

  const onlineChange: ConState = (connected: boolean, w?: IWriter) => {
    setOnline(connected);
    if (w != null) {
      writer.current.push(w);
      SendBootNotification(w);
    }
  };

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };

  const onMessage = (ev: MessageEvent) => {
    if (writer == null) return;
    HandleOcpp(writer.current[0], ev.data, changeState);
  };

  const changeState = (
    state: StatusNotification,
    error?: ChargePointErrorCodes
  ) => {
    setSocket({ ...socket, State: state });
    if (writer.current[0] == null) return;
    SendStatusNotification(
      writer.current[0],
      0,
      error ?? ChargePointErrorCodes.NoError,
      state
    );
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
      <StatusNotificationUI state={socket.State} changeState={changeState} />
    </div>
  );
}
