import Evse from './components/evse';

export default function Home() {
  return (
    <div className='pt-6 text-center'>
      <h1 className='text-4xl'>OCPP 1.6-J EVSE Test tool</h1>
      <Evse />
    </div>
  );
}
