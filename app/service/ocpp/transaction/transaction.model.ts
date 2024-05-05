import { IWriter } from '../../websocket/websocket.model';
import { IErrorFrame, IRequest, IResponse } from '../ocpp.frame';

type ActionResponse = (w: IWriter, frame: IResponse) => void;

interface ITransaction {
  GetID(): string;
  Handler: ActionResponse;
  AddResponse(w: IWriter, frame: IResponse): void;
  GetResponse(): IResponse | undefined;
  AddError(frame: IErrorFrame): void;
  GetError(): IErrorFrame | undefined;
}

class Transaction implements ITransaction {
  private response?: IResponse;
  private error?: IErrorFrame;
  Handler: ActionResponse;

  constructor(private frame: IRequest, handler: ActionResponse) {
    this.Handler = handler;
  }

  AddError(frame: IErrorFrame): void {
    this.error = frame;
  }

  AddResponse(w: IWriter, frame: IResponse): void {
    this.response = frame;
    this.Handler(w, frame);
  }

  GetID(): string {
    return this.frame.uuid;
  }

  GetError(): IErrorFrame | undefined {
    if (this.error == null) return undefined;
    return this.error;
  }

  GetResponse(): IResponse | undefined {
    if (this.response == null) return undefined;
    return this.response;
  }
}

export type { ITransaction, ActionResponse };
export { Transaction };
