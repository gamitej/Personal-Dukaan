// import { useCallback, useEffect, useState } from "react";
import "./Modal.scss";
import { CgClose } from "react-icons/cg";

interface ModalProps {
  title: string;
  isOpen: boolean;
  modalWidth?: string;
  modalHeight?: string;
  children: React.ReactNode;
  onClose: (val: boolean) => void;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title = "TITLE",
  modalWidth = "20rem",
  modalHeight = "20rem",
}: ModalProps) => {
  if (!isOpen) return null;

  /**
   * TSX
   */
  return (
    <div
      className="modal-overlay"
      style={{
        animation: `${
          isOpen
            ? "slideInCenter 0.5s forwards"
            : "slideOutCenter 0.5s forwards"
        }`,
      }}
    >
      <div className="modal" style={{ width: modalWidth, height: modalHeight }}>
        <div className="modal-head">
          <h3>{title}</h3>
          <div onClick={() => onClose(false)} className="close">
            <CgClose />
          </div>
        </div>
        <div className="border-bottom"></div>
        {/* body */}
        <div className="children w-full h-[100%]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
