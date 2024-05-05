import React from 'react';
import { StatusNotification } from '../service/ocpp/status.notificiation';

type State = {
  state: StatusNotification;
};

export default function StatusNotificationUI({
  state,
}: State): React.JSX.Element {
  return <div>state: {state}</div>;
}
