// src/app/auth_wrapper.tsx
"use client"; 
// SessionProvider must be used with Client Side Rendering
// Therfore we create a separate client side component to run AuthWrapper
import { SessionProvider } from "next-auth/react";

type Props = {
  children:React.ReactNode;
  session:any
}

export default function AuthWrapper({ children ,session}: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}