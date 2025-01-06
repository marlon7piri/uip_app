'use client'
import BreadCrum from '@/components/BreadCrum'
import { ContainerMercado } from '@/components/ContainerMercado'
import React, { useEffect, useState } from 'react'
import styles from './mercado.module.css'

const Mercado =  () => {
 
  
  

  return (
    <div className={styles.containerMercado}>
      <BreadCrum titulo='Mercado' labelBtn='Nuevo Jugador' url='/jugadores/nuevo' />
      <ContainerMercado />

    </div>
  )
}

export default Mercado