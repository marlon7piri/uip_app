import ContainerNoticias from '@/components/ContainerNoticias'
import React from 'react'
import styles from './noticias.module.css'

const Noticias = () => {
  return (
    <div className={styles.container}>
      <ContainerNoticias />
    </div>
  )
}

export default Noticias