import { IWriter } from '../../websocket/websocket.model';
import { StatusNotification } from '../command/status-notification/status.notification';
import { Action, CreateRequestFrame, GetRequestFrame } from '../ocpp.action';
import { ChangeState } from '../ocpp.handler';
import { CreateTransaction } from '../transaction/transaction.handler';
import { ResetSession } from './start.transaction';
import { IStopTransaction } from './stop.transaction.model';

function SendStopTransaction(
  w: IWriter,
  transactionId: number,
  idTag: string,
  meterStop: number,
  changeState: ChangeState
): void {
  const transaction: IStopTransaction = {
    idTag,
    transactionId,
    meterStop: meterStop,
    timestamp: new Date(),
  };

  const frame = CreateRequestFrame(Action.STOP_TRANSACTION, transaction);
  w.Write(frame);
  CreateTransaction(GetRequestFrame(frame), StopTransaction);
  changeState(StatusNotification.AVAILABLE);
  ResetSession();
}

function StopTransaction(): void {
  console.log('stop transaction was received');
}

export { SendStopTransaction, StopTransaction };
