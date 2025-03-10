import NextAuth from "next-auth"
import authconfig from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,

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

      token.exp = Math.floor(Date.now() / 1000) + 60 // Expira en 1 minuto
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
    maxAge: 60, // 1 hora
    updateAge: 0, // Actualiza la sesión en cada request

  },
  jwt:{
    maxAge:60
  }

})