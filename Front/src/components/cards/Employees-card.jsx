import React from "react";
import { IconButton, Button } from "@mui/material";
import { Edit, Delete, AccessTimeFilled } from "@mui/icons-material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ButtonOption from "../buttons/ButtonOption";

const EmployeeCard = ({ employee, onEdit, onDelete, onViewDetails }) => {
  return (
    <div
      id={employee.id}
      className="
        flex flex-col lg:flex-row justify-between items-center
        bg-dark-light p-2 mt-2 mb-2 rounded-lg text-white-for-text-1
        transition duration-300
      "
      style={{
        border: "1px solid rgba(255, 255, 255, 0.2)", // borde transparente
        boxShadow:
          "0px 4px 10px rgba(0, 0, 0, 0.5), inset 0px 0px 10px rgba(255, 255, 255, 0.1)", // sombra exterior e interior
        backgroundImage:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1))", // gradiente sutil para reflejo de luz
        backdropFilter: "blur(5px)", // desenfoque para efecto vidrio
      }}
    >
      {/* Icono de perfil al inicio de la card */}
      <div className="flex items-center">
        <AccountCircleRoundedIcon sx={{ color: "white", fontSize: 40, marginRight: 1 }} />
      </div>

      {/* Información del empleado */}
      <div className="flex-grow text-left lg:min-w-[250px] lg:max-w-[250px]">
        <p className="font-semibold">{employee.name}</p>
      </div>
      <div className="flex items-center flex-grow text-left lg:min-w-[200px] lg:max-w-[200px]">
        <AccessTimeFilled sx={{ color: "white", fontSize: 30, marginRight: 1 }} />
        <p>{employee.hourly_rate} horas/día</p>
      </div>

      {/* Botones de acciones */}
      <div className="flex lg:flex-row flex-col justify-end items-center mt-3 lg:mt-0">
		<ButtonOption actionType="More" onClick={() => onViewDetails(employee.id)} />
		<ButtonOption actionType="Editar" onClick={() => onEdit(employee.id)} />
		<ButtonOption actionType="Borrar" onClick={() => onDelete(employee.id)} />
      </div>
    </div>
  );
};

export default EmployeeCard;
