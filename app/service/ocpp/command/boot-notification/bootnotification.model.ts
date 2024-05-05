enum Status {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  PENDING = 'Pending',
}

interface IBootNotification {
  chargePointVendor: string;
  chargePointModel: string;
  chargeBoxSerialNumber: string;
  chargePointSerialNumber: string;
  firmwareVersion: string;
  iccid: string;
  imsi: string;
  meterSerialNumber: string;
  meterType: string;
}
interface IBootNotificationRes {
  currentTime: Date;
  interval: number;
  status: Status;
}

class BootNotification implements IBootNotification {
  chargePointVendor = '';
  chargePointModel = '';
  chargeBoxSerialNumber = '';
  chargePointSerialNumber = '';
  firmwareVersion = '';
  iccid = '';
  imsi = '';
  meterSerialNumber = '';
  meterType = '';
}

class BootNotificationRes implements IBootNotificationRes {
  currentTime = new Date();
  interval = 0;
  status = Status.PENDING;
}

export type { IBootNotification };
export { BootNotification, BootNotificationRes };
