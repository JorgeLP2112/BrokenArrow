import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@lib/mongodb";
import { dateNowUnix } from "@/utils/dates";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
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
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    signIn: async (ctx) => {
      const { user, isNewUser } = ctx;
      try {
        if (isNewUser) {
          user.roles = ["user"];
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
      token.userRole = "admin";
      return token;
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
  },
};

export default NextAuth(authOptions);
