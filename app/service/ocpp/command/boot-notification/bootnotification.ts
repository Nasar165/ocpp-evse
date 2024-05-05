import { IWriter } from '../../../websocket/websocket.model';
import {
  Action,
  CreateRequestFrame,
  GetResponseFrame,
} from '../../ocpp.action';
import { ResponseTuple } from '../../ocpp.frame';
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

function BootNotification(frame: ResponseTuple): void {
  clearTimeout(id);
  const response = GetResponseFrame(frame);
  console.log(response.payload);
}

export { SendBootNotification, BootNotification };
