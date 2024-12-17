import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/auth.config"
import NextAuth from 'next-auth'
import { ApiAuthPefix, protectedRoutes, DefaultLoginRedirect,AuthRoutes,publicRoutes } from "./routes";


const secret = process.env.AUTH_SECRET;

const { auth } = NextAuth(authConfig)



export default auth((req) => {

  const { nextUrl } = req

  const isLoggin = !!req.auth

  const isApiRoute = nextUrl.pathname.startsWith(ApiAuthPefix)
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiRoute) {
    return null
  }

  if(isAuthRoute){
    if(isLoggin){
      return Response.redirect(new URL(DefaultLoginRedirect,nextUrl))
    }
    return null
  }
  if (!isLoggin && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return null

})
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)","/","/(api|trpc)(.*)"],
};



