import { IRequest, IResponse } from './ocpp.frame';

enum CallType {
  CALL = 2,
  CALL_RESULT = 3,
  CALL_ERROR = 4,
}

enum Action {
  BOOT_NOTIFICATION = 'BootNotification',
  STATUS_NOTIFICATION = 'StatusNotification',
  START_TRANSACTION = 'StartTransaction',
  STOP_TRANSACTION = 'StopTransaction',
  METER_VALUES = 'MeterValues',
  REMOTE_START_TRANSACTION = 'RemoteStartTransaction',
  REMOTE_STOP_TRANSACTION = 'RemoteStopTransaction',
}

function CreateRequest(): void {
  throw new Error('Not implemented');
}

function GetRequest(): IRequest {
  throw new Error('Not implemented');
}

function CreateResponse(): void {
  throw new Error('Not implemented');
}

function GetResponse(): IResponse {
  throw new Error('Not implemented');
}

export {
  CallType,
  Action,
  CreateResponse,
  GetResponse,
  CreateRequest,
  GetRequest,
};
