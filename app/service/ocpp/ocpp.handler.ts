import { IWriter } from '../websocket/websocket.model';
import { GetRequestFrame, GetResponseFrame } from './ocpp.action';
import { CreateError, ErrorCode, GetError } from './ocpp.error';
import {
  BaseTuple,
  CallType,
  IErrorFrame,
  IRequest,
  IResponse,
} from './ocpp.frame';
import {
  ChargePointErrorCodes,
  StatusNotification,
} from './command/status-notification/status.notification';
import { FindTransaction } from './transaction/transaction.handler';
import { FindAction } from './ocpp.action.list';

type OCPPData = IRequest | IResponse | IErrorFrame;
type ChangeState = (
  state: StatusNotification,
  error?: ChargePointErrorCodes
) => void;

function getCallType(frame: BaseTuple): CallType {
  return frame[0];
}

function getFullFrame(frame: BaseTuple): [CallType, OCPPData] {
  let data: OCPPData;
  const callType = getCallType(frame);
  switch (callType) {
    case CallType.CALL:
      data = GetRequestFrame(frame);
      break;
    case CallType.CALL_RESULT:
      data = GetResponseFrame(frame);
      break;
    case CallType.CALL_ERROR:
      data = GetError(frame);
      break;
    default:
      throw new Error(ErrorCode.ProtocolError);
  }

  return [callType, data];
}

function processCall(
  w: IWriter,
  frame: IRequest,
  state: StatusNotification
): void {
  const handler = FindAction(frame.action);
  handler.handel(w, frame, state);
}

function processReturn(
  w: IWriter,
  frame: IErrorFrame | IResponse,
  changeState: ChangeState
): void {
  try {
    const transaction = FindTransaction(frame.uuid);
    if (frame.messageTypeID == CallType.CALL_ERROR)
      transaction.AddError(frame as IErrorFrame);
    else {
      transaction.AddResponse(w, frame as IResponse, changeState);
    }
  } catch (error) {
    console.log('Unable to process transaction');
  }
}

function handleFrame(
  w: IWriter,
  frame: BaseTuple,
  state: StatusNotification,
  changeState: ChangeState
): void {
  const [call, result] = getFullFrame(frame);
  if (call == CallType.CALL) {
    processCall(w, result as IRequest, state);
  } else {
    processReturn(w, result, changeState);
  }
}

function isValidFrame(frame: Array<unknown>): BaseTuple {
  const len = frame.length;
  if (len < 3 || len > 5) throw new Error(ErrorCode.ProtocolError);

  if (typeof frame[0] != 'number') throw new Error(ErrorCode.ProtocolError);

  if (typeof frame[1] != 'string') throw new Error(ErrorCode.ProtocolError);

  return frame as BaseTuple;
}

function handlerError(err: Error, w: IWriter): void {
  const json = JSON.stringify(CreateError(err.message as ErrorCode, err));
  w.Write(json);
}

export function HandleOcpp(
  w: IWriter,
  json: string,
  state: StatusNotification,
  changeState: ChangeState
): void {
  try {
    const data: unknown = JSON.parse(json);
    if (!Array.isArray(data)) throw new Error(ErrorCode.ProtocolError);
    let frame = isValidFrame(data);
    handleFrame(w, frame, state, changeState);
  } catch (error: unknown) {
    handlerError(error as Error, w);
  }
}

export type { ChangeState };
