'use client'
import { getSession } from '@/actions/get-session'
import CardJugadores from '@/components/CardJugadores'
import ContainerInfoPlayerMercado from '@/components/ContainerInfoPlayerMercado'
import ContenedorCustom from '@/components/ContenedorCustom'
import { Jugador } from '@/infraestrcuture/entities/ofertas'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'





const PageJugador =  () => {
    const [jugador,setJugador]=useState()
    const params = useParams()

    useEffect(()=>{


        const getJugadorById = async () => {
            const session = await getSession()
            const res = await fetch(`http://localhost:3003/api/v1/jugadores/getById/${params.idPlayer}`,{
                headers:{
                    token:session?.token

                }
            })
            const data = await res.json()
            setJugador(data) 
        }
        if(params.idPlayer){
            getJugadorById()

        }


    },[params.idPlayer])


    
    return (
        <ContenedorCustom>

            <ContainerInfoPlayerMercado jugador={jugador}/>
        </ContenedorCustom>
    )
}

export default PageJugador
