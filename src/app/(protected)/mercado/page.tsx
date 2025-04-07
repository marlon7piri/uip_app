'use client'
import { ContainerMercado } from '@/components/ContainerMercado'
import React, { useEffect, useState } from 'react'
import styles from './mercado.module.css'
import { getSession } from '@/actions/get-session'

const Mercado = () => {


  const [jugadores, setJugadores] = useState([])

  const fetchJugadores = async (query: string) => {
    const session = await getSession()
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jugadores/list?query=${query}`, {
        cache: 'no-cache',

        headers: {
          token: session?.token
        }
      })
      const data = await response.json()
      setJugadores(data)
    } catch (error) {
      throw new Error('Error fetching jugadores')
    }
  }

  useEffect(() => {
    fetchJugadores('') // Fetch initial data
  }, [])

 

  


  return (
    <div className={styles.containerMercado}>
      <ContainerMercado jugadores={jugadores} fetchJugadores={fetchJugadores}/>

    </div>
  )
}

export default Mercado