"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../loading/Loading";
import PaginationComponent from "../pagination/Pagination";
import EmployeeCard from "../cards/Employees-card";
import ButtonOption from "../buttons/ButtonOption";

const Employees = () => {
  const [employeesData, setEmployeesData] = useState({
    employees: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Función para obtener empleados
  const fetchEmployees = async (page) => {
    setLoadingPagination(true); // Activar loading de paginación
    try {
      const response = await axios.get(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/employee/`,
        {
          params: { page, limit: 10 },
        }
      );
      const { employees, totalItems, totalPages, currentPage } =
        response.data.data;
      setEmployeesData({ employees, totalItems, totalPages, currentPage });
    } catch (error) {
      console.error("Error al obtener empleados:", error.message);
    } finally {
      setLoadingPagination(false); // Desactivar loading de paginación
    }
  };

  // Efecto para carga inicial del componente
  useEffect(() => {
    const loadData = async () => {
      setLoadingInitial(true); // Activar loading inicial
      await fetchEmployees(page);
      setLoadingInitial(false); // Desactivar loading inicial
    };
    loadData();
  }, []); // Solo en el montaje inicial

  // Función para cambiar de página
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchEmployees(newPage); // Llamada al backend para cambiar de página
  };

  const handleEmployeeClick = (employeeId) => {
    router.push(`/employees/${employeeId}`);
  };

  // Renderizado del componente
  return (
    <div className="min-h-screen lg:min-h-full flex flex-col bg-dark-light shadow-md rounded-md p-4">
      {loadingInitial ? (
        // Contenedor centrado en pantalla para el primer loading
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col -left-full my-3">
            <h1 className="text-3xl text-center py-4">EMPLEADOS</h1>
            <ButtonOption
              actionType="New"
              additionalText="NUEVO EMPLEADO"
              onClick={() => console.log("Nuevo empleado")}
            />
          </div>
          {employeesData.totalItems > 0 ? (
            <>
              {/* Mostrar loading de paginación en el área de empleados */}
              <ul className="flex-grow overflow-y-auto">
                {loadingPagination ? (
                  <Loading />
                ) : (
                  employeesData.employees.map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      employee={employee}
                      onClick={() => handleEmployeeClick(employee.id)}
                    />
                  ))
                )}
              </ul>
              <div className="flex justify-center items-center h-12 mt-4">
                <PaginationComponent
                  page={employeesData.currentPage}
                  totalPages={employeesData.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center flex-grow">
              <h3 className="text-white-for-text-4">
                No se han registrado empleados aún...
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Employees;
