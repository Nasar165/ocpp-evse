import { CallType } from './ocpp.action';

type Action = string;
type UniqueID = string;
type Payload = unknown;

interface IRequest extends IFrame, IPayload {
  action: Action;
}

interface IResponse extends IFrame, IPayload {}

interface IPayload {
  payload: Payload;
}

interface ErrorFrame extends IFrame {
  errorCode: string;
  errorDescription: string;
  // The Charge point do not know what to expect since each
  // CSMS has it's own implementation
  errorDetails: unknown;
}

interface IFrame {
  messageTypeID: CallType;
  // UUID may not exceed 36 chars
  uuid: UniqueID;
}

export type { IRequest, IResponse, ErrorFrame, Action, UniqueID };
