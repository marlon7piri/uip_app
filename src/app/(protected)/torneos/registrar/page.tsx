import ContenedorCustom from '@/components/ContenedorCustom'
import FormRegistroTorneo from '@/components/forms/FormRegistroTorneo'
import FormTorneos from '@/components/forms/FormTorneo'
import React from 'react'

const Registro = () => {
  return (
    <ContenedorCustom >
      <div className='w-full h-screen flex justify-center items-center'>

      <FormRegistroTorneo />
      </div>
    </ContenedorCustom>
  )
}

export default Registro