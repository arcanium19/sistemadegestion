import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to check if the path is active
  const isActive = (path) => pathname === path;

  // Handle navigation
  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  return (
    <div className="relative w-full lg:w-[300px]">
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <button
        className="lg:hidden z-50 p-2 text-electric-sky-100"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <CloseIcon sx={{ fontSize: { xs: 40, sm: 44, md: 50, lg: 66 } }} />
        ) : (
          <MenuIcon sx={{ fontSize: { xs: 40, sm: 44, md: 50, lg: 66 } }} />
        )}
      </button>

      <div
        className={`fixed lg:relative inset-y-0 left-0 max-w-full bg-gradient-to-b from-electric-sky-100 to-electric-sky-200 text-white-for-text-2 p-4 rounded-md m-4 transform transition-transform duration-300 ease-in-out z-50
          ${
            isMenuOpen ? "-translate-x-3" : "-translate-x-[120%]"
          } lg:translate-x-0 lg:relative lg:block`}
      >
        <h2 className="text-2xl text-center font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li className="flex items-center mb-2">
              <button
                className={`w-full text-left p-2 rounded-md ${
                  isActive("/dashboard/")
                    ? "bg-gray-800 text-blue-200"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleNavigation("/dashboard")}
              >
                <HomeIcon className="mr-2" />
                Inicio
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className={`w-full text-left p-2 rounded-md ${
                  isActive("/dashboard/clients")
                    ? "bg-gray-800 text-blue-200"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleNavigation("/dashboard/clients")}
              >
                <GroupIcon className="mr-2" />
                Clientes
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className={`w-full text-left p-2 rounded-md ${
                  isActive("/dashboard/employees")
                    ? "bg-gray-800 text-blue-200"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleNavigation("/dashboard/employees")}
              >
                <WorkIcon className="mr-2" />
                Empleados
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className={`w-full text-left p-2 rounded-md ${
                  isActive("/dashboard/materials")
                    ? "bg-gray-800 text-blue-200"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleNavigation("/dashboard/materials")}
              >
                <Inventory2Icon className="mr-2" />
                Materiales
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className={`w-full text-left p-2 rounded-md ${
                  isActive("/dashboard/payments")
                    ? "bg-gray-800 text-blue-200"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleNavigation("/dashboard/payments")}
              >
                <HistoryIcon className="mr-2" />
                Historial de Pagos
              </button>
            </li>
            <li className="flex items-center mb-2">
              <button
                className={`w-full text-left p-2 rounded-md ${
                  isActive("/dashboard/settings")
                    ? "bg-gray-800 text-blue-200"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleNavigation("/dashboard/settings")}
              >
                <SettingsIcon className="mr-2" />
                Configuración
              </button>
            </li>
            {/* Agrega más botones aquí para las demás rutas */}
            <li className="flex items-center mb-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-700 rounded-md"
                onClick={() => {
                  dispatch(logout());
                  router.push("/");
                }}
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
