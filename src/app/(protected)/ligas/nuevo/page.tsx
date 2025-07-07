import ContenedorCustom from '@/components/ContenedorCustom'
import FormTorneos from '@/components/forms/FormTorneo'
import { Title } from '@/components/Title'
import React from 'react'

const NuevoTorneo = () => {
  return (
    <div className='w-full min-h-screen flex flex-col  items-center justify-center'>
      <div className=''>
        <Title content='Nuevo Grupo' size='text-4xl' />


        <FormTorneos />
      </div>


    </div>
  )
}

export default NuevoTorneo