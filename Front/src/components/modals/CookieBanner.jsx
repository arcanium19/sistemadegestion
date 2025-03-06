import { useState, useEffect } from "react";
import { Snackbar, Alert, Button, Link, Typography, Stack, Box } from "@mui/material";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [open, setOpen] = useState(false); // Estado para controlar si el banner está visible.

  useEffect(() => {
    // Verifica si ya existe la cookie de aceptación
    const hasAcceptedCookies = Cookies.get("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setOpen(true); // Muestra el banner si no se ha aceptado previamente
    }
  }, []);

  const handleAccept = () => {
    // Guarda la preferencia en una cookie
    Cookies.set("cookiesAccepted", "true", { expires: 365, sameSite: "strict" }); // Expira en 1 año
    setOpen(false); // Oculta el banner
  };

  const handleReject = () => {
    // Guarda el rechazo en una cookie
    Cookies.set("cookiesAccepted", "false", { expires: 365, sameSite: "strict" }); // Expira en 1 año
    setOpen(false); // Oculta el banner
  };

  if (!open) return null; // Evita renderizar el componente si el banner está cerrado

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ccc",
        padding: "16px",
        zIndex: 9999,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ flexWrap: "wrap" }}
      >
        <Typography sx={{ color: "#333", marginBottom: { xs: 2, md: 0 }, flex: 1 }}>
          Este sitio utiliza cookies para mejorar la experiencia del usuario. Para más información,
          consulta nuestros{" "}
          <Link href="/cookie-policy" target="_blank" rel="noopener noreferrer">
            Términos y Condiciones
          </Link>.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" size="small" onClick={handleAccept}>
            Aceptar
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "#b30000", // Color más oscuro al pasar el mouse
              },
            }}
            onClick={handleReject}
          >
            Rechazar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CookieBanner;
