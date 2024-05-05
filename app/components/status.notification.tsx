import React from 'react';
import { StatusNotification } from '../service/ocpp/command/status-notification/status.notificiation';
import { ChangeState } from '../service/ocpp/ocpp.handler';
import Select, { Item, ReturnValue } from './select';

type State = {
  state: StatusNotification;
  changeState: ChangeState;
};

export default function StatusNotificationUI({
  state,
  changeState,
}: State): React.JSX.Element {
  const items: Array<Item> = Object.values(StatusNotification).map((v) => {
    return { name: v, value: v };
  });
  const defaultState = { name: state, value: state };

  const onChange = (value: ReturnValue) =>
    changeState(value as StatusNotification);

  console.log(state);

  return (
    <div>
      state: {state}
      <Select items={items} onChange={onChange} defaultItem={defaultState} />
    </div>
  );
}
