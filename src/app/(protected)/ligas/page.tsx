'use client'
import ContainerTorneos from '@/components/ContainerTorneos'
import styles from './home.module.css'
import { useTorneos } from '@/components/hooks/useTorneos';


const Torneos = () => {

  const { torneos, loading } = useTorneos()





  return (

    <div className={styles.container}>
      <ContainerTorneos torneos={torneos} loading={loading} />


    </div>

  )
}

export default Torneos