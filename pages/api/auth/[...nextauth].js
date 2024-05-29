import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@lib/mongodb";
import { dateNowUnix } from "@/utils/dates";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Usuario" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        try {
          const client = new MongoClient(process.env.MONGODB_URI);
          await client.connect();

          const collection = client.db("test").collection("Users");
          const user = await collection.findOne({
            username: credentials.username,
          });

          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return { name: user.username };
          } else {
            Swal.fire({
              icon: "error",
              title: "¡Error!",
              text: "Credenciales inválidas",
              background: "#fff",
              customClass: {
                title: "black-font",
              },
            });
            return null;
          }
        } catch (error) {
          return error;
        }
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
        console.log(`${user.email} logged in =>`, user);
        // Save the updated user to the database
        const client = await clientPromise;
        await client
          .db("test")
          .collection("users")
          .updateOne({ email: user.email }, { $set: user });

        console.log(`${user.email} logged in and updated in DB =>`);
      } catch (error) {
        console.log(
          `Error updating user ${user.email} in sign in event:`,
          error
        );
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

        console.log("Session user:", user);

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
