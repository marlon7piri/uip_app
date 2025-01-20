import ContenedorCustom from '@/components/ContenedorCustom'
import FormGruposTorneo from '@/components/forms/FormGruposTorneo'
import React from 'react'

const NuevaTorneo = () => {
  return (
    <ContenedorCustom >
      <div className='flex justify-center items-center p-4'>
        <FormGruposTorneo />

      </div>
    </ContenedorCustom>
  )
}

export default NuevaTorneo