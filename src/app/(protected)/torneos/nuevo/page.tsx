import ContenedorCustom from '@/components/ContenedorCustom'
import FormTorneos from '@/components/forms/FormTorneo'
import { Title } from '@/components/Title'
import React from 'react'

const NuevoTorneo = () => {
  return (
    <ContenedorCustom >
        <Title content='Nuevo Torneo' size='text-4xl' />

      <div className=' flex justify-center items-center'>
        <FormTorneos />

      </div>
    </ContenedorCustom>
  )
}

export default NuevoTorneo