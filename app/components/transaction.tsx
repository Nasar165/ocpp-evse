import React, { SyntheticEvent, useState } from 'react';
import {
  GetSession,
  SendStartTransaction,
} from '../service/ocpp/command/charging/start.transaction';
import Input from './input';
import Button from './button';
import { IWriter } from '../service/websocket/websocket.model';
import { StatusNotification } from '../service/ocpp/command/status-notification/status.notification';
import { SendStopTransaction } from '../service/ocpp/command/charging/stop.transaction';
import { ChangeState } from '../service/ocpp/ocpp.handler';
import Select, { ReturnValue } from './select';

const meterValueList = [
  { name: '10', value: 10 },
  { name: '50', value: 50 },
  { name: '100', value: 100 },
  { name: '200', value: 200 },
  { name: '400', value: 400 },
];

type transaction = {
  writer: IWriter;
  connectorId: number;
  state: StatusNotification;
  changeState: ChangeState;
};

export default function Transaction({
  writer,
  connectorId,
  state,
  changeState,
}: transaction): React.JSX.Element {
  const [idTag, setIdTag] = useState('cli013322');
  const [meter, setMeter] = useState(250);
  const meterValue = { name: meter.toString(), value: meter };

  const onChange = (ev: SyntheticEvent<HTMLInputElement>) => {
    setIdTag(ev.currentTarget.value);
  };

  const onSelectChange = (item: ReturnValue) => {
    setMeter(item as number);
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

    const session = GetSession();
    SendStopTransaction(
      writer,
      session.transactionId,
      session.idTag,
      meter,
      changeState
    );
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
      <p className='my-2'>Meter value</p>
      <Select
        items={meterValueList}
        onChange={onSelectChange}
        defaultItem={meterValue}
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
