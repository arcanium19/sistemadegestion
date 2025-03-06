import React from "react";
import { Business, Phone, Email } from "@mui/icons-material";
import ButtonOption from "../buttons/ButtonOption";

const ProviderCard = ({ provider, onEdit, onDelete, isDeleting }) => {
  return (
    <div
      id={provider.id}
      className="
        flex flex-col lg:flex-row justify-between items-center
        bg-dark-light p-2 mt-2 mb-2 rounded-lg text-white-for-text-1
        transition duration-300
      "
      style={{
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow:
          "0px 4px 10px rgba(0, 0, 0, 0.5), inset 0px 0px 10px rgba(255, 255, 255, 0.1)",
        backgroundImage:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1))",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="flex items-center flex-grow text-left lg:min-w-[250px] lg:max-w-[250px]">
        <Business sx={{ color: "white", fontSize: 20, marginRight: 1 }} />
        <p className="font-semibold">{provider.name}</p>
      </div>

      <div className="flex items-center flex-grow text-left lg:min-w-[250px] lg:max-w-[250px]">
        <Email sx={{ color: "white", fontSize: 20, marginRight: 1 }} />
        <p>{provider.email}</p>
      </div>

      <div className="flex items-center flex-grow text-left lg:min-w-[200px] lg:max-w-[200px]">
        <Phone sx={{ color: "white", fontSize: 20, marginRight: 1 }} />
        <p>{provider.contact}</p>
      </div>

      <div className="flex flex-row justify-end items-center mt-3 lg:mt-0">
        <ButtonOption actionType="Editar" onClick={() => onEdit()} />
        <ButtonOption
          actionType="Borrar"
          isLoading={isDeleting}
          onClick={() => onDelete(provider.id)}
        />
      </div>
    </div>
  );
};

export default ProviderCard;
