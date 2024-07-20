import React from 'react';

const NavBar = ({ handleNavigation }) => {
  return (
    <div className="w-1/5 bg-gradient-to-b from-electric-sky-100 to-electric-sky-200 text-white-for-text-2 p-4 rounded-md m-4">
      <h2 className="text-2xl text-center font-bold mb-4">Dashboard</h2>
      <nav>
        <ul>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
              onClick={() => handleNavigation('home', '/dashboard/')}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
              onClick={() => handleNavigation('client', '/dashboard/#client')}
            >
              Clientes
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
              onClick={() => handleNavigation('employee', '/dashboard/#employee')}
            >
              Empleados
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
              onClick={() => handleNavigation('stock', '/dashboard/#stock')}
            >
              Stock
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
              onClick={() => handleNavigation('payment', '/dashboard/#payment')}
            >
              Historial de pagos
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
              onClick={() => handleNavigation('setting', '/dashboard/#setting')}
            >
              Configuraciones
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
