import React, { useEffect, useState } from 'react';
import Select, { ReturnValue } from './select';
import { meterValueList } from './transaction';
import { StatusNotification } from '../service/ocpp/command/status-notification/status.notification';
import Button from './button';
import { SendMeterValue } from '../service/ocpp/command/meter-value/meter.value';
import { IWriter } from '../service/websocket/websocket.model';

const DEFAULT_INTERVAL = 20000;

let id: ReturnType<typeof setInterval>;

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

  useEffect(() => {
    console.info('start interval');
    setInterval(onClick, DEFAULT_INTERVAL);
    return () => {
      console.info('clean up interval');
      clearInterval(id);
    };
  }, []);

  return (
    <div className='border border-black p-2 my-2 rounded-md'>
      <p className='my-2'>Meter value</p>
      <p className='text-xs'>Notes: Meter Values are sent every 20 seconds</p>
      <Select
        items={meterValueList}
        onChange={onSelectChange}
        defaultItem={meterValue}
      />
      <Button
        onClick={onClick}
        text='Send Meter Values'
        disabled={state != StatusNotification.CHARGING}
      />
    </div>
  );
}
