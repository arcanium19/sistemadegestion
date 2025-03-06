"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BudgetCard from "../cards/BudgetCard";
import Loading from "../loading/Loading";
import PaginationComponent from "../pagination/Pagination";
import ButtonOption from "../buttons/ButtonOption";
import ModalConfirm from "../modals/ModalConfirm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

const Budgets = () => {
  const [budgetsData, setBudgetsData] = useState({
    budgets: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const fetchBudgets = async (page) => {
    setLoadingPagination(true);
    try {
      const response = await axios.get(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/budget`,
        { params: { page, limit: 10 } }
      );
      const {
        budgets = [],
        totalItems = 0,
        totalPages = 0,
        currentPage = 1,
      } = response.data.data || {};
      setBudgetsData({ budgets, totalItems, totalPages, currentPage });
    } catch (error) {
      console.error("Error al obtener presupuestos:", error);
      setSnackbarMessage(error?.response?.data?.message || "Hubo un error");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoadingPagination(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadBudgets = async () => {
      setLoading(true);
      await fetchBudgets(1);
      setLoading(false);
    };
    loadBudgets();
  }, []);

  const handlePageChange = (event, newPage) => {
    fetchBudgets(newPage);
  };

  const openConfirmModal = (budgetId) => {
    setBudgetToDelete(budgetId);
    setIsModalOpen(true);
  };

  const handleDeleteBudget = async () => {
    try {
      await axios.delete(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/budget/${budgetToDelete}`
      );
      setSnackbarMessage("Presupuesto eliminado con éxito");
      setSnackbarSeverity("success");
      fetchBudgets(budgetsData.currentPage);
    } catch (error) {
      setSnackbarMessage("Error al eliminar el presupuesto");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      setIsModalOpen(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <div className="min-h-screen lg:min-h-full flex flex-col bg-dark-light shadow-md rounded-md p-4">
      <div className="flex flex-col -left-full my-3">
        <h1 className="text-3xl text-center py-4">PRESUPUESTOS</h1>
        <ButtonOption
          actionType="New"
          additionalText="Nuevo Presupuesto"
          onClick={() => router.push("/dashboard/budgets/new")}
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          {budgetsData.budgets.length > 0 ? (
            <>
              <ul className="flex-grow overflow-y-auto">
                {loadingPagination ? (
                  <Loading />
                ) : (
                  budgetsData.budgets.map((budget) => (
                    <BudgetCard
                      key={budget.id}
                      budget={budget}
                      onDetails={() =>
                        router.push(`/dashboard/budgets/${budget.id}`)
                      }
                      onEdit={() =>
                        router.push(`/dashboard/budgets/edit/${budget.id}`)
                      }
                      onDelete={() => openConfirmModal(budget.id)}
                      onPrint={() => console.log("Imprimir PDF", budget.id)}
                    />
                  ))
                )}
              </ul>

              {/* Paginación solo si hay presupuestos */}
              <div className="flex justify-center items-center h-12 mt-4">
                <PaginationComponent
                  page={budgetsData.currentPage}
                  totalPages={budgetsData.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center flex-grow">
              <h3 className="text-white-for-text-4">
                No se han creado presupuestos aún...
              </h3>
            </div>
          )}
        </>
      )}

      {/* Modal Confirmación */}
      <ModalConfirm
        isOpen={isModalOpen}
        message="¿Seguro que desea eliminar este presupuesto?"
        onClose={() => setIsModalOpen(false)}
        onAccept={handleDeleteBudget}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Budgets;