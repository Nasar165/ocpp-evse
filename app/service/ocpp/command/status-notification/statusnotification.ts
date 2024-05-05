import { IWriter } from '../../../websocket/websocket.model';
import { Action, CreateRequestFrame, GetRequestFrame } from '../../ocpp.action';
import { CreateTransaction } from '../../transaction/transaction.handler';
import {
  ChargePointErrorCodes,
  IStatusNotification,
  StatusNotification,
} from './status.notificiation';

function SendStatusNotification(
  w: IWriter,
  connectorId: number,
  errorCode: ChargePointErrorCodes,
  status: StatusNotification
): void {
  const req: IStatusNotification = {
    connectorId,
    errorCode,
    status,
  };
  const frame = CreateRequestFrame(Action.STATUS_NOTIFICATION, req);
  w.Write(frame);
  CreateTransaction(GetRequestFrame(frame), StatusNotificationRes);
}

function StatusNotificationRes(): void {
  console.log('status notification res received');
}

export { SendStatusNotification };
