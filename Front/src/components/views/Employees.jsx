"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../loading/Loading";
import PaginationComponent from "../pagination/Pagination";
import EmployeeCard from "../cards/Employees-card";
import ButtonOption from "../buttons/ButtonOption";
import ModalConfirm from "../modals/ModalConfirm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Employees = () => {
  const [employeesData, setEmployeesData] = useState({
    employees: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const router = useRouter();

  // Función para obtener empleados
  const fetchEmployees = async (page) => {
    setLoadingPagination(true);
    try {
      const response = await axios.get(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/employee/`,
        {
          params: { page, limit: 10 },
        }
      );
      const { employees, totalItems, totalPages, currentPage } = response.data.data;
      setEmployeesData({ employees, totalItems, totalPages, currentPage });
    } catch (error) {
		setSnackbarMessage(error?.response?.data?.message || "Hubo un error");
		setSnackbarSeverity("error");
		setSnackbarOpen(true);
    } finally {
      setLoadingPagination(false);
    }
  };

  // Efecto para carga inicial del componente
  useEffect(() => {
    const loadData = async () => {
      setLoadingInitial(true);
      await fetchEmployees(page);
      setLoadingInitial(false);
    };
    loadData();
  }, []);

  // Función para cambiar de página
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchEmployees(newPage);
  };

  // Función para redirigir a los detalles de un empleado
  const handleEmployeeClick = (employeeId) => {
    router.push(`/employees/${employeeId}`);
  };

  // Abrir el modal de confirmación
  const openConfirmModal = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setIsModalOpen(true);
  };

  // Función para eliminar empleado
  const handleDeleteEmployee = async () => {
    setIsDeleting(true);
    setIsModalOpen(false);

    try {
      const response = await axios.delete(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/employee/${employeeToDelete}`
      );
      // Mostrar mensaje de éxito
      setSnackbarMessage("Empleado eliminado con éxito");
      setSnackbarSeverity("success");
    } catch (error) {
      // Mostrar mensaje de error
      setSnackbarMessage(error?.response?.data?.message || "Hubo un error");
      setSnackbarSeverity("error");
    } finally {
      setIsDeleting(false);
      setSnackbarOpen(true); // Mostrar el Snackbar
      fetchEmployees(page); // Actualizar la lista de empleados
    }
  };

  // Función para cerrar el snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Renderizado del componente
  return (
    <div className="min-h-screen lg:min-h-full flex flex-col bg-dark-light shadow-md rounded-md p-4">
      {loadingInitial ? (
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
              <ul className="flex-grow overflow-y-auto">
                {loadingPagination ? (
                  <Loading />
                ) : (
                  employeesData.employees.map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      employee={employee}
                      onClick={() => handleEmployeeClick(employee.id)}
                      onDelete={() => openConfirmModal(employee.id)}
                      isDeleting={isDeleting && employeeToDelete === employee.id}
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

      {/* Modal de confirmación de eliminación */}
      <ModalConfirm
        isOpen={isModalOpen}
        message="¿Seguro que desea eliminar este empleado?"
        onClose={() => setIsModalOpen(false)}
        onAccept={handleDeleteEmployee}
      />

      {/* Snackbar de Material UI para mostrar alertas */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000} // Se cierra automáticamente después de 10 segundos
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ marginX: 2, marginBottom: 2 }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Employees;
