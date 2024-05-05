import { DEFAULT_TIMER, IWriter } from '../../../websocket/websocket.model';
import { Action, CreateRequestFrame } from '../../ocpp.action';
import { BaseTuple, ResponseTuple } from '../../ocpp.frame';
import { IBootNotification } from './bootnotification.model';

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

function retry(writer: IWriter): void {
  try {
    SendBootNotification(writer);
  } catch (error) {
    clearTimeout(id);
  }
}

function SendBootNotification(writer: IWriter): void {
  clearTimeout(id);
  const frame = CreateRequestFrame(Action.BOOT_NOTIFICATION, defaultValue);
  writer.Write(frame);
}

function BootNotification(frame: ResponseTuple | BaseTuple): void {
  clearTimeout(id);
}

export { SendBootNotification, BootNotification };
