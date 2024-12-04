import React from "react";
import ButtonOption from "../buttons/ButtonOption";

const ModalConfirm = ({ isOpen, onClose, message, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-4 w-full max-w-sm shadow-lg relative">
        <div className="text-center p-4 text-gray-800">
          <p className="text-base sm:text-lg mb-6">{message}</p>
          <div className="flex justify-center gap-4">
            <ButtonOption
              actionType="Aceptar"
              onClick={onAccept}
            />
            <ButtonOption
              actionType="Cancelar"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
