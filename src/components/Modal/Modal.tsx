import React from 'react';
import { useModal } from '../../Contexts/ModalContext';

type Props = {
  title?: string;
  handleGreen?: any;
  labelGreen?: string;
  disableGreen?: boolean;
  handleRed?: any;
  labelRed?: string;
  disableRed?: boolean;
};

const Modal: React.FC<Props> = (props) => {
  const { title, handleGreen, handleRed, labelGreen, labelRed, disableGreen, disableRed, children } = props;
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
      <div style={{minWidth: '30%'}} className='bg-white p-5 shadow-lg rounded flex flex-col text-gray-800'>
        {title && <p className='text-2xl font-medium mb-3 vt323'>{title}</p>}
        <div className='my-4'>{children}</div>
        {(labelGreen || labelRed) && (
          <div className='flex flex-grow justify-end mt-2'>
            {labelRed && (
              <button onClick={onRed} disabled={disableRed} className='m-2 py-2 px-4 rounded bg-red-400 text-white disabled:opacity-50'>
                {labelRed}
              </button>
            )}
            {labelGreen && (
              <button onClick={onGreen} disabled={disableGreen} className='m-2 py-2 px-4 rounded bg-green-500 text-white disabled:opacity-50'>
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
    disableGreen: false,
    handleRed: () => {},
    labelRed: undefined,
    disableRed: false,
}

export default Modal;
