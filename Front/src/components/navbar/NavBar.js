import React from 'react';

const NavBar = ({ handleNavigation }) => {
  return (
    <div className="w-1/5 bg-gradient-to-b from-electric-sky-100 to-electric-sky-200 text-white-for-text-2 p-4 rounded-md m-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <nav>
        <ul>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700"
              onClick={() => handleNavigation('clients', '/dashboard/#client')}
            >
              Clientes
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700"
              onClick={() => handleNavigation('employees', '/dashboard/#employee')}
            >
              Empleados
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700"
              onClick={() => handleNavigation('component1', '/dashboard/#user')}
            >
				
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700"
              onClick={() => handleNavigation('component2', '/dashboard/#client')}
            >
              Component 2
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
