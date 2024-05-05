import { IWriter } from '../../../websocket/websocket.model';
import { Action, CreateRequestFrame, GetRequestFrame } from '../../ocpp.action';
import { IResponse } from '../../ocpp.frame';
import { NewTransaction } from '../../transaction/transaction.handler';
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
  NewTransaction(GetRequestFrame(frame), BootNotification);
  writer.Write(frame);
}

function BootNotification(frame: IResponse): void {
  clearTimeout(id);
  console.log(frame.payload);
}

export { SendBootNotification, BootNotification };
