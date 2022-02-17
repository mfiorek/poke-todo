import React from 'react';
import ReactDOM from 'react-dom';
import { useModal } from './ModalContext';

const ModalPortal = () => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  const { isOpen, modalContent } = useModal();

  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(<>{modalContent}</>, modalRoot);
};

export default ModalPortal;
