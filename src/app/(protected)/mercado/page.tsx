'use client'
import BreadCrum from '@/components/BreadCrum'
import { ContainerMercado } from '@/components/ContainerMercado'
import React, { useEffect, useState } from 'react'
import styles from './mercado.module.css'

const Mercado = () => {




  return (
    <div className={styles.containerMercado}>
      <ContainerMercado />

    </div>
  )
}

export default Mercado