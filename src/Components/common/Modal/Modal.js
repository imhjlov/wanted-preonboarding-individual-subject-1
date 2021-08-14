import React from "react";
import ModalPortal from "Components/common/Modal/ModalPortal";

const Modal = ({ isOpen, toggleModal, modalType = null, children }) => {
  return (
    <>
      {isOpen && (
        <ModalPortal toggleModal={toggleModal} modalType={modalType}>
          {children}
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;
