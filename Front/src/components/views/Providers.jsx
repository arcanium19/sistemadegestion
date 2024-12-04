"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../loading/Loading";
import PaginationComponent from "../pagination/Pagination";
import ProviderCard from "../cards/Providers-card";
import ButtonOption from "../buttons/ButtonOption";
import ModalConfirm from "../modals/ModalConfirm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Providers = () => {
  const [providersData, setProvidersData] = useState({
    providers: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const router = useRouter();

  // Función para obtener proveedores
  const fetchProviders = async (page) => {
    setLoadingPagination(true);
    try {
      const response = await axios.get(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/provider/`,
        {
          params: { page, limit: 10 },
        }
      );
      const { providers, totalItems, totalPages, currentPage } =
        response.data.data;
      setProvidersData({ providers, totalItems, totalPages, currentPage });
    } catch (error) {
      console.error("Error al obtener proveedores:", error.message);
    } finally {
      setLoadingPagination(false);
    }
  };

  // Efecto para carga inicial del componente
  useEffect(() => {
    const loadData = async () => {
      setLoadingInitial(true);
      await fetchProviders(page);
      setLoadingInitial(false);
    };
    loadData();
  }, []);

  // Función para cambiar de página
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchProviders(newPage);
  };

  // Abrir el modal de confirmación
  const openConfirmModal = (providerId) => {
    setProviderToDelete(providerId);
    setIsModalOpen(true);
  };

  // Función para eliminar proveedor
  const handleDeleteProvider = async () => {
    setIsDeleting(true);
    setIsModalOpen(false);

    try {
      const response = await axios.delete(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/provider/${providerToDelete}`
      );
      // Mostrar mensaje de éxito
      setSnackbarMessage("Proveedor eliminado con éxito");
      setSnackbarSeverity("success");
    } catch (error) {
      // Mostrar mensaje de error
      setSnackbarMessage(error?.response?.data?.message || "Hubo un error");
      setSnackbarSeverity("error");
    } finally {
      setIsDeleting(false);
      setSnackbarOpen(true); // Mostrar el Snackbar
      fetchProviders(page); // Actualizar la lista de proveedores
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
            <h1 className="text-3xl text-center py-4">PROVEEDORES</h1>
            <ButtonOption
              actionType="New"
              additionalText="NUEVO Proveedor"
              onClick={() => console.log("Nuevo proveedor")}
            />
          </div>
          {providersData.totalItems > 0 ? (
            <>
              <ul className="flex-grow overflow-y-auto">
                {loadingPagination ? (
                  <Loading />
                ) : (
                  providersData.providers.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onDelete={() => openConfirmModal(provider.id)}
                      onClick={() => handleProviderClick(provider.id)}
                      isDeleting={isDeleting && providerToDelete === provider.id}
                    />
                  ))
                )}
              </ul>
              <div className="flex justify-center items-center h-12 mt-4">
                <PaginationComponent
                  page={providersData.currentPage}
                  totalPages={providersData.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center flex-grow">
              <h3 className="text-white-for-text-4">
                No se han creado proveedores aún...
              </h3>
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      <ModalConfirm
        isOpen={isModalOpen}
        message="¿Seguro que desea eliminar este proveedor?"
        onClose={() => setIsModalOpen(false)}
        onAccept={handleDeleteProvider}
      />

      {/* Snackbar de Material UI para mostrar alertas */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
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

export default Providers;
