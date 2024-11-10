import React from "react";
import { IconButton } from "@mui/material";
import { Edit, Delete, Person, Phone, Email } from "@mui/icons-material";
import ButtonOption from "../buttons/ButtonOption";

const ClientCard = ({ client, onEdit, onDelete }) => {
  return (
    <div
      id={client.id}
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
      {/* Nombre del cliente con ícono */}
      <div className="flex items-center flex-grow text-left lg:min-w-[250px] lg:max-w-[250px]">
        <Person sx={{ color: "white", fontSize: 20, marginRight: 1 }} />
        <p className="font-semibold">{client.name}</p>
      </div>

      {/* Email del cliente con ícono */}
      <div className="flex items-center flex-grow text-left lg:min-w-[250px] lg:max-w-[250px]">
        <Email sx={{ color: "white", fontSize: 20, marginRight: 1 }} />
        <p>{client.email}</p>
      </div>

      {/* Contacto del cliente con ícono */}
      <div className="flex items-center flex-grow text-left lg:min-w-[200px] lg:max-w-[200px]">
        <Phone sx={{ color: "white", fontSize: 20, marginRight: 1 }} />
        <p>{client.contact}</p>
      </div>

      {/* Botones de acciones */}
      <div className="flex flex-row justify-end items-center space-x-2 mt-3 lg:mt-0">
        {/* <IconButton onClick={() => onEdit(client.id)} sx={{ color: "white" }}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(client.id)}>
          <Delete />
        </IconButton> */}
		<ButtonOption actionType="Editar" onClick={() => onEdit(client.id)}/>
		<ButtonOption actionType="Borrar" onClick={() => onDelete(client.id)}/>
      </div>
    </div>
  );
};

export default ClientCard;
