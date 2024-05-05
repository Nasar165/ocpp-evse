import React from 'react';
import { StatusNotification } from '../service/ocpp/status.notificiation';
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

  const onChange = (value: ReturnValue) =>
    changeState(value as StatusNotification);

  return (
    <div>
      state: {state}
      <Select
        items={items}
        onChange={onChange}
        defaultItem={{ name: state, value: state }}
      />
    </div>
  );
}
