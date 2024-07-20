import "./globals.css";
import ClientProvider from "./context/Provider";

export const metadata = {
  title: "Sistema de Gestion",
  description: "Sistema de gestión para tu empresa - v1.0.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <ClientProvider>
        <body>{children}</body>
      </ClientProvider>
    </html>
  );
}
