// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			try {
				const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
				const res = await axios.post(`${BACKEND_URL}/api/user/auth/google`,
					{ 
						email: user.email,
						name: profile.given_name,
						last_name: profile.family_name,
						password: 'googleAccess',
					});
				if (res?.status === 201) {
					console.log('data: ', res?.data)
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.error('Error signing in:', error);
				return false;
			}
		},
		// async jwt({ token, user }) {
		//   if (user) {
		//     token.id = user.id;
		//   }
		//   return token;
		// },
		// async session({ session, token }) {
		//   if (token) {
		//     session.id = token.id;
		//   }
		//   return session;
		// },
	},
	secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
});

export { handler as GET, handler as POST };
