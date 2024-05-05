import { useEffect, useState } from 'react';

type ReturnValue = string | number;

type Item = {
  name: string;
  value: ReturnValue;
};

type Select = {
  items: Array<Item>;
  defaultItem: Item;
  onChange: (value: ReturnValue) => void;
};

function Selected(item: Item, selected?: Item) {
  if (selected == null || item.name != selected.name) return null;
  return (
    <span className='text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4'>
      <svg
        className='h-5 w-5'
        viewBox='0 0 20 20'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z' />
      </svg>
    </span>
  );
}

export default function Select({
  items,
  defaultItem,
  onChange,
}: Select): React.JSX.Element {
  const [selected, setSelected] = useState<Item>();
  const [drop, setDrop] = useState(false);
  const show = drop ? '' : 'hidden';

  const onClick = (item: Item) => {
    setSelected(item);
    onChange(item.value);
    onDrop();
  };

  const onDrop = () => {
    setDrop((v) => !v);
  };

  useEffect(() => {
    setSelected(defaultItem);
  }, [defaultItem]);

  return (
    <div className='px-4'>
      <div className='relative mt-2'>
        <button
          onClick={onDrop}
          type='button'
          className=' relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'
        >
          <span className='flex items-center'>
            <span className='ml-3 block truncate'>
              {selected == null ? null : selected.name}
            </span>
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
            <svg className='h-5 w-5 text-gray-400' viewBox='0 0 20 20'>
              <path d='M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z' />
            </svg>
          </span>
        </button>
        <ul
          className={`${show} absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
          role='listbox'
          aria-labelledby='listbox-label'
          aria-activedescendant='listbox-option-3'
        >
          {items.map((item) => (
            <li
              onClick={() => onClick(item)}
              key={item.name}
              className='text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9'
            >
              <div className='flex items-center'>
                <span className='font-normal ml-3 block truncate'>
                  {item.name}
                </span>
              </div>
              {Selected(item, selected)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export type { Item, ReturnValue };
