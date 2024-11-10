import React from "react";
import PropTypes from "prop-types";
import FiberNewIcon from "@mui/icons-material/FiberNew"; // Importamos el icono de Material UI

/**
 * @typedef {"Aceptar" | "Cancelar" | "Borrar" | "Guardar" | "More" | "Editar" | "Nuevo" | "Nueva" | "New"} ActionType
 */

/**
 * Componente de botón de opción con estilos y comportamiento según el tipo de acción.
 *
 * @param {Object} props
 * @param {ActionType} props.actionType - Tipo de acción del botón (en mayúsculas).
 * @param {() => void} props.onClick - Función que se ejecuta al hacer clic en el botón.
 * @param {boolean} [props.uppercase=true] - Si el texto se mostrará en mayúsculas.
 * @param {string} [props.additionalText] - Texto adicional para los botones "Nuevo" o "Nueva".
 * @param {boolean} [props.disabled=false] - Si el botón debe estar deshabilitado.
 * @param {boolean} [props.isLoading=false] - Si el botón está cargando, muestra el spinner en lugar del texto.
 */
const ButtonOption = ({
  actionType,
  onClick,
  uppercase = true,
  additionalText,
  disabled = false,
  isLoading = false,
}) => {
  const buttonStyles = {
    cancelar: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    aceptar:
      "border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
    borrar: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    more: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    guardar: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    editar:
      "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white",
    nuevo:
      "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
    nueva: "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white",
    new: "border-blue-500 bg-blue-500 text-white hover:bg-opacity-80 font-semibold", // Estilos para el nuevo botón
  };

  // Estilo para el botón deshabilitado
  const disabledStyle =
    "border-gray-500 text-gray-500 bg-transparent cursor-not-allowed"; // Borde gris, texto gris, fondo transparente y no clickeable

  // Estilo para el estado de loading (cuando se muestra el spinner)
  const loadingStyle = (hoverStyle) =>
    `cursor-not-allowed ${hoverStyle.replace("hover:", "")} bg-opacity-70`; // Mantener el fondo del hover, pero con opacidad

  // Elegimos el estilo dependiendo de si el botón está deshabilitado, cargando o no
  const style = disabled
    ? `${disabledStyle}`
    : isLoading
    ? loadingStyle(buttonStyles[actionType.toLowerCase()])
    : buttonStyles[actionType.toLowerCase()] || "border-gray-500 text-gray-500";

  const renderText = () => {
    if (actionType.toLowerCase() === "nuevo") {
      return additionalText ? `NUEVO ${additionalText.toUpperCase()}` : "NUEVO";
    } else if (actionType.toLowerCase() === "nueva") {
      return additionalText ? `NUEVA ${additionalText.toUpperCase()}` : "NUEVA";
    } else if (actionType.toLowerCase() === "more") {
      return "VER MÁS";
    } else if (actionType.toLowerCase() === "new") {
      return additionalText; // Texto del nuevo botón
    }
    return actionType.toUpperCase();
  };

  return (
    <button
      className={`min-w-[110px] px-2 py-2 m-1 rounded-md font-light text-sm border ${style} 
        transition-all duration-300 ease-in-out ${
          uppercase ? "uppercase" : "normal-case"
        }`}
      onClick={!disabled && !isLoading ? onClick : undefined} // No ejecutamos onClick si el botón está deshabilitado o cargando
      disabled={disabled} // Hacemos que el botón esté deshabilitado si se pasa la prop o está cargando
    >
      {/* Spinner si está cargando */}
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white mx-auto" // Usamos 'mx-auto' para centrar el spinner
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : // Icono de "NEW" si es ese el tipo de acción
      actionType.toLowerCase() === "new" ? (
        <>
          <FiberNewIcon className="text-white mx-auto text-3xl mr-1" />
          {renderText()}
        </>
      ) : (
        // Texto cuando no está cargando
        renderText()
      )}
    </button>
  );
};

ButtonOption.propTypes = {
  actionType: PropTypes.oneOf([
    "Aceptar",
    "Cancelar",
    "Borrar",
    "Guardar",
    "More",
    "Editar",
    "Nuevo",
    "Nueva",
    "New", // Nueva opción
  ]).isRequired,
  additionalText: PropTypes.string,
  uppercase: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool, // Añadimos la prop isLoading
};

export default ButtonOption;
