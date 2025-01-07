'use client'
import ContainerTorneos from '@/components/ContainerTorneos'
import styles from './home.module.css'
import { useTorneos } from '@/components/hooks/useTorneos';









const Torneos = () => {

   const { torneos } = useTorneos() 
  
  return (

    <div className={styles.container}>
      <div className={styles.background_layer}/>
      <ContainerTorneos torneos={torneos} />


    </div>

  )
}

export default Torneos