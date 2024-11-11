'use client'
import NavBar from '@/components/NavBar'
import React from 'react'
import { SessionProvider, useSession } from "next-auth/react"

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <NavBar />
      {children}
    </SessionProvider>
  )
}

export default layout