import NavBar from '@/components/NavBar'
import React from 'react'

const ProtectedLayout = async({ children }: { children: React.ReactNode}) => {

    return (
            <>
            <NavBar />
            {children}

            </>
           

    )
}

export default ProtectedLayout