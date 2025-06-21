"use client"
import ContainerEquipos from '@/components/ContainerEquipos'
import styles from './equipos.module.css'
import React from 'react'
import { useEquipos } from '@/components/hooks/useEquipos';




const Equipos = () => {
  const { equipos } = useEquipos()



  return (
    <div className={styles.container}>
      <ContainerEquipos equipos={equipos} />
    </div>
  );
};

export default Equipos;
