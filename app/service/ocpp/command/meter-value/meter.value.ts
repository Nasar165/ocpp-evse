import { IWriter } from '../../../websocket/websocket.model';
import { Action, CreateRequestFrame, GetRequestFrame } from '../../ocpp.action';
import { CreateTransaction } from '../../transaction/transaction.handler';
import { GetSession } from '../charging/start.transaction';

function SendMeterValue(w: IWriter, connectorId: number, value: number): void {
  const session = GetSession();
  const payload: any = {
    connectorId,
    meterValue: [
      {
        timestamp: new Date(),
        sampledValue: [
          {
            context: 'Sample.Periodic',
            value: value,
            unit: 'W',
            measurand: 'Power.Active.Import',
          },
        ],
      },
    ],
  };

  if (session != null && session.transactionId != 0)
    payload['transactionId'] = session.transactionId;

  const frame = CreateRequestFrame(Action.METER_VALUES, payload);
  CreateTransaction(GetRequestFrame(frame), MeterValue);
  w.Write(frame);
}

function MeterValue(): void {
  console.log('meter value accepted by CSMS');
}

export { SendMeterValue, MeterValue };
