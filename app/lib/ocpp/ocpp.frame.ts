import { ErrorDescription } from './ocpp.error';

type ErrorCode = string;
type Action = string;
type UniqueID = string;
type Payload = unknown;

type ErrorTuple = [CallType, UniqueID, ErrorCode, ErrorDescription, unknown];

enum CallType {
  CALL = 2,
  CALL_RESULT = 3,
  CALL_ERROR = 4,
}

interface IRequest extends IFrame, IPayload {
  action: Action;
}

interface IResponse extends IFrame, IPayload {}

interface IPayload {
  payload: Payload;
}

interface ErrorFrame extends IFrame {
  errorCode: ErrorCode;
  errorDescription: ErrorDescription;
  errorDetails: unknown;
}

interface IFrame {
  messageTypeID: CallType;
  uuid: UniqueID;
}

export type { IRequest, IResponse, ErrorFrame, Action, UniqueID, ErrorTuple };
export { CallType };
