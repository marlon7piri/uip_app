'use client'

import { SessionProvider } from "next-auth/react";
import MyHome from "./home/page";

export default function MyApp({ children, session }: { children: React.ReactNode, session: any }) {
  return (
    <SessionProvider session={session}>

      {children}
    </SessionProvider>
  );
}
