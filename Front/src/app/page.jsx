"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  InputAdornment,
} from "@mui/material";
import Cookies from "js-cookie";
import CookieBanner from "@/components/modals/CookieBanner";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
	e.preventDefault();
  
	try {
	  const response = await axios.post(
		`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/user/login`,
		{
		  email,
		  password,
		}
	  );
  
	  const { token } = response.data;
  
	  Cookies.set("token", token, { expires: 7, sameSite: "strict" });
	  router.push("/dashboard"); 
	} catch (error) {
	  setSnackbarMessage(
		error.response?.data?.message || "Error al iniciar sesión"
	  );
	  setSnackbarSeverity("error");
	  setSnackbarOpen(true);
	}
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleRegister = () => {
		router.push("/new-admin/register/super-admin");
  };

  return (
    <div className="flex h-screen">
      <div
        className="hidden lg:block w-4/5 h-full bg-cover bg-center"
        style={{ backgroundImage: 'url("/landingBg.webp")' }}
      >
        {/* If you want to use a gradient instead of an image: */}
        {/* <div className="w-3/5 h-full bg-gradient-to-br from-purple-700 to-pink-500"></div> */}
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/5 lg:min-w-[500px] flex items-center justify-center bg-white px-8">
        <div className="max-w-sm w-full">
          <h2 className="text-3xl font-bold text-[#3B82F6] text-center mb-6">
            Hola, <span className="text-black">Bienvenido!</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 mb-1 font-bold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none text-electric-sky-100 font-semibold"
                required
                placeholder="ejemplo@ejemplo.com..."
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 font-bold mb-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none text-electric-sky-100 font-semibold"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full bg-[#3B82F6] text-white py-2 rounded-lg font-medium hover:bg-[#2563EB] transition"
              >
                Ingresar
              </button>
              <button
                type="button"
                className="w-full border-2 border-[#3B82F6] text-[#3B82F6] py-2 rounded-lg font-medium hover:bg-[#3B82F6] hover:text-white transition"
				onClick={handleRegister}
			  >
                Sign up
              </button>
            </div>
          </form>

          {/* Footer
          <div className="mt-8 text-center text-gray-500 text-sm">
            Follow us:
            <div className="flex justify-center mt-2 space-x-4">
              <a href="#" className="hover:text-[#3B82F6]">Facebook</a>
              <a href="#" className="hover:text-[#3B82F6]">Twitter</a>
              <a href="#" className="hover:text-[#3B82F6]">Instagram</a>
            </div>
          </div> */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={10000} // Se cierra automáticamente después de 10 segundos
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            sx={{ marginX: 2, marginBottom: 2 }}
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
      </div>
	  <CookieBanner />
    </div>
  );
}
