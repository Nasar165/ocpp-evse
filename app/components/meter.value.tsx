import React, { useState } from 'react';
import Select, { ReturnValue } from './select';
import { meterValueList } from './transaction';
import { StatusNotification } from '../service/ocpp/command/status-notification/status.notification';
import Button from './button';
import { SendMeterValue } from '../service/ocpp/command/meter-value/meter.value';
import { IWriter } from '../service/websocket/websocket.model';

type meterValue = {
  w: IWriter;
  connectorId: number;
  state: StatusNotification;
};

export default function MeterValue({
  w,
  connectorId,
  state,
}: meterValue): React.JSX.Element {
  const [meter, setMeter] = useState(250);
  const meterValue = { name: meter.toString(), value: meter };

  const onSelectChange = (item: ReturnValue) => {
    setMeter(item as number);
  };

  const onClick = () => {
    SendMeterValue(w, connectorId, meter);
  };

  return (
    <div className='border border-black p-2 my-2 rounded-md'>
      <p className='my-2'>Meter value</p>
      <Select
        items={meterValueList}
        onChange={onSelectChange}
        defaultItem={meterValue}
      />
      <Button
        onClick={onClick}
        text='Stop Transaction'
        disabled={state != StatusNotification.CHARGING}
      />
    </div>
  );
}
