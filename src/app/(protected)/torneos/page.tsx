import BreadCrum from '@/components/BreadCrum'
import ContenedorCustom from '@/components/ContenedorCustom'
import React from 'react'

const Torneos = () => {
  return (
    <ContenedorCustom>

      <BreadCrum titulo='Torneos' labelBtn='Crear Torneo' url='/torneos/nueva' />
    </ContenedorCustom>
  )
}

export default Torneos