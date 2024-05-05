import { StatusNotification } from './command/status-notification/status.notificiation';

interface IChargingSocket {
  State: StatusNotification;
  ChangeState(state: StatusNotification): void;
  GetState(): StatusNotification;
}

class ChargingSocket implements IChargingSocket {
  State: StatusNotification = StatusNotification.UNAVAILABLE;
  booted = false;

  ChangeState(state: StatusNotification): void {
    this.State = state;
  }

  GetState(): StatusNotification {
    return this.State;
  }
}

export type { IChargingSocket };
export { ChargingSocket };
