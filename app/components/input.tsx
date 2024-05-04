import { SyntheticEvent } from 'react';

type InputEvent = (event: SyntheticEvent<HTMLInputElement>) => void;

type input = {
  name: string;
  value: string;
  disabled: boolean;
  onChange: InputEvent;
};

export default function Input({
  name,
  value,
  disabled,
  onChange,
}: input): JSX.Element {
  return (
    <div className='px-4'>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        Websocket Url
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        <input
          name={name}
          type='text'
          defaultValue={value}
          onChange={onChange}
          className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder='wss://'
          disabled={disabled}
        />
      </div>
    </div>
  );
}
