import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from 'react';

// Values taken from:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
export enum TextFieldAutoComplete {
  GivenName = 'given-name',
  FamilyName = 'family-name',
  Email = 'email',
  CurrentPassword = 'current-password',
  NewPassword = 'new-password',
}

export type TextFieldProps = {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  autoComplete?: TextFieldAutoComplete;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string;
  error?: string;
};

/**
 * Custom text field
 */
const TextField: FC<TextFieldProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  autoComplete,
  onChange,
  onBlur,
  value,
  error,
}) => {
  const errorIconView = error && (
    <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
      <ExclamationCircleIcon
        className="w-5 h-5 text-red-500"
        aria-hidden="true"
      />
    </div>
  );

  const errorMessageView = error && (
    <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
      {error}
    </p>
  );

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          id={id}
          name={name}
          type={type}
          className={`block pr-10 w-full sm:text-sm rounded-md ${
            !error
              ? ''
              : 'placeholder-red-300 text-red-900 border-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-none'
          }`}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          aria-invalid={!!error}
          aria-describedby={`${id}-error`}
        />

        {errorIconView}
      </div>

      {errorMessageView}
    </div>
  );
};

export default TextField;
