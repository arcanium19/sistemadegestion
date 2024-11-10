"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReportIcon from "@mui/icons-material/Report";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      router.push("/dashboard");
    }
  }, [router, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Limpiar cualquier mensaje de error previo

    try {
      const response = await axios.post(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/user/login`,
        {
          email,
          password,
        }
      );

      const { token } = response.data; // Suponiendo que el token se encuentra en `data.token`
      localStorage.setItem("token", token); // Guardamos el token en el almacenamiento local
      setIsAuthenticated(true);
      router.push("/dashboard"); // Redirige a la ruta deseada
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error en la autenticación"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark to-dark-gray">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg shadow-black rounded-xl">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className="flex flex-row">
              <ReportIcon className="text-red-600 text-sm align-middle text-center" />
              <p className="text-red-500 text-sm font-bold align-middle text-center">
                {errorMessage}
              </p>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
