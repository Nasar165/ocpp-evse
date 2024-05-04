import { IRequest, IResponse } from './ocpp.frame';

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

export { Action, CreateResponse, GetResponse, CreateRequest, GetRequest };
