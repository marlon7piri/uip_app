import ContenedorCustom from '@/components/ContenedorCustom'
import FormJugador from '@/components/forms/FormJugador'
import FormTorneos from '@/components/forms/FormTorneo'
import React from 'react'

const NuevaLiga = () => {
  return (
    <ContenedorCustom >
      <div className='flex justify-center items-center p-4'>
        <FormTorneos />

      </div>
    </ContenedorCustom>
  )
}

export default NuevaLiga