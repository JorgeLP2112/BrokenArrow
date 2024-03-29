import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
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
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //,
  // callbacks: {
  //     async signIn({ account, profile }) {
  //         if (account.provider === "google") {
  //             return profile.email_verified && profile.email.endsWith("@example.com")
  //         }
  //         return true // Do different verification for other providers that don't have `email_verified`
  //     },
  //     async jwt({ token, account }) {
  //         if (account) {
  //             token.accessToken = account.access_token
  //         }
  //         return token
  //     },
  //     async session({ session, token, user }) {
  //         session.accessToken = token.accessToken
  //         return session
  //     }
  // }
};

export default NextAuth(authOptions);

