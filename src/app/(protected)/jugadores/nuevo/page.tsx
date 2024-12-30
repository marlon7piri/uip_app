import ContenedorCustom from '@/components/ContenedorCustom'
import FormJugador from '@/components/forms/FormJugador'
import React from 'react'

const NuevoJugador = () => {
  return (
    <ContenedorCustom >
      <div className='flex justify-center items-center p-4'>
      <FormJugador />

      </div>
    </ContenedorCustom>
  )
}

export default NuevoJugador