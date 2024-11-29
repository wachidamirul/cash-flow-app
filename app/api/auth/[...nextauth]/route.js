import { loginUser } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
	session: {
		strategy: "jwt"
	},
	secret: process.env.NEXT_AUTH_SECRET,
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				const user = await loginUser(credentials);
				if (user) {
					const passwordConfirmed = await compare(credentials.password, user.password);
					if (passwordConfirmed) {
						return user;
					}
					return null;
				}
				return null;
			}
		})
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account?.provider === "credentials" && user) {
				token.name = user.name || "";
				token.email = user.email || "";
			}
			return token;
		},
		async session({ session, token }) {
			session.user = session.user || {}; // Inisialisasi jika null/undefined
			if (token?.email) {
				session.user.email = token.email;
			}
			return session;
		}
	},
	pages: {
		signIn: "/login"
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
