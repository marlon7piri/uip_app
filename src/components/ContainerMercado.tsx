'use client'
import React, { useEffect, useState } from 'react'
import MercadoTable from './tables/MercadoTable'
import ContenedorCustom from './ContenedorCustom'
import BreadCrum from './BreadCrum'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useDebouncedCallback } from 'use-debounce'
import { Jugadores } from '@/infraestrcuture/entities/jugadores'




const FiltrosMercado = ({ onFilterChange }: { onFilterChange: (text: string) => void }) => {



  const searchparams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [inputValue, setInputValue] = useState(searchparams.get('query') || '')





  const handlerChange = (text: string) => {

    const params = new URLSearchParams(searchparams)
    text = text.replace(/[^a-zA-Z\s]/g, "")

    setInputValue(text)

    if (text) {
      params.set('query', text)

    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
    onFilterChange(text)

  }

  const debounceChange = useDebouncedCallback(handlerChange, 300)

  return (
    <div className='p-2 my-8'>
      <input type="text" placeholder='Buscar por nombre'
        defaultValue={inputValue}
        onChange={(e) => debounceChange(e.target.value)}

        className='p-4 outline-none rounded-md bg-slate-50 border border-slate-900 text-slate-900 font-bold' />
    </div>
  )
}
interface Props {
  jugadores: Jugadores[],
  fetchJugadores: () => void
}

export const ContainerMercado = ({ jugadores, fetchJugadores }: Props) => {


  return (
    <ContenedorCustom >
      <div className='w-full p-4'>
        <BreadCrum titulo='Jugadores' labelBtn='Nuevo Jugador' url='/jugadores/nuevo' />
        {jugadores && <div>
          <FiltrosMercado onFilterChange={fetchJugadores} />
          <MercadoTable rows={jugadores} />
        </div>}
      </div>

    </ContenedorCustom>
  )
}



