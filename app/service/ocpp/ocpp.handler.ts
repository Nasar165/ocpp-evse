import { IWriter } from '../websocket/websocket.model';
import { GetRequestFrame, GetResponseFrame } from './ocpp.action';
import { CreateError, ErrorCode, GetError } from './ocpp.error';
import {
  BaseTuple,
  CallType,
  ErrorFrame,
  IRequest,
  IResponse,
} from './ocpp.frame';

type OCPPData = IRequest | IResponse | ErrorFrame;

function getCallType(frame: BaseTuple): CallType {
  return frame[0];
}

function getFullFrame(frame: BaseTuple): OCPPData {
  let data: OCPPData;
  switch (getCallType(frame)) {
    case CallType.CALL:
      data = GetRequestFrame();
      break;
    case CallType.CALL_RESULT:
      data = GetResponseFrame();
      break;
    case CallType.CALL_ERROR:
      data = GetError(frame);
      break;
    default:
      throw new Error(ErrorCode.ProtocolError);
  }
  return data;
}

function isValidFrame(frame: unknown[]): BaseTuple {
  const len = frame.length;
  if (len < 3 || len > 5) throw new Error(ErrorCode.ProtocolError);

  if (typeof frame[0] != 'number') throw new Error(ErrorCode.ProtocolError);

  if (typeof frame[1] != 'string') throw new Error(ErrorCode.ProtocolError);

  return frame as BaseTuple;
}

function HandlerError(err: Error, w: IWriter): void {
  const json = JSON.stringify(CreateError(err.message as ErrorCode, err));
  w.Write(json);
}

export function HandleOcpp(w: IWriter, json: string): void {
  try {
    const data: unknown = JSON.parse(json);
    if (!Array.isArray(data)) throw new Error(ErrorCode.ProtocolError);
    let frame = isValidFrame(data);
    const request = getFullFrame(frame);
    console.info(request);
  } catch (error: unknown) {
    HandlerError(error as Error, w);
  }
}
