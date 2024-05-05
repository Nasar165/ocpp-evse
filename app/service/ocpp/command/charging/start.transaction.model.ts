import { Min } from 'class-validator';

enum AuthorizationStatus {
  ACCEPTED = 'Accepted',
  BLOCKED = 'Blocked',
  EXPIRED = 'Expired',
  INVALID = 'Invalid',
  CONCURRENT_TX = 'ConcurrentTx',
}

interface IIdTagInfo {
  expiryDate: Date;
  parentIdTag: string;
  status: string;
}

interface IStartTransactionRes {
  idTagInfo: IIdTagInfo;
  transactionId: number;
}

interface IStartTransaction {
  connectorId: number;
  idTag: string;
  meterStart: number;
  timestamp: Date;
}

interface IChargingSession {
  idTag: string;
  transactionId: number;
  connectorId: number;
}

class StartTransactionsRes implements IStartTransactionRes {
  idTagInfo: IIdTagInfo = {
    expiryDate: new Date(),
    status: AuthorizationStatus.BLOCKED,
    parentIdTag: '',
  };

  @Min(0)
  transactionId: number = 0;
}

export type {
  IIdTagInfo,
  IStartTransaction,
  IStartTransactionRes,
  IChargingSession,
};
export { AuthorizationStatus, StartTransactionsRes };
