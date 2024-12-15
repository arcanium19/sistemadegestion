"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const CreateBudget = () => {
  const [formData, setFormData] = useState({
    name: "",
    client_id: "",
    location: "",
    work_type: "",
    objective: "",
    finish_details: "",
    observations: "",
    accessories: "",
    extra_details: "",
    estimated_price: 0,
  });

  const [materials, setMaterials] = useState([]);
  const [clients, setClients] = useState([]); // Lista de clientes para el selector
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/client/selector`
        );
        setClients(response.data.data); // Asumiendo que los datos están en esta estructura
      } catch (error) {
        setSnackbarMessage(
          "No se encontraron clientes, recargar la página por favor."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMaterial = () => {
    setMaterials([
      ...materials,
      {
        name: "",
        provider: "",
        quantity: 0,
        unit_price: 0,
        unit: "",
        observations: "",
        total: 0,
      },
    ]);
  };

  const handleMaterialChange = (index, e) => {
	const { name, value } = e.target;
	
	// Convertir los valores a números si es necesario
	const newValue = name === "quantity" || name === "unit_price"
	  ? value === "" ? "" : Number(value)  // Si el campo está vacío, lo dejamos vacío, de lo contrario, lo convertimos a número
	  : value;
  
	const updatedMaterials = [...materials];
	updatedMaterials[index][name] = newValue;
  
	// Si los campos quantity o unit_price cambian, recalcular el total
	if (name === "quantity" || name === "unit_price") {
	  const quantity = updatedMaterials[index].quantity || 0;  // Asegurarse de que quantity es un número
	  const unit_price = updatedMaterials[index].unit_price || 0;  // Asegurarse de que unit_price es un número
	  updatedMaterials[index].total = quantity * unit_price;
	}
  
	setMaterials(updatedMaterials);
  };
  

  const handleRemoveMaterial = (index) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    setMaterials(updatedMaterials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("form_data: ", formData);
      console.log("materials: ", materials);
      const response = await axios.post(
        `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT_BACKEND}/api/budget/`,
        { ...formData, materials }
      );
      setSnackbarMessage(response.data.data || "Se creó exitósamente!");
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "Error al crear el presupuesto"
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-[45px] w-full bg-gradient-to-b from-electric-sky-100 to-electric-sky-200 rounded-t-md">
        <h1 className="text-center text-white font-semibold">
          CREAR PRESUPUESTO
        </h1>
      </div>
      <Stack spacing={2} className="bg-dark-light rounded-md">
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} className="p-4">
            <TextField
              name="name"
              label="Nombre:"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <FormControl
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            >
              <InputLabel style={{ color: "white" }}>Cliente: *</InputLabel>
              <Select
                name="client_id"
                label="Cliente:"
                value={formData.client_id}
                onChange={handleInputChange}
                required
                style={{ color: "white" }}
                sx={{
                  "& .MuiInputBase-root": {
                    "&:hover fieldset": {
                      borderColor: "#1e8bf8",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1e8bf8",
                    },
                    "& fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="location"
              label="Ubicación:"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              name="work_type"
              label="Tipo de Trabajo:"
              value={formData.work_type}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              name="objective"
              label="Objetivo:"
              value={formData.objective}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              name="finish_details"
              label="Detalles Finales:"
              value={formData.finish_details}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              name="observations"
              label="Observaciones:"
              value={formData.observations}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              name="accessories"
              label="Accesorios:"
              value={formData.accessories}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              name="extra_details"
              label="Detalles Extras:"
              value={formData.extra_details}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e8bf8",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
          </Stack>
          <div className="flex flex-col justify-center items-center my-4">
            <div className="flex justify-center items-center min-h-[45px] my-4 w-full bg-gradient-to-b from-electric-sky-100 to-electric-sky-200">
              <h3 className="text-center text-white font-semibold m-2">
                MATERIALES
              </h3>
            </div>
            {materials.map((material, index) => (
              <div key={`${index}-container-material`}>
                <Stack
                  key={index}
                  className="flex flex-row flex-wrap p-4 gap-2"
                >
                  <TextField
                    key={`${index}-name`}
                    name="name"
                    label="Nombre"
                    value={material.name}
                    onChange={(e) => handleMaterialChange(index, e)}
                    required
                    placeholder="Nombre del material..."
                    InputProps={{
                      style: { color: "white" },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "& fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                  <TextField
                    key={`${index}-provider`}
                    name="provider"
                    label="Proveedor"
                    value={material.provider}
                    onChange={(e) => handleMaterialChange(index, e)}
                    required
                    placeholder="Nombre del proveedor..."
                    InputProps={{
                      style: { color: "white" },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "& fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                  <TextField
                    key={`${index}-unit`}
                    name="unit"
                    label="Tipo Unidad"
                    value={material.unit}
                    onChange={(e) => handleMaterialChange(index, e)}
                    required
                    placeholder="Kg, Cm, Lata..."
                    InputProps={{
                      style: { color: "white" },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      width: "140px",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "& fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                  <TextField
                    key={`${index}-quantity`}
                    name="quantity"
                    label="Cantidad"
                    type="number"
                    value={material.quantity}
                    onChange={(e) => handleMaterialChange(index, e)}
                    required
                    InputProps={{
                      style: { color: "white" },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      width: "120px",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "& fieldset": {
                          borderColor: "white",
                        },
                      },
                      // Eliminar los botones de incremento/decremento del input numérico
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      "& input[type='number']": {
                        MozAppearance: "textfield", // Para Firefox
                      },
                    }}
                  />
                  <TextField
                    key={`${index}-unit_price`}
                    name="unit_price"
                    label="$/Unidad"
                    type="number"
                    value={material.unit_price}
                    onChange={(e) => handleMaterialChange(index, e)}
                    required
                    placeholder="c/u"
                    InputProps={{
                      style: { color: "white" },
                      inputMode: "numeric",
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "white" }}
                          style={{ color: "white" }}
                        >
                          <p key={`${index}-p`} className="text-white">
                            $
                          </p>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      width: "120px",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "& fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      "& input[type='number']": {
                        MozAppearance: "textfield", // Para Firefox
                      },
                    }}
                  />
                  <TextField
                    key={`${index}-observations`}
                    name="observations"
                    label="Observaciones"
                    value={material.observations}
                    onChange={(e) => handleMaterialChange(index, e)}
                    InputProps={{
                      style: { color: "white" },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1e8bf8",
                        },
                        "& fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />

                  <TextField
                    key={`${index}-total`}
                    name="total"
                    label="Total"
                    value={material.total}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "white" }}
                          style={{ color: "white" }}
                        >
                          <p key={`${index}-p`} className="text-white">
                            $
                          </p>
                        </InputAdornment>
                      ),
                      style: { color: "white" },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      width: "140px", // O puedes definir un tamaño específico como "200px"
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                        "& fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                      },
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      "& input[type='number']": {
                        MozAppearance: "textfield", // Para Firefox
                      },
                    }}
                  />
                  <button
                    key={`${index}-button-Close`}
                    className="w-[56px] h-[56px] border border-red-500 text-red-500 bg-transparent rounded-md flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white"
                    onClick={() => handleRemoveMaterial(index)}
                  >
                    <ClearIcon className="text-2xl" />
                  </button>
                </Stack>
                <Divider
                  key={`${index}-divider`}
                  sx={{ borderColor: "#1e8bf8", marginY: 1, borderWidth: 1 }}
                />
              </div>
            ))}
            {/* <button
              id="button-add-material"
              className="w-auto px-4 py-2 border border-electric-sky-100 text-electric-sky-100 bg-transparent rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:bg-electric-sky-100 hover:text-white"
              onClick={handleAddMaterial}
            >
              AGREGAR MATERIAL
            </button> */}

            <Button
              onClick={handleAddMaterial}
              className="w-auto px-4 py-2 border border-electric-sky-100 text-electric-sky-100 bg-transparent rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:bg-electric-sky-100 hover:text-white"
            >
              Agregar Material
            </Button>
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Crear Presupuesto
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={10000} // Se cierra automáticamente después de 10 segundos
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ marginX: 2, marginBottom: 2 }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default CreateBudget;
