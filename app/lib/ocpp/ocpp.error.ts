import { CallType } from './ocpp.action';
import { ErrorFrame } from './ocpp.frame';
import { v4 } from 'uuid';

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

function CreateError(description: ErrorCode, payload: unknown): any {
  const keyValue = Object.entries(ErrorCode).find((v) => v[1] == description);
  let code = '';

  if (keyValue == null) {
    description = ErrorCode.InternalError;
    code = 'InternalError';
    payload = {};
  } else {
    code = keyValue[0];
  }

  const result = [CallType.CALL_ERROR, v4(), code, description, payload];
  return result;
}

function GetError(): ErrorFrame {
  throw new Error('Not implemented');
}

export { ErrorCode, CreateError, GetError };
