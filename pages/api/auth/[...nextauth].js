import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@lib/mongodb";
import { dateNowUnix } from "@/utils/dates";
import bcrypt from "bcryptjs";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Usuario" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials, req) {
        // Conecta a tu base de datos MongoDB
        const client = await clientPromise;
        const db = client.db();

        // Busca el usuario en la colección específica
        let user = await db
          .collection("adminUsers")
          .findOne({ username: credentials.username });

        if (user) {
          // Compara la contraseña proporcionada con la contraseña hasheada en la base de datos
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isMatch) {
            // Si las contraseñas coinciden, devuelve el usuario
            return { id: user._id, username: user.username };
          } else {
            // Si las contraseñas no coinciden, devuelve null
            return null;
          }
        } else {
          console.log("username:", credentials.username);
          // Si el usuario no existe, crea un nuevo usuario
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const result = await db.collection("adminUsers").insertOne({
            username: credentials.username,
            password: hashedPassword,
            role: "Admin",
            // Agrega cualquier otro campo que necesites aquí
          });

          console.log("insert result:", result);

          user = result.ops[0];
          return { id: user._id, username: user.username };
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
