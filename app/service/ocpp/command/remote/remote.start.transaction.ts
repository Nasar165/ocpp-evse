import { IWriter } from '@/app/service/websocket/websocket.model';
import { IRequest } from '../../ocpp.frame';
import { StatusNotification } from '../status-notification/status.notification';
import { CreateResponseFrame } from '../../ocpp.action';
import { SendStartTransaction } from '../charging/start.transaction';
import Validate from '@/app/helper/validation.helper';
import { CreateError, ErrorCode } from '../../ocpp.error';
import {
  IRemoteStartTransactionRes,
  Status,
  IRemoteStartTransaction,
  RemoteStartTransaction,
} from './remote.start.transaction.model';

export function RemoteStartTransactionReq(
  w: IWriter,
  frame: IRequest,
  state: StatusNotification
): void {
  console.log(state);

  let status: IRemoteStartTransactionRes = { status: Status.REJECTED };
  if (
    state == StatusNotification.AVAILABLE ||
    state == StatusNotification.PREPARING ||
    state == StatusNotification.FINISHING
  ) {
    const [result, validation] = Validate<IRemoteStartTransaction>(
      RemoteStartTransaction,
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

    if (result.connectorId == 0) {
      result.connectorId = 1;
    }

    status.status = Status.ACCEPTED;
    SendStartTransaction(w, result.connectorId, result.idTag);
  }

  const response = CreateResponseFrame<IRemoteStartTransactionRes>(
    frame.uuid,
    status
  );
  w.Write(response);
}
