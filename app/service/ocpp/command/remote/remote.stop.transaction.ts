import { IWriter } from '@/app/service/websocket/websocket.model';
import { IRequest } from '../../ocpp.frame';
import { StatusNotification } from '../status-notification/status.notification';
import { CreateResponseFrame } from '../../ocpp.action';
import {
  IRemoteStopTransaction,
  RemoteStopTransaction,
} from './remote.stop.transaction.model';
import { GetSession } from '../charging/start.transaction';
import Validate from '@/app/helper/validation.helper';
import { CreateError, ErrorCode } from '../../ocpp.error';
import {
  IRemoteStartTransactionRes,
  Status,
} from './remote.start.transaction.model';
import { SendStopTransaction } from '../charging/stop.transaction';
import { ChangeState } from '../../ocpp.handler';

export function RemoteStopTransactionReq(
  w: IWriter,
  frame: IRequest,
  state: StatusNotification,
  changeState: ChangeState
): void {
  let status: IRemoteStartTransactionRes = { status: Status.REJECTED };
  if (state == StatusNotification.CHARGING) {
    const [result, validation] = Validate<IRemoteStopTransaction>(
      RemoteStopTransaction,
      frame.payload
    );

    if (validation.length > 0) {
      w.Write(
        CreateError(
          ErrorCode.PropertyConstraintViolation,
          validation,
          frame.uuid
        )
      );
      return;
    }

    status.status = Status.ACCEPTED;
    const session = GetSession();
    if (session.transactionId != result.transactionId) {
      w.Write(
        CreateError(
          ErrorCode.SecurityError,
          {
            error: 'transaction id violation',
          },
          frame.uuid
        )
      );
      return;
    }

    SendStopTransaction(
      w,
      session.connectorId,
      session.idTag,
      session.transactionId,
      changeState
    );
  }

  const response = CreateResponseFrame<IRemoteStartTransactionRes>(
    frame.uuid,
    status
  );
  w.Write(response);
}
