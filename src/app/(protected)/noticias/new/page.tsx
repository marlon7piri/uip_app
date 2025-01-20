import React from 'react'
import FormNoticia from '@/components/forms/FormNoticia'
import ContenedorCustom from '@/components/ContenedorCustom'

const NoticiasNueva = () => {
  return (
    <ContenedorCustom>

      <div className='flex justify-center items-center p-4'>

        <FormNoticia />
      </div>
    </ContenedorCustom>
  )
}

export default NoticiasNueva