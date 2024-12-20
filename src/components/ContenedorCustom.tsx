

import { Container } from '@mui/material'


import React, { useEffect, useState } from 'react'

const ContenedorCustom = ({ children }:{children:React.ReactNode} ) => {


    return (
        <Container style={{ minHeight: '100vh', marginTop: 100, paddingBottom: 20 }}>
            {children}
        </Container>
    )
}

export default ContenedorCustom