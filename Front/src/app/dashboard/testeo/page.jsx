"use client"
import React, { useState } from 'react';
import ModalData from '@/components/modals/ModalData';

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Función que se ejecuta al aceptar (por ejemplo, una acción de confirmación)
  const handleAccept = () => {
    console.log("Acción confirmada");
    // Realiza las acciones necesarias aquí
    setIsModalOpen(false); // Cierra el modal después de aceptar
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Abrir Modal
      </button>

      <ModalData
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAccept}
        message="¿Estás seguro de que deseas continuar con esta acción?"
      />
    </div>
  );
};

export default ParentComponent;
