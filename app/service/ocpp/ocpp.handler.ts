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
import { FindTransaction } from './transaction/transaction.handler';

type OCPPData = IRequest | IResponse | IErrorFrame;

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

function processCall(frame: IRequest) {
  console.log(frame);
}

function processReturn(w: IWriter, frame: IErrorFrame | IResponse): void {
  try {
    const transaction = FindTransaction(frame.uuid);
    if (frame.messageTypeID == CallType.CALL_ERROR)
      transaction.AddError(frame as IErrorFrame);
    else {
      transaction.AddResponse(w, frame as IResponse);
    }
  } catch (error) {
    console.log('Unable to process transaction');
  }
}

function handleFrame(w: IWriter, frame: BaseTuple): void {
  const [call, result] = getFullFrame(frame);
  if (call == CallType.CALL) {
    processCall(result as IRequest);
  } else {
    processReturn(w, result);
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

export function HandleOcpp(w: IWriter, json: string): void {
  try {
    const data: unknown = JSON.parse(json);
    if (!Array.isArray(data)) throw new Error(ErrorCode.ProtocolError);
    let frame = isValidFrame(data);
    handleFrame(w, frame);
  } catch (error: unknown) {
    handlerError(error as Error, w);
  }
}
