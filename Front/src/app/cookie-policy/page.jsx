"use client";

import { useRouter } from "next/navigation";

export default function CookiesPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-800 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Política de Cookies
        </h1>
        <p className="text-gray-700 mb-6">
          Esta página explica cómo usamos cookies en nuestro sitio web. Al usar
          este sitio, aceptas el uso de cookies como se describe en esta
          política.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            ¿Qué son las cookies?
          </h2>
          <p className="text-gray-700">
            Las cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo cuando visitas un sitio web. Nos ayudan a mejorar tu
            experiencia, recordar tus preferencias y analizar cómo usas nuestro
            sitio.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Tipos de cookies que usamos
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li className="mb-2">
              <strong>Cookies necesarias:</strong> Estas cookies son
              esenciales para que el sitio funcione correctamente, como el
              acceso a áreas seguras.
            </li>
            <li className="mb-2">
              <strong>Cookies de funcionalidad:</strong> Permiten recordar tus
              preferencias para mejorar la experiencia de usuario.
            </li>
            <li className="mb-2">
              <strong>Cookies de análisis:</strong> Nos ayudan a entender cómo
              los usuarios interactúan con nuestro sitio para mejorar su
              rendimiento.
            </li>
            <li>
              <strong>Cookies publicitarias:</strong> Utilizadas para mostrarte
              anuncios relevantes en función de tus intereses.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            ¿Cómo puedes controlar las cookies?
          </h2>
          <p className="text-gray-700">
            Puedes configurar tu navegador para rechazar algunas o todas las
            cookies, o para notificarte cuando un sitio web intente colocar
            cookies en tu dispositivo. Sin embargo, deshabilitar cookies puede
            afectar tu experiencia en nuestro sitio.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Cambios en esta política
          </h2>
          <p className="text-gray-700">
            Podemos actualizar esta política de cookies en cualquier momento.
            Te recomendamos revisarla periódicamente para mantenerte informado.
          </p>
        </section>

        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
            onClick={() => router.push("/")}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
