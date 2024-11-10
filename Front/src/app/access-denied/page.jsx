"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ErrorIcon from '@mui/icons-material/Error';

const ForbiddenPage = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark to-dark-gray p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <ErrorIcon className="text-red-600 mb-4" style={{ fontSize: 60 }} />
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">ACCESO DENEGADO</h1>
        <h2 className="text-center">
          No tienes permiso para acceder a esta página.
        </h2>
        <button
          className="w-full px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-6"
          onClick={goHome}
        >
          Volver a la pagina principal
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
