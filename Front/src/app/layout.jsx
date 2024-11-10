import "./globals.css";
import ClientProvider from "./context/Provider";
// import AuthProvider from "./context/AuthProvider";

export const metadata = {
  title: "Sistema de Gestion",
  description: "Sistema de gestión para tu empresa - v1.0.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* <AuthProvider> */}
      <ClientProvider>
        <body>{children}</body>
      </ClientProvider>
      {/* </AuthProvider> */}
    </html>
  );
}
