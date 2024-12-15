import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 }); // Guarda el consentimiento por 1 año
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <p>
          Este sitio utiliza cookies para mejorar la experiencia del usuario.
          <a href="/cookie-policy" className="underline ml-1">
            Más información
          </a>
        </p>
        <button
          onClick={acceptCookies}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Aceptar
        </button>
      </div>
    )
  );
};

export default CookieBanner;
