import { IWriter } from '../websocket/websocket.model';
import { RemoteStartTransactionReq } from './command/remote/remote.start.transaction';
import { RemoteStopTransactionReq } from './command/remote/remote.stop.transaction';
import { StatusNotification } from './command/status-notification/status.notification';
import { Action } from './ocpp.action';
import { ErrorCode } from './ocpp.error';
import { IRequest } from './ocpp.frame';
import { ChangeState } from './ocpp.handler';

type ActionItem = {
  name: string;
  handel: (
    w: IWriter,
    frame: IRequest,
    state: StatusNotification,
    changeState: ChangeState
  ) => void;
};

const List: Array<ActionItem> = [
  { name: Action.REMOTE_START_TRANSACTION, handel: RemoteStartTransactionReq },
  { name: Action.REMOTE_STOP_TRANSACTION, handel: RemoteStopTransactionReq },
];

function FindAction(action: string): ActionItem {
  const handler = List.find((a) => a.name == action);
  if (handler == null) throw new Error(ErrorCode.NotImplemented);
  return handler;
}

export { FindAction };
