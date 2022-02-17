import React from 'react';
import { useModal } from './ModalContext';

type Props = {
  title?: string;
  handleGreen?: any;
  labelGreen?: string;
  handleRed?: any;
  labelRed?: string;
};

const Modal: React.FC<Props> = (props) => {
  const { title, handleGreen, handleRed, labelGreen, labelRed, children } = props;
  let { closeModal } = useModal();

  const onGreen = () => {
    handleGreen();
    closeModal();
  };

  const onRed = () => {
    handleRed();
    closeModal();
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-80'>
      <div className='bg-white p-5 shadow-lg rounded flex flex-col text-gray-800 w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4'>
        {title && <p className='text-2xl font-medium mb-3 vt323'>{title}</p>}
        <div className='my-4'>{children}</div>
        {(labelGreen || labelRed) && (
          <div className='flex flex-grow justify-end mt-2'>
            {labelRed && (
              <button onClick={onRed} className='m-2 py-2 px-4 rounded bg-red-400 text-white'>
                {labelRed}
              </button>
            )}
            {labelGreen && (
              <button onClick={onGreen} className='m-2 py-2 px-4 rounded bg-green-500 text-white'>
                {labelGreen}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.defaultProps = {
    title: undefined,
    handleGreen: () => {},
    labelGreen: undefined,
    handleRed: () => {},
    labelRed: undefined,
}

export default Modal;
