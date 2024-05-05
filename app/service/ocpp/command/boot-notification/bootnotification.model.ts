import {
  IsNumber,
  IsEnum,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';

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
  @MinLength(1)
  @MaxLength(20)
  chargePointVendor = '';

  @MinLength(1)
  @MaxLength(20)
  chargePointModel = '';

  @MinLength(1)
  @MaxLength(25)
  @IsOptional()
  chargeBoxSerialNumber = '';

  @MinLength(1)
  @MaxLength(25)
  @IsOptional()
  chargePointSerialNumber = '';

  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  firmwareVersion = '';

  @MinLength(1)
  @MaxLength(20)
  @IsOptional()
  iccid = '';

  @MinLength(1)
  @MaxLength(20)
  @IsOptional()
  imsi = '';

  @MinLength(1)
  @MaxLength(25)
  @IsOptional()
  meterSerialNumber = '';

  @MinLength(1)
  @MaxLength(25)
  @IsOptional()
  meterType = '';
}

class BootNotificationRes implements IBootNotificationRes {
  @IsString()
  currentTime: Date = new Date();

  @IsNumber()
  @Min(3600)
  @Max(84000)
  interval = 0;

  @IsEnum(Status)
  status = Status.PENDING;
}

export type { IBootNotification };
export { Status, BootNotification, BootNotificationRes };
