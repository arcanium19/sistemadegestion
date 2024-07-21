import { NextResponse } from 'next/server';

const extractIPv4 = (ip) => {
	const ipv6Prefix = /^::ffff:/;
	return ipv6Prefix.test(ip) ? ip.replace(ipv6Prefix, '') : ip;
};

export function middleware(request) {
	const server_ip = process.env.NEXT_PUBLIC_HOST;
	const allowedIps = [server_ip, '::1',];
	const clientIP = extractIPv4(request.headers.get('x-forwarded-for') || '');

	if (!allowedIps.includes(clientIP)) {
		console.log(`Access Denied for client: ${clientIP}`)
		return NextResponse.redirect(new URL('/access-denied', request.url));
	}

	console.log('access allowed');
	return NextResponse.next();
}

export const config = {
	matcher: '/new-admin/register/super-admin', // Aplica middleware a esta ruta específica
};
