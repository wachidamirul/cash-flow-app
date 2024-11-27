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
				const user = {
					id: 1,
					name: "Joko",
					email: "joko@example.test"
				};
				if (credentials.email === "joko@example.test" && credentials.password === "12345678") {
					return user;
				} else {
					return null;
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account?.provider === "credentials") {
				if (user) {
					token.name = user.name;
					token.email = user.email;
				}
			}
			return token;
		},
		async session({ session, token }) {
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
