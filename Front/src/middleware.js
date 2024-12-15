import { NextResponse } from "next/server";

// Función para extraer IPv4 desde IPv6 (::ffff: formato)
const extractIPv4 = (ip) => {
	const ipv6Prefix = /^::ffff:/;
	return ipv6Prefix.test(ip) ? ip.replace(ipv6Prefix, "") : ip;
};

export function middleware(request) {
	const token = request.cookies.get("token")?.value; // Obtener token de cookies
	const currentPath = request.nextUrl.pathname; // Obtener la ruta actual

	const server_ip = process.env.NEXT_PUBLIC_HOST; // IP autorizada del servidor
	const allowedIps = [server_ip, "::1"]; // Lista de IPs permitidas
	const clientIP = extractIPv4(request.headers.get("x-forwarded-for") || "");

	// Definir rutas
	const protectedRoutes = /^\/dashboard(\/.*)?$/;
	const loginRoutes = ["/", "/new-admin/register/super-admin"]; // Rutas prohibidas si ya está logueado

	// === Condición 1: Verificar IP en "/new-admin/register/super-admin" ===
	if (currentPath === "/new-admin/register/super-admin" && !allowedIps.includes(clientIP)) {
		console.log(`Access Denied for client: ${clientIP}`);
		return NextResponse.redirect(new URL("/access-denied", request.url));
	}

	// === Condición 2: Usuario no logueado intenta acceder a rutas protegidas ===
	if (protectedRoutes.test(request.nextUrl.pathname)) {
		if (!token) {
			// Redirigir a la página de inicio de sesión si no hay token
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	// === Condición 3: Usuario logueado intenta acceder a rutas de login ===
	if (token && loginRoutes.includes(currentPath)) {
		console.log("User already authenticated, redirecting to dashboard...");
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// Si ninguna condición se cumple, dejar pasar
	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/new-admin/register/super-admin", "/dashboard/:path*"], // Rutas donde se ejecuta el middleware
};



// import { NextResponse } from 'next/server';

// const extractIPv4 = (ip) => {
// 	const ipv6Prefix = /^::ffff:/;
// 	return ipv6Prefix.test(ip) ? ip.replace(ipv6Prefix, '') : ip;
// };

// export function middleware(request) {
// 	const server_ip = process.env.NEXT_PUBLIC_HOST;
// 	const allowedIps = [server_ip, '::1',];
// 	const clientIP = extractIPv4(request.headers.get('x-forwarded-for') || '');

// 	if (!allowedIps.includes(clientIP)) {
// 		console.log(`Access Denied for client: ${clientIP}`)
// 		return NextResponse.redirect(new URL('/access-denied', request.url));
// 	}

// 	console.log('access allowed');
// 	return NextResponse.next();
// }

// export const config = {
// 	matcher: '/new-admin/register/super-admin', // Aplica middleware a esta ruta específica
// };
