import { IsNumber, IsEnum, Min, Max, IsString } from 'class-validator';

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

class BootNotificationRes implements IBootNotificationRes {
  @IsString()
  currentTime: Date = new Date();

  @IsNumber()
  @Min(180)
  @Max(84000)
  interval = 0;

  @IsEnum(Status)
  status = Status.PENDING;
}

export type { IBootNotification };
export { Status, BootNotificationRes };
