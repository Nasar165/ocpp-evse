import { StatusNotification } from './status.notificiation';

interface IChargingSocket {
  ChangeState(state: StatusNotification): void;
  GetState(): StatusNotification;
}

class ChargingSocket implements IChargingSocket {
  booted = false;
  constructor(private state: StatusNotification) {}

  ChangeState(state: StatusNotification): void {
    this.state = state;
  }

  GetState(): StatusNotification {
    return this.state;
  }
}

export type { IChargingSocket };
export { ChargingSocket };
