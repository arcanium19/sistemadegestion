import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonOption from "../buttons/ButtonOption";

const CreateClientModal = ({ isOpen, onClose, onCreate }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // Verifica si los campos están válidos

  useEffect(() => {
    // Verifica si los campos son válidos usando regex
    const regex = /^\s*$/; // Detecta cadenas vacías o con solo espacios
    const areFieldsValid = Object.values(formValues).every(
      (value) => !regex.test(value) // Campo válido si no coincide con el regex
    );
    setIsFormValid(areFieldsValid);
  }, [formValues]);

  useEffect(()=>{
	if(!isOpen){
		setFormValues({
			name: "",
			address: "",
			contact: "",
		  })
	}
  }, [isOpen])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onCreate({
      name: formValues.name.trim(),
      address: formValues.address.trim(),
      contact: formValues.contact.trim(),
    }); // Asegúrate de enviar valores recortados
    setFormValues({ name: "", address: "", contact: "" }); // Limpia el formulario tras crear
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
          Crear Cliente
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
            label="Dirección"
            name="address"
            value={formValues.address}
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
              disabled={!isFormValid} // Desactiva si los campos son inválidos
              onClick={handleSubmit}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateClientModal;
