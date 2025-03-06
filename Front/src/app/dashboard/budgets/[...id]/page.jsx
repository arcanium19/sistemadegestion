"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Loading from "../../../../components/loading/Loading";

const BudgetDetail = () => {
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/budget/${id}`
        );
        setBudget(response.data.data);
      } catch (error) {
        console.error("Error al cargar el presupuesto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, [id]);

  if (loading) return <Loading />;

  if (!budget) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-700 lg:min-h-full bg-dark-light shadow-md rounded-md p-4">
        <h2 className="text-gray-200 text-lg">No se encontró el presupuesto</h2>
        <button
          onClick={() => router.push("/dashboard/budgets")}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-700 transition mt-7"
        >
          Volver
        </button>
      </div>
    );
  }

  const totalMaterials = budget.materials.reduce(
    (acc, material) => acc + material.total,
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-700 lg:min-h-full bg-dark-light shadow-md rounded-md p-4">
      {/* Título */}
      <h1 className="text-2xl font-bold text-gray-200 mb-6">
        Presupuesto: {budget.name}
      </h1>

      {/* Información general */}
      <div className="bg-white shadow-md rounded-md w-full max-w-4xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Detalles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-bold">Ubicación:</span> {budget.location}
            </p>
            <p>
              <span className="font-bold">Tipo de trabajo:</span>{" "}
              {budget.work_type}
            </p>
            <p>
              <span className="font-bold">Fecha:</span>{" "}
              {new Date(budget.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p>
              <span className="font-bold">Objetivo:</span> {budget.objective}
            </p>
            <p>
              <span className="font-bold">Detalles finales:</span>{" "}
              {budget.finish_details}
            </p>
            <p>
              <span className="font-bold">Observaciones:</span>{" "}
              {budget.observations}
            </p>
          </div>
        </div>
      </div>

      {/* Datos del cliente */}
      <div className="bg-white shadow-md rounded-md w-full max-w-4xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Datos del cliente
        </h2>
        <div>
          <p>
            <span className="font-bold">Nombre:</span> {budget.client?.name}
          </p>
          <p>
            <span className="font-bold">Teléfono:</span>{" "}
            {budget.client?.contact}
          </p>
          <p>
            <span className="font-bold">Dirección:</span>{" "}
            {budget.client?.address}
          </p>
        </div>
      </div>

      {/* Materiales */}
      <div className="bg-white shadow-md rounded-md w-full max-w-4xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Materiales</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Precio Unitario</th>
                <th className="px-4 py-2">Observaciones</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {budget.materials.map((material) => (
                <tr key={material.id} className="border-b">
                  <td className="px-4 py-2">{material.name}</td>
                  <td className="px-4 py-2">{material.quantity}</td>
                  <td className="px-4 py-2">
                    ${material.unit_price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{material.observations}</td>
                  <td className="px-4 py-2">${material.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="px-4 py-2 font-bold">
                  Total Materiales
                </td>
                <td className="px-4 py-2 font-bold">
                  ${totalMaterials.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Botón de retorno */}
      <button
        onClick={() => router.push("/dashboard/budgets")}
        className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-700 transition"
      >
        Volver
      </button>
    </div>
  );
};

export default BudgetDetail;
