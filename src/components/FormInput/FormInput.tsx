import React from 'react';

interface IFormInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  type?: 'email' | 'password' | 'text';
  errorMessage?: string;
}

const FormInput: React.FC<IFormInputProps> = ({ onChange, errorMessage, ...rest }: IFormInputProps) => {
  return (
    <div>
      {errorMessage && <div className='my-1 px-2 py-3 border border-red-800 bg-red-200 rounded-md text-red-800'>{errorMessage}</div>}
      <input className='rounded-md w-full border border-gray-400 p-3 mb-5' onChange={({ target: { value } }) => onChange(value)} {...rest} />
    </div>
  );
};

export default FormInput;
