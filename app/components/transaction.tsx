import React, { SyntheticEvent, useState } from 'react';
import { SendStartTransaction } from '../service/ocpp/charging/start.transaction';
import Input from './input';
import Button from './button';
import { IWriter } from '../service/websocket/websocket.model';
import { StatusNotification } from '../service/ocpp/command/status-notification/status.notification';

type transaction = {
  writer: IWriter;
  connectorId: number;
  state: StatusNotification;
};

export default function Transaction({
  writer,
  connectorId,
  state,
}: transaction): React.JSX.Element {
  const [idTag, setIdTag] = useState('cli013322');
  const onChange = (ev: SyntheticEvent<HTMLInputElement>) => {
    setIdTag(ev.currentTarget.value);
  };

  const notConnected = () => {
    if (writer == null) {
      alert('Please connect to CSMS');
    }
  };

  const onStart = () => {
    if (writer == null) {
      notConnected();
      return;
    }

    if (
      state == StatusNotification.AVAILABLE ||
      state == StatusNotification.PREPARING
    ) {
      if (idTag.trim() == '') return;
      SendStartTransaction(writer, connectorId, idTag);
      return;
    }

    alert(
      'Please make sure that the charger is in Available or preparing state'
    );
  };

  const onStop = () => {
    if (writer == null) {
      notConnected();
      return;
    }
  };

  return (
    <div className='border border-black p-2 my-2 rounded-md'>
      <Input
        title='Client id tag'
        name='idTag'
        placeholder='enter ID tag to submit with start transaction'
        value={idTag}
        onChange={onChange}
        disabled={false}
      />
      <div className='grid gap-2 grid-cols-2'>
        <Button
          onClick={onStart}
          text='Start Transaction'
          disabled={state == StatusNotification.CHARGING}
        />
        <Button
          onClick={onStop}
          text='Stop Transaction'
          disabled={state != StatusNotification.CHARGING}
        />
      </div>
    </div>
  );
}
