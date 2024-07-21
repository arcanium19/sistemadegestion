"use client";
import Loading from "@/components/loading/Loading";
import { registerUser, resetErrorState, resetUserState } from "@/redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch

const RegistrationForm = () => {
  const dispatch = useDispatch(); // Inicializa dispatch
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      alert(error);
	  dispatch(resetErrorState())
    }
    if (user) {
      alert(user?.data);
	  dispatch(resetUserState())
    }
  }, [error, user, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark to-dark-gray p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Registro
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-semibold mb-2 text-dark"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="last_name"
                className="text-sm font-semibold mb-2 text-dark"
              >
                Apellido
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-semibold mb-2 text-dark"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-semibold mb-2 text-dark"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Registrarse
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
