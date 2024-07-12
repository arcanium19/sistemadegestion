/** @type {import('next').NextConfig} */
const ip = process.env.MY_IP || 'localhost';

const nextConfig = {
    server: {
      // Reemplaza 'tu_direccion_ip_local' con tu dirección IP local encontrada anteriormente
      host: ip,
      port: 3000, // Puerto en el que está corriendo tu aplicación
    },
  };

export default nextConfig;
