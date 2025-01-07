
import React  from 'react'

const ContenedorCustom = ({ children }:{children:React.ReactNode} ) => {


    return (
        <div className='w-full h-full min-h-screen p-20'>
            {children}
        </div>
    )
}

export default ContenedorCustom