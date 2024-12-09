 import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {auth } from "@/auth"

const secret = process.env.NEXTAUTH_SECRET;

 export  default auth(async function middleware(req: NextRequest) {
  const token = await getToken({req,secret})

  const { pathname } = req.nextUrl;
  
  // Excluir rutas específicas
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/auth/login")) {
    return NextResponse.next();
  }



  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si el rol no tiene acceso a la ruta, redirigir al dashboard
  return NextResponse.next();
})

// Apply middleware to all routes
export const config = {
  matcher: ["/","/home/:path*"],
};

 

