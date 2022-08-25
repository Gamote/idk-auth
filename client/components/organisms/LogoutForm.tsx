import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';

const LogoutForm: FC = () => {
  const onClick = () => undefined;

  return (
    <button
      className="group flex relative justify-center py-2 px-4 w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onClick}
    >
      <span className="flex absolute inset-y-0 left-0 items-center pl-3">
        <ArrowLeftOnRectangleIcon
          className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
          aria-hidden="true"
        />
      </span>
      Sign out
    </button>
  );
};

export default LogoutForm;
