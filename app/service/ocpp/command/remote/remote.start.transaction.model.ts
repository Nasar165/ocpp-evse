import { IsOptional, IsString, Min, Max } from 'class-validator';

enum Status {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
}

interface IRemoteStartTransactionRes {
  status: Status;
}

interface IRemoteStartTransaction {
  connectorId: number;
  idTag: string;
}

class RemoteStartTransaction implements IRemoteStartTransaction {
  @Min(0)
  @Max(1)
  @IsOptional()
  connectorId: number = 0;
  @IsString()
  idTag: string = '';
  @IsOptional()
  chargingProfile: unknown;
}

export type { IRemoteStartTransactionRes, IRemoteStartTransaction };
export { RemoteStartTransaction, Status };
