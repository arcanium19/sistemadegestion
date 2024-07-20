const { execSync } = require('child_process');
const fs = require('fs');

// Obtener la dirección IP actual
let ip;
try {
  if (process.platform === 'win32') {
    // Obtener las direcciones IP en Windows
    const ips = execSync('powershell.exe -Command "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -match \'Ethernet\' -or $_.InterfaceAlias -match \'Wi-Fi\' } | Select-Object -ExpandProperty IPAddress"')
      .toString()
      .split('\n')
      .map(ip => ip.trim())
      .filter(ip => ip && !ip.startsWith('127.'));
    // Filtrar para obtener la IP en la subred 192.168.1.x
    ip = ips.find(ip => ip.startsWith('192.168.1.')) || ips[0];
  } else {
    // Obtener las direcciones IP en Unix
    const ips = execSync('hostname -I')
      .toString()
      .split(' ')
      .filter(ip => ip && !ip.startsWith('127.') && !ip.includes(':'));
    // Filtrar para obtener la IP en la subred 192.168.1.x
    ip = ips.find(ip => ip.startsWith('192.168.1.')) || ips[0];
  }
} catch (error) {
  console.error('Error obteniendo la IP:', error);
  ip = 'localhost';
}

// Escribir la dirección IP y puerto en .env.local
const envContent = `
	NEXT_PUBLIC_HOST=${ip}\n
	NEXT_PUBLIC_PORT=3000\n
	NEXT_PUBLIC_GOOGLE_CLIENT_ID = 486944814164-6mhd63phrmmr8jr2b6ml0fdnidb85n9l.apps.googleusercontent.com\n
	NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = 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\n`;
fs.writeFileSync('.env.local', envContent);

console.log(`Dirección IP detectada: ${ip}`);
console.log('Variables de entorno NEXT_PUBLIC_HOST y NEXT_PUBLIC_PORT guardadas en .env.local');