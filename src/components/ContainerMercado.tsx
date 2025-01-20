'use client'
import React, { useCallback, useEffect, useState } from 'react'
import MercadoTable from './tables/MercadoTable'
import { useJugador } from './hooks/useJugador'
import ContenedorCustom from './ContenedorCustom'
import BreadCrum from './BreadCrum'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Spinner from './Spinner'
import { getSession } from '@/actions/get-session'
import { useDebouncedCallback } from 'use-debounce'




const FiltrosMercado = ({ onFilterChange }: { onFilterChange: (text: string) => void }) => {



  const searchparams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [inputValue, setInputValue] = useState(searchparams.get('query') || '')



  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timer)
      timer = setTimeout(() => func(...args), delay)
    }
  }

  const handlerChange = (text: string) => {
    const params = new URLSearchParams(searchparams)
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
    <div className='p-2'>
      <input type="text" placeholder='nombre'
        defaultValue={inputValue}
        onChange={(e) => debounceChange(e.target.value)}

        className='p-4 outline-none rounded-md bg-transparent border border-slate-900 text-slate-50 font-bold' />
    </div>
  )
}


export const ContainerMercado = () => {

  const [jugadores, setJugadores] = useState([])

  const fetchJugadores = async (query: string) => {
    const session = await getSession()
    try {


      const response = await fetch(`http://localhost:3003/api/v1/jugadores/list?query=${query}`, {
        cache: 'force-cache',
        headers: {
          token: session?.token
        }
      })
      const data = await response.json()
      setJugadores(data)

    } catch (error) {
      console.error('Error fetching jugadores:', error)
    }
  }

  useEffect(() => {
    fetchJugadores('') // Fetch initial data
  }, [])

  return (
    <ContenedorCustom >
      <BreadCrum titulo='Jugadores' labelBtn='Nuevo Jugador' url='/jugadores/nuevo' />





      {/*      {loading ? <Spinner /> : <div> <FiltrosMercado onFilterChange={fetchJugadores} />
        <MercadoTable rows={jugadores} /> */}
      <div> <FiltrosMercado onFilterChange={fetchJugadores} />
        <MercadoTable rows={jugadores} />
      </div>

    </ContenedorCustom>
  )
}



