import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "example" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				// Check if user exists in your mongodb
				const user = await authOptions.adapter.getUser(
					"6471f710f772cf139bc5142e"
				);

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		//     async signIn({ account, profile }) {
		//         if (account.provider === "google") {
		//             return profile.email_verified && profile.email.endsWith("@example.com")
		//         }
		//         return true // Do different verification for other providers that don't have `email_verified`
		//     },
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.access_token
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken
			session.user.id = token.id;
			return session
		}
	}
};

export default NextAuth(authOptions);
