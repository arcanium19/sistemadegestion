"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../loading/Loading";
import PaginationComponent from "../pagination/Pagination";
import ClientCard from "../cards/Clients-card";
import ButtonOption from "../buttons/ButtonOption";
import ModalConfirm from "../modals/ModalConfirm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Clients = () => {
  const [clientsData, setClientsData] = useState({
    clients: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado de visibilidad del Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje de la alerta
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severidad de la alerta (success, error, etc.)
  const router = useRouter();

  // Función para obtener clientes
  const fetchClients = async (page) => {
    setLoadingPagination(true);
    try {
      const response = await axios.get(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/client/`,
        {
          params: { page, limit: 10 },
        }
      );
      const { clients, totalItems, totalPages, currentPage } =
        response.data.data;
      setClientsData({ clients, totalItems, totalPages, currentPage });
    } catch (error) {
      console.error("Error al obtener clientes:", error.message);
    } finally {
      setLoadingPagination(false);
    }
  };

  // Efecto para carga inicial del componente
  useEffect(() => {
    const loadData = async () => {
      setLoadingInitial(true);
      await fetchClients(page);
      setLoadingInitial(false);
    };
    loadData();
  }, []);

  // Función para cambiar de página
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchClients(newPage);
  };

  // Abrir el modal de confirmación
  const openConfirmModal = (clientId) => {
    setClientToDelete(clientId);
    setIsModalOpen(true);
  };

  // Función para eliminar cliente
  const handleDeleteClient = async () => {
    setIsDeleting(true);
    setIsModalOpen(false);

    try {
      const response = await axios.delete(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/client/${clientToDelete}`
      );
      // Mostrar mensaje de éxito
      setSnackbarMessage("Cliente eliminado con éxito");
      setSnackbarSeverity("success");
    } catch (error) {
      // Mostrar mensaje de error
      setSnackbarMessage(error?.response?.data?.message || "Hubo un error");
      setSnackbarSeverity("error");
    } finally {
      setIsDeleting(false);
      setSnackbarOpen(true); // Mostrar el Snackbar
      fetchClients(page); // Actualizar la lista de clientes
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
            <h1 className="text-3xl text-center py-4">CLIENTES</h1>
            <ButtonOption
              actionType="New"
              additionalText="NUEVO Cliente"
              onClick={() => console.log("Nuevo cliente")}
            />
          </div>
          {clientsData.totalItems > 0 ? (
            <>
              <ul className="flex-grow overflow-y-auto">
                {loadingPagination ? (
                  <Loading />
                ) : (
                  clientsData.clients.map((client) => (
                    <ClientCard
                      key={client.id}
                      client={client}
                      onDelete={() => openConfirmModal(client.id)}
                      onClick={() => handleClientClick(client.id)}
                      isDeleting={isDeleting && clientToDelete === client.id}
                    />
                  ))
                )}
              </ul>
              <div className="flex justify-center items-center h-12 mt-4">
                <PaginationComponent
                  page={clientsData.currentPage}
                  totalPages={clientsData.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center flex-grow">
              <h3 className="text-white-for-text-4">
                No se han creado clientes aún...
              </h3>
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      <ModalConfirm
        isOpen={isModalOpen}
        message="¿Seguro que desea eliminar este cliente?"
        onClose={() => setIsModalOpen(false)}
        onAccept={handleDeleteClient}
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

export default Clients;
