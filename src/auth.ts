import NextAuth from "next-auth"
import authconfig from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({

  callbacks: {
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

  },
  ...authconfig,
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login'
  },
  session: {
    strategy: "jwt",

  },

})