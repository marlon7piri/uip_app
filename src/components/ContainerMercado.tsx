'use client'
import React, { useEffect, useState } from 'react'
import MercadoTable from './tables/MercadoTable'
import { useJugador } from './hooks/useJugador'
import ContenedorCustom from './ContenedorCustom'
import BreadCrum from './BreadCrum'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Spinner from './Spinner'



const FiltrosMercado = () => {



  const searchparams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()


  const handlerChange = (text: string) => {
    const params = new URLSearchParams(searchparams)

    console.log(text)
    if (text) {
      params.set('query', text)

      console.log(params)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)

  }


  return (
    <div className='p-2'>
      <input type="text" placeholder='nombre'
        defaultValue={searchparams.get('query')?.toString()}
        onChange={(e) => handlerChange(e.target.value)}

        className='p-4 outline-none rounded-md bg-transparent border border-slate-900 text-slate-900 font-bold' />
    </div>
  )
}


export const ContainerMercado = () => {
  const { jugadores, loading } = useJugador()



  return (
    <ContenedorCustom >
      <BreadCrum titulo='Jugadores' labelBtn='Nuevo Jugador' url='/jugadores/nuevo' />





      {loading ? <Spinner /> : <div> <FiltrosMercado />
        <MercadoTable rows={jugadores} />
      </div>}
    </ContenedorCustom>
  )
}



