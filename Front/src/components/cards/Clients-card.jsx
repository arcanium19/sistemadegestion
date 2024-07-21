import React from "react";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ClientCard = ({ client, onEdit, onDelete }) => {
  return (
    <div
      id={client.id}
      className="
	  flex flex-col lg:flex-row
	  justify-between items-center bg-dark-light
	  p-3 mt-3 mb-3 rounded-md 
	  text-white-for-text-1 hover:text-white-for-text-2
	  lg:hover:font-bold lg:hover:cursor-pointer"
    >
      <div className="min-w-72">
        <p>{client.name}</p>
      </div>
      <div className="min-w-72">
        <p>{client.email}</p>
      </div>
      <div className="min-w-72">
        <p>{client.contact}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <IconButton onClick={() => onEdit(client.id)}>
          <Edit className="text-white-for-text-2" />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(client.id)}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

export default ClientCard;
