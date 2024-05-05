import { v4 } from 'uuid';
import {
  BaseTuple,
  CallType,
  IRequest,
  IResponse,
  RequestTuple,
  ResponseTuple,
  UniqueID,
} from './ocpp.frame';
import { ErrorCode } from './ocpp.error';

enum Action {
  BOOT_NOTIFICATION = 'BootNotification',
  STATUS_NOTIFICATION = 'StatusNotification',
  START_TRANSACTION = 'StartTransaction',
  STOP_TRANSACTION = 'StopTransaction',
  METER_VALUES = 'MeterValues',
  REMOTE_START_TRANSACTION = 'RemoteStartTransaction',
  REMOTE_STOP_TRANSACTION = 'RemoteStopTransaction',
}

function CreateRequestFrame<T>(action: Action, payload: T): RequestTuple {
  return [CallType.CALL, v4(), action, payload];
}

function GetRequestFrame(): IRequest {
  throw new Error('Not implemented');
}

function CreateResponseFrame<T>(uuid: UniqueID, payload: T): ResponseTuple {
  return [CallType.CALL_RESULT, uuid, payload];
}

function GetResponseFrame(payload: ResponseTuple | BaseTuple): IResponse {
  if (payload.length < 3) throw new Error(ErrorCode.FormationViolation);
  if (payload[0] != CallType.CALL_RESULT)
    throw new Error(ErrorCode.ProtocolError);

  return {
    messageTypeID: payload[0],
    uuid: payload[1],
    payload: payload[2],
  };
}

export {
  Action,
  CreateResponseFrame,
  GetResponseFrame,
  CreateRequestFrame,
  GetRequestFrame,
};
