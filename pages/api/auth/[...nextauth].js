import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@lib/mongodb";
import { dateNowUnix } from "@/utils/dates";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    }),
    GoogleProvider({
      name: "Google",
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
  events: {
    signIn: async (ctx) => {
      const { user, isNewUser, account } = ctx;
      try {
        if (isNewUser) {

          const role = new URL(account?.params?.callbackUrl).searchParams.get('role');
          if (account?.providerAccountId) {
            let rol = role || 'Estudiante';
          }

          user.roles = ["user", rol];
          user.createdAt = dateNowUnix();
          user.updatedAt = dateNowUnix();
          user.isNewUser = true;
          user.active = true;
        }
        user.lastLogin = dateNowUnix();
        // Save the updated user to the database
        const client = await clientPromise;
        await client
          .db()
          .collection("users")
          .updateOne({ email: user.email }, { $set: user });

        console.log(`${user.email} logged in and updated in DB =>`);
      } catch (error) {
        console.log(`Error udating user ${user.email} in signinevent:`, error);
      }
    },
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
    async session({ session, token }) {
      try {
        const client = await clientPromise;
        const user = await client
          .db()
          .collection("users")
          .findOne({ email: session.user.email });

        session.user.roles = user.roles;
        session.user.id = user._id;
        session.user.profile = user.profile;
        session.user.isNewUser = user.isNewUser;

        return Promise.resolve(session);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  }
};

export default NextAuth(authOptions);

