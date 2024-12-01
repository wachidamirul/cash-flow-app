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
				if (!user) return null;

				const passwordConfirmed = await compare(credentials.password, user.password);
				if (!passwordConfirmed) return null;

				return user;
			}
		})
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account?.provider === "credentials" && user) {
				token.id = user.id;
				token.name = user.name || "";
				token.email = user.email || "";
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				...session.user,
				id: token.id,
				name: token.name,
				email: token.email
			};
			return session;
		}
	},
	pages: {
		signIn: "/login"
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
