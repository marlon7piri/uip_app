
import React from 'react'

const ContenedorCustom = ({ children }: { children: React.ReactNode }) => {


    return (
        <div className='w-full  min-h-screen py-20 px-4'>
            {children}
        </div>
    )
}

export default ContenedorCustom