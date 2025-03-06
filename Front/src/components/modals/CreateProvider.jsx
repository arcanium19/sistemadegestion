import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonOption from "../buttons/ButtonOption";

const CreateProviderModal = ({ isOpen, onClose, onCreate }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const regex = {
      name: /^\s*$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      contact: /^\s*$/,
    };

    const isValid = Object.entries(formValues).every(([key, value]) => {
      if (key === "email") return regex.email.test(value);
      return !regex.name.test(value);
    });

    setIsFormValid(isValid);
  }, [formValues]);

  useEffect(() => {
    if (!isOpen) {
      setFormValues({
        name: "",
        email: "",
        contact: "",
      });
    }
  }, [isOpen]);

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
      email: formValues.email.trim(),
      contact: formValues.contact.trim(),
    });
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
          Crear Proveedor
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
              disabled={!isFormValid}
              onClick={handleSubmit}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateProviderModal;
