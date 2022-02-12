import React from 'react';

interface IFormInputProps {
  id: string;
  value: string;
  onChange: (val: string) => void;
  label: string;
  autoFocus?: boolean;
  name?: string;
  type?: 'email' | 'password' | 'text';
  errorMessage?: string;
}

const FormInput: React.FC<IFormInputProps> = ({ id, onChange, label, errorMessage, ...rest }: IFormInputProps) => {
  return (
    <div className='relative my-8 mb-12'>
      <input
        id={id}
        className='peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-700'
        placeholder='john@doe.com'
        onChange={({ target: { value } }) => onChange(value)}
        {...rest}
      />
      <label
        htmlFor={id}
        className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
      >
        {label}
      </label>
      {errorMessage && <div className='absolute right-0 -bottom-6 text-red-500'>{errorMessage}</div>}
    </div>
  );
};

export default FormInput;
