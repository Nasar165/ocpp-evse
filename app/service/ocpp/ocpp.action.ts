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

function CreateRequestFrame(): void {
  throw new Error('Not implemented');
}

function GetRequestFrame(): IRequest {
  throw new Error('Not implemented');
}

function CreateResponseFrame(): void {
  throw new Error('Not implemented');
}

function GetResponseFrame(): IResponse {
  throw new Error('Not implemented');
}

export {
  Action,
  CreateResponseFrame,
  GetResponseFrame,
  CreateRequestFrame,
  GetRequestFrame,
};
