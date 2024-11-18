'use client'
import ContenedorCustom from '@/components/ContenedorCustom'
import HeaderEquipoInfo from '@/components/HeaderEquipoInfo'
import { useJugador } from '@/components/hooks/useJugador'
import JugadoresEquiposTable from '@/components/tables/JugadoresEquiposTable'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const EquipoInfo = () => {

  const { getJugadoresByEquipos, jugadoresByEquipos, equipoDelJugador } = useJugador()
  const params = useParams()


  useEffect(() => {
    getJugadoresByEquipos(params?.idEquipo)
  }, [params?.idEquipo])

  return (
    <ContenedorCustom>

      <HeaderEquipoInfo equipo={equipoDelJugador} />
      <JugadoresEquiposTable rows={jugadoresByEquipos} />
    </ContenedorCustom>
  )
}

export default EquipoInfo