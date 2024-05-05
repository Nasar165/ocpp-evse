import { ErrorDescription } from './ocpp.error';

type ErrorCode = string;
type Action = string;
type UniqueID = string;
type Payload = unknown;

type BaseTuple = [CallType, UniqueID];
type RequestTuple = [...BaseTuple, Action, Payload];
type ResponseTuple = [...BaseTuple, Payload];
type ErrorTuple = [...BaseTuple, ErrorCode, ErrorDescription, unknown];

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

export type {
  IRequest,
  IResponse,
  ErrorFrame,
  Action,
  BaseTuple,
  UniqueID,
  ErrorTuple,
  RequestTuple,
  ResponseTuple,
};
export { CallType };
