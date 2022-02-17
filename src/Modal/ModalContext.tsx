import React, { useContext } from 'react';
import ModalPortal from './ModalPortal';

interface IModalContext {
  isOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode;
}

const ModalContext = React.createContext<IModalContext>({} as IModalContext);

export function useModal() {
  return useContext(ModalContext);
}

export const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setIsOpen(true);
    if (content) {
      setModalContent(content);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
      <ModalPortal />
      {children}
    </ModalContext.Provider>
  );
};
