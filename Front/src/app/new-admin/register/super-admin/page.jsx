"use client";
import axios from "axios";
import Loading from "@/components/loading/Loading";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio";
    if (!formData.last_name) newErrors.last_name = "El apellido es obligatorio";
    if (!formData.email) newErrors.email = "El correo es obligatorio";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/user`,
        formData
      );

      alert(response.data.message || "Registro exitoso");
      router.push("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error en el registro"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Formulario */}
      <div className="w-full lg:w-1/4 lg:min-w-[500px] flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-6 space-y-6">
          <h1 className="text-4xl font-bold text-blue-600 text-center">
            ¡Regístrate!
          </h1>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo Nombre */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`border rounded-md text-electric-sky-100 font-semibold p-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Campo Apellido */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Apellido</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`border rounded-md p-2 text-electric-sky-100 font-semibold ${
                    errors.last_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tu apellido"
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm">{errors.last_name}</span>
                )}
              </div>

              {/* Campo Email */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border rounded-md p-2 text-electric-sky-100 font-semibold ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Campo Contraseña */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border rounded-md p-2 text-electric-sky-100 font-semibold ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="********"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Mensaje de error general */}
              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}

              {/* Botón */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
              >
                Registrarse
              </button>
            </form>
          )}
        </div>
      </div>
	  {/* Imagen de fondo */}
      <div
        className="w-3/4 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: "url('/registerBg.webp')", // Reemplaza con tu imagen
        }}
      ></div>
    </div>
  );
};

export default RegistrationForm;


// "use client";
// import axios from "axios";
// import Loading from "@/components/loading/Loading";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const RegistrationForm = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [register, setRegister] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(null); // Resetea el mensaje de error

//     try {
//       const response = await axios.post(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/user`, formData);

//       setRegister(response.data); // Almacena la respuesta en `register`
//       alert(response.data.message || "Registro exitoso"); // Alerta el mensaje del backend
//       router.push("/"); // Redirige al usuario
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || "Error en el registro"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark to-dark-gray p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
//           Registro
//         </h1>
//         {loading ? (
//           <Loading />
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex flex-col">
//               <label
//                 htmlFor="name"
//                 className="text-sm font-semibold mb-2 text-dark"
//               >
//                 Nombre
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded-md p-2 text-gray-500"
//                 required
//               />
//             </div>
//             <div className="flex flex-col">
//               <label
//                 htmlFor="last_name"
//                 className="text-sm font-semibold mb-2 text-dark"
//               >
//                 Apellido
//               </label>
//               <input
//                 id="last_name"
//                 name="last_name"
//                 type="text"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded-md p-2 text-gray-500"
//                 required
//               />
//             </div>
//             <div className="flex flex-col">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-semibold mb-2 text-dark"
//               >
//                 Correo Electrónico
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded-md p-2 text-gray-500"
//                 required
//               />
//             </div>
//             <div className="flex flex-col">
//               <label
//                 htmlFor="password"
//                 className="text-sm font-semibold mb-2 text-dark"
//               >
//                 Contraseña
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded-md p-2 text-gray-500"
//                 required
//               />
//             </div>
//             {errorMessage && (
//               <p className="text-red-500 text-sm text-center">
//                 {errorMessage}
//               </p>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//             >
//               Registrarse
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
