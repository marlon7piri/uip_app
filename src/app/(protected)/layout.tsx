import { auth } from '@/auth'
import NavBar from '@/components/NavBar'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const ProtectedLayout =  ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            {children}

        </>
    )
}

export default ProtectedLayout