'use client'
import React from 'react'
import styles from './spiner.module.css'
import { usePathname } from 'next/navigation'

const Spinner = () => {
  const pathname = usePathname()

  const normalStyle = pathname.includes('ligas/partidos') ? 'items-start' : 'items-center'
  return (

    <div className={`w-screen h-screen  flex justify-center  bg-transparent ${normalStyle}`}>
      <div className={styles.loader}></div>

    </div>
  )
}

export default Spinner
