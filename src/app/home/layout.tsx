'use client'
import NavBar from '@/components/NavBar'
import React from 'react'
import { SessionProvider, useSession } from "next-auth/react"
import { Toaster } from 'react-hot-toast'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NavBar />
      {children}
      <Toaster />
    </>
  )
}

export default layout