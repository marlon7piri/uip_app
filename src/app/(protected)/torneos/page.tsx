import { auth } from '@/auth';
import ContainerTorneos from '@/components/ContainerTorneos'
import { fetcherDb } from '@/config/adapters/apiDbAdapter';
import * as UseCases from "@/config/core/use-cases";




const getTorneos = async (token: string) => {
  return await UseCases.getTorneosUseCases(fetcherDb, token);
};


const Torneos = async() => {
    const session = await auth()
  
    const torneos = await getTorneos(session?.token)

  return (

    <div className='min-h-screen'>

      <ContainerTorneos torneos={torneos}/>



    </div>

  )
}

export default Torneos