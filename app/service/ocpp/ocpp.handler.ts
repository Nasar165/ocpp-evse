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

type OCPPData = IRequest | IResponse | IErrorFrame;

function getCallType(frame: BaseTuple): CallType {
  return frame[0];
}

function getFullFrame(frame: BaseTuple): [CallType, OCPPData] {
  let data: OCPPData;
  const callType = getCallType(frame);
  switch (callType) {
    case CallType.CALL:
      data = GetRequestFrame();
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

function processCall(frame: IRequest) {}

function processReturn(frame: IResponse) {}

function processError(frame: IErrorFrame) {}

function handleFrame(frame: BaseTuple): void {
  const [call, result] = getFullFrame(frame);
  if (call) {
    processCall(result as IRequest);
  } else if (call == CallType.CALL_RESULT) {
    processReturn(result as IResponse);
  } else {
    processError(result as IErrorFrame);
  }
}

function isValidFrame(frame: unknown[]): BaseTuple {
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
    handleFrame(frame);
  } catch (error: unknown) {
    handlerError(error as Error, w);
  }
}
