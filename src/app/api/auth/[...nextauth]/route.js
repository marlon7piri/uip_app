import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";

const handler = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  site: process.env.NEXTAUTH_URL || "http://localhost:3000/home",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/users/login",
          {
            username: credentials.username,
            password: credentials.password,
          }
        );

        if (response.data.status === "success") {
          const user = response.data.data;

          return {
            id: user._id,
            name: user.nameUser,
            email: user.email,
            token: response.data.token, // Incluye el token si lo necesitas
            rol: user.rol,
          };
        } else {
          throw new Error(response?.data?.message || "Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minuto dura la session
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token; // Guarda el token en el JWT si lo necesitas
        token.rol = user.rol; // Guarda el rol en el JWT si lo necesitas
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.token = token.token; // Pasa el token a la sesión si lo necesitas
        session.rol = token.rol; // Pasa el rol a la sesión si lo necesitas
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
