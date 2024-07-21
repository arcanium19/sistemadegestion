import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu"; // Icono del menú
import CloseIcon from "@mui/icons-material/Close"; // Icono de cerrar menú
import HomeIcon from "@mui/icons-material/Home"; // Icono de Inicio
import GroupIcon from "@mui/icons-material/Group"; // Icono de Clientes
import WorkIcon from "@mui/icons-material/Work"; // Icono de Empleados
import Inventory2Icon from "@mui/icons-material/Inventory2"; // Icono de Stock
import HistoryIcon from "@mui/icons-material/History"; // Icono de Historial de pagos
import SettingsIcon from "@mui/icons-material/Settings"; // Icono de Configuraciones
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icono de Cerrar Sesión


const NavBar = ({ handleNavigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-full lg:w-[300px]">
      {/* Botón de menú visible en pantallas pequeñas */}
      <button
        className="lg:hidden items-center justify-center p-2 text-electric-sky-100"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* NavBar principal visible en pantallas grandes */}
      <div
        className={`bg-gradient-to-b from-electric-sky-100 to-electric-sky-200 text-white-for-text-2 p-4 rounded-md m-4 lg:block ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl text-center font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li className="flex items-center mb-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
                onClick={() => handleNavigation("home", "/dashboard/")}
              >
                <HomeIcon className="mr-2" />
                Inicio
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
                onClick={() => handleNavigation("client", "/dashboard/#client")}
              >
                <GroupIcon className="mr-2" />
                Clientes
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
                onClick={() =>
                  handleNavigation("employee", "/dashboard/#employee")
                }
              >
                <WorkIcon className="mr-2" />
                Empleados
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
                onClick={() => handleNavigation("stock", "/dashboard/#stock")}
              >
                <Inventory2Icon className="mr-2" />
                Stock
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
                onClick={() =>
                  handleNavigation("payment", "/dashboard/#payment")
                }
              >
                <HistoryIcon className="mr-2" />
                Historial de pagos
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
                onClick={() =>
                  handleNavigation("setting", "/dashboard/#setting")
                }
              >
                <SettingsIcon className="mr-2" />
                Configuraciones
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-700 hover:rounded-md"
                onClick={() =>
                  handleNavigation("setting", "/dashboard/#logout")
                }
              >
                <ExitToAppIcon className="mr-2" />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
