'use client'
import ContainerTorneos from '@/components/ContainerTorneos'
import styles from './home.module.css'
import { useTorneos } from '@/components/hooks/useTorneos';
import Spinner from '@/components/Spinner';


const Torneos = () => {

  const { torneos} = useTorneos()




  return (

    <div className={styles.container}>
      <ContainerTorneos torneos={torneos} />


    </div>

  )
}

export default Torneos