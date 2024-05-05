import { Min } from 'class-validator';

interface IRemoteStopTransaction {
  transactionId: number;
}

class RemoteStopTransaction implements IRemoteStopTransaction {
  @Min(0)
  transactionId: number = 0;
}

export type { IRemoteStopTransaction };
export { RemoteStopTransaction };
