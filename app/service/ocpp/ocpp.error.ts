import { CallType, ErrorFrame, ErrorTuple } from './ocpp.frame';
import { v4 } from 'uuid';

type ErrorDescription = string;
type ErrorDetails = unknown | Object;

enum ErrorCode {
  NotImplemented = 'Requested Action is not known by receiver',
  NotSupported = 'Requested Action is recognized but not supported by the receiver',
  InternalError = 'An internal error occurred and the receiver was not able to process the requested Action successfully',
  ProtocolError = 'Payload for Action is incomplete"',
  SecurityError = 'During the processing of Action a security issue occurred preventing receiver from completing the Action successfully',
  FormationViolation = 'Payload for Action is syntactically incorrect or not conform the PDU structure for Action',
  PropertyConstraintViolation = 'Payload is syntactically correct but at least one field contains an invalid value',
  OccurrenceConstraintViolation = 'Payload for Action is syntactically correct but at least one of the fields violates occurrence constraints',
  TypeConstraintViolation = 'Payload for Action is syntactically correct but at least one of the fields violates data type constraints',
  GenericError = 'A generic error has occurred',
}

function CreateError(errCode: ErrorCode, details: ErrorDetails): ErrorTuple {
  const keyValue = Object.entries(ErrorCode).find((v) => v[1] == errCode);
  let code = '';

  if (keyValue == null) {
    errCode = ErrorCode.InternalError;
    code = 'InternalError' as ErrorCode;
    details = {};
  } else {
    code = keyValue[0];
  }

  return [CallType.CALL_ERROR, v4(), code, errCode, details];
}

function GetError(payload: ErrorTuple): ErrorFrame {
  console.log(payload.length);

  if (payload.length != 5) throw new Error(ErrorCode.ProtocolError);
  if (payload[0] != CallType.CALL_ERROR) throw new Error('invalid Call type');

  return {
    messageTypeID: payload[0],
    uuid: payload[1],
    errorCode: payload[2],
    errorDescription: payload[3],
    errorDetails: payload[4],
  };
}

export type { ErrorDescription, ErrorDetails };
export { ErrorCode, CreateError, GetError };
