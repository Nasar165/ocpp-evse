import Validate from '@/app/helper/validation.helper';
import { IWriter } from '../../websocket/websocket.model';
import { Action, CreateRequestFrame, GetRequestFrame } from '../ocpp.action';
import { CreateError, ErrorCode } from '../ocpp.error';
import { IResponse } from '../ocpp.frame';
import { ChangeState } from '../ocpp.handler';
import { CreateTransaction } from '../transaction/transaction.handler';
import {
  AuthorizationStatus,
  IChargingSession,
  IStartTransaction,
  StartTransactionsRes,
} from './start.transaction.model';
import { StatusNotification } from '../command/status-notification/status.notification';

let session: IChargingSession;

function SendStartTransaction(
  w: IWriter,
  connectorId: number,
  idTag: string
): void {
  const transaction: IStartTransaction = {
    connectorId,
    idTag,
    meterStart: 0,
    timestamp: new Date(),
  };

  const frame = CreateRequestFrame(Action.START_TRANSACTION, transaction);
  w.Write(frame);
  CreateTransaction(GetRequestFrame(frame), StartTransaction);
  session = { connectorId, idTag, transactionId: -1 };
}

function StartTransaction(
  w: IWriter,
  frame: IResponse,
  changeState: ChangeState
): IChargingSession | undefined {
  const [result, validation] = Validate<StartTransactionsRes>(
    StartTransactionsRes,
    frame.payload
  );

  if (validation.length > 0) {
    w.Write(CreateError(ErrorCode.PropertyConstraintViolation, validation));
    return;
  }

  if (result.idTagInfo.status != AuthorizationStatus.ACCEPTED) {
    return;
  }

  changeState(StatusNotification.CHARGING);
  session.transactionId = result.transactionId;
  return session;
}

export { SendStartTransaction, StartTransaction };
