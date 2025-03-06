import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonOption from "../buttons/ButtonOption";

const EditProviderModal = ({ isOpen, onClose, onUpdate, providerData }) => {
  // Estado del formulario
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
  });

  // Estado para validar el formulario
  const [isFormValid, setIsFormValid] = useState(false);

  // Estado para verificar si los datos fueron actualizados
  const [isUpdated, setIsUpdated] = useState(false);

  // Efecto para sincronizar los valores del formulario con los datos del proveedor
  useEffect(() => {
    if (isOpen && providerData) {
      setFormValues({
        name: providerData.name || "",
        email: providerData.email || "",
        contact: providerData.contact || "",
      });
      setIsUpdated(false); // Resetear el estado de actualización cada vez que se abre el modal
    } else if (!isOpen) {
      setFormValues({
        name: "",
        email: "",
        contact: "",
      });
    }
  }, [isOpen, providerData]);

  // Validación del formulario
  useEffect(() => {
    const regex = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación básica de correo electrónico
    };

    const isValid =
      formValues.name.trim() !== "" &&
      regex.email.test(formValues.email) &&
      formValues.contact.trim() !== "";

    setIsFormValid(isValid);
  }, [formValues]);

  // Manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Verificar si el valor del formulario cambió con respecto a los datos originales
    if (
      providerData[name] !== value.trim() && value.trim() !== "" 
    ) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (isFormValid && isUpdated) {
      onUpdate({
        ...providerData,
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        contact: formValues.contact.trim(),
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#27293d",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h1
          style={{
            marginBottom: "16px",
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Editar Proveedor
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1e8bf8",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root:hover ~ .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1e8bf8",
              },
            }}
          />
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1e8bf8",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root:hover ~ .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1e8bf8",
              },
            }}
          />
          <TextField
            fullWidth
            label="Contacto"
            name="contact"
            value={formValues.contact}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1e8bf8",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root:hover ~ .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1e8bf8",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <ButtonOption actionType="Cancelar" onClick={onClose} />
            <ButtonOption
              actionType="Guardar"
              disabled={!isFormValid || !isUpdated}
              onClick={handleSubmit}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProviderModal;
