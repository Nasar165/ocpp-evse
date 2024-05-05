import { IRequest } from '../ocpp.frame';
import { ActionResponse, ITransaction, Transaction } from './transaction.model';

const List: Array<ITransaction> = [];

function NewTransaction(frame: IRequest, handler: ActionResponse): void {
  List.push(new Transaction(frame, handler));
}

function FindTransaction(id: string): ITransaction {
  const transaction = List.find((t) => t.GetID() == id);
  if (transaction == null) throw new Error('transaction was not found');
  return transaction;
}

function GetTransactions(): Array<ITransaction> {
  return List;
}

export { GetTransactions, NewTransaction, FindTransaction };
