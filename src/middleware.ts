import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  // Allow access to the login page
  if (pathname === "/auth/login") {
    return NextResponse.next();
  }

  // Si no hay session (sesión no autenticada)
  if (!token) {
    // Redirigir a la página de inicio de sesión
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si no hay token (sesión no autenticada)
  if (!token?.token) {
    // Redirigir a la página de inicio de sesión
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si el rol no tiene acceso a la ruta, redirigir al dashboard
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/home/:path*",
};
