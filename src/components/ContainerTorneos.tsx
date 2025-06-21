import React from 'react'
import BreadCrum from './BreadCrum'
import CardTorneos from './CardTorneos'
import ContenedorCustom from './ContenedorCustom'
import { Torneos } from '@/infraestrcuture/entities/torneos';
import { useTorneos } from './hooks/useTorneos';
import Spinner from './Spinner';
import { useSession } from "next-auth/react";
import axios from "axios"

import { getSession } from "@/actions/get-session";


interface Props {
  torneos: Torneos[];
  loading: boolean
}

const ContainerTorneos = ({ torneos, loading }: Props) => {


  const { data: session } = useSession()
  const isPremium = session && session?.user?.plan !== "free"


  const handlerPlan = async () => {
    const session = await getSession();

    const res = await fetch(`http://localhost:3003/api/v1/checkout/upgradePlan`, {
      method: "POST",
      headers: {
        token: session?.token,
      }


    }
    )

    const data = await res.json()

    if (data?.url) {
      window.location.href = data.url;
    } else {
      console.error("No se recibió URL de redirección");
    }

  }
  return (
    <ContenedorCustom>
      <div className='w-full p-4'>
        {isPremium
          ? <BreadCrum titulo='Grupos' url='/ligas/nuevo' labelBtn='Crear Grupo' />
          : <button onClick={handlerPlan}>Mejorar plan</button>
        }

        <div className=' w-full h-full flex  flex-wrap justify-center items-center gap-6'>
          {loading ? <Spinner /> : torneos?.map((e) => {
            return <CardTorneos torneo={e} key={e?._id} />
          })}
        </div>
      </div>





    </ContenedorCustom>
  )
}

export default ContainerTorneos