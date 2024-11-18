

import { Container } from '@mui/material'


import React, { useEffect, useState } from 'react'

const ContenedorCustom = ({ children }: React.JSX.Element) => {


    return (
        <Container style={{ minHeight: '100vh', marginTop: 100, paddingBottom: 20 }}>
            {children}
        </Container>
    )
}

export default ContenedorCustom