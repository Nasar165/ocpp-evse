interface IStopTransactionRes {}

interface IStopTransaction {
  idTag: string;
  transactionId: number;
  meterStop: number;
  timestamp: Date;
}

export type { IStopTransaction, IStopTransactionRes };
