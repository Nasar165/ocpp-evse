import { DEFAULT_TIMER, IWriter } from '../../../websocket/websocket.model';
import { Action, CreateRequestFrame, GetRequestFrame } from '../../ocpp.action';
import { IResponse } from '../../ocpp.frame';
import { CreateTransaction } from '../../transaction/transaction.handler';
import {
  BootNotificationRes,
  IBootNotification,
  Status,
} from './boot.notification.model';
import { CreateError, ErrorCode } from '../../ocpp.error';
import Validate from '@/app/helper/validation.helper';
import { StatusNotification } from '../status-notification/status.notification';
import { ChangeState } from '../../ocpp.handler';

const defaultValue: IBootNotification = {
  chargePointVendor: 'EW',
  chargePointModel: 'CHR22',
  chargeBoxSerialNumber: 'CR-00',
  chargePointSerialNumber: 'CR-00',
  firmwareVersion: '',
  iccid: '',
  imsi: '',
  meterSerialNumber: '',
  meterType: 'power',
};

let id: ReturnType<typeof setTimeout>;
let success = false;

function retry(w: IWriter): void {
  id = setTimeout(() => {
    try {
      SendBootNotification(w);
    } catch (error) {
      clearTimeout(id);
    }
  }, DEFAULT_TIMER);
}

function SendBootNotification(w: IWriter): void {
  try {
    clearTimeout(id);
    if (success) return;
    const frame = CreateRequestFrame(Action.BOOT_NOTIFICATION, defaultValue);
    CreateTransaction(GetRequestFrame(frame), BootNotification);
    w.Write(frame);
  } catch (error) {
    retry(w);
  }
}

function BootNotification(
  w: IWriter,
  frame: IResponse,
  changeState: ChangeState
): void {
  clearTimeout(id);
  const [result, validation] = Validate<BootNotificationRes>(
    BootNotificationRes,
    frame.payload
  );

  if (validation.length > 0) {
    w.Write(
      CreateError(ErrorCode.PropertyConstraintViolation, validation, frame.uuid)
    );
    return retry(w);
  }

  if (result.status == Status.PENDING) {
    w.Write(
      CreateError(
        ErrorCode.NotSupported,
        {
          err: 'Pending functionality is not supported',
        },
        frame.uuid
      )
    );

    return retry(w);
  }

  if (result.status == Status.REJECTED) {
    return retry(w);
  }
  changeState(StatusNotification.AVAILABLE);
  success = true;
}

export { SendBootNotification, BootNotification };
