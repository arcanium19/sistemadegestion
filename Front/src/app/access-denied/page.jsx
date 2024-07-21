'use client'
import React from 'react';

const ForbiddenPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">Acceso Denegado</h1>
        <p className="text-center">No tienes permiso para acceder a esta página.</p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
