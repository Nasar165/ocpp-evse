type button = {
  text: string;
  disabled: boolean;
  onClick: () => void;
};

export default function Button({ text, disabled, onClick }: button) {
  const disable = disabled ? 'bg-gray-400' : '';
  return (
    <button
      className={`${disable} border border-blue-600 rounded-md px-4 py-2 my-4`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
