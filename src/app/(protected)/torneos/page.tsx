'use client'
import ContainerTorneos from '@/components/ContainerTorneos'
import { useSessionAuth } from '@/components/hooks/useSessionAuth';
import { useTorneos } from '@/components/hooks/useTorneos';








const Torneos = () => {

  const { session } = useSessionAuth()
   const { torneos } = useTorneos() 

  return (

    <div className='min-h-screen'>
      <ContainerTorneos torneos={torneos} />



    </div>

  )
}

export default Torneos