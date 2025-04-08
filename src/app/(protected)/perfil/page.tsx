'use client'
import { useEquipos } from '@/components/hooks/useEquipos'
import { useJugador } from '@/components/hooks/useJugador'
import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './form.css'

const Perfil = () => {
    const [imagenSelected, setImagenSelected] = useState("")
    const { getJugadorByUserId, setImage, editarPlayerByUserId } = useJugador()
    const [loading, setLoading] = useState(false)
    const [isloadingImage, setIsloadingImage] = useState(false)
    const { equipos } = useEquipos()
    const [miplayer, setMiplayer] = useState({

        nombre: "Pedro",
        apellido: "Miguel",
        edad: "23",
        estatura: "187",
        email: "test@gmail.com",
        club: "Panteras",
        foto:""
    })

    const cargarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setImage(file)

            setMiplayer({ ...miplayer,foto:URL.createObjectURL(file)})
        } else{
            setImagenSelected("")
            setMiplayer({ ...miplayer,foto:"" })
        }
           
       


    }

    useEffect(() => {
        const loadJugador = async () => {
            setIsloadingImage(true)
            const jugador = await getJugadorByUserId()
            setMiplayer({...jugador,club:jugador?.club.nombre})
           
            setIsloadingImage(false)
        }
        loadJugador()
    }, [])


    const onsubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await editarPlayerByUserId(miplayer)
        setLoading(false)
    }
    return (
        <div className='w-full p-24 min-h-screen'>

            <div className='m-auto max-w-4xl h-full sm:h-full bg-sky-900 grid  grid-cols-2   gap-4 items-center justify-center'>

                <div className='flex flex-col gap-2 p-2 '>

                    <figure className='aspect-video flex justify-center items-center'>
                        {isloadingImage ? <CircularProgress /> :
                            miplayer.foto == ""
                                ? <img
                                    src="/avatares\avatar.png"
                                    alt="avatar de jugador"
                                    className='w-96 h-[400px] rounded-md aspect-video object-cover' />
                                : <img
                                    src={miplayer.foto}
                                    alt="avatar de jugador"
                                    className='w-96 h-[400px] rounded-md aspect-video object-cover' />
                        }
                    </figure>

                  
                  

                </div>

                <div className='w-80 p-2'>
                    <form className='flex flex-col gap-2 ' onSubmit={onsubmit}>
                        <input type="text" value={miplayer.nombre} onChange={(e) => setMiplayer({ ...miplayer, nombre: e.target.value })} required placeholder='Nombre'  />
                        <input type="text" value={miplayer.apellido} onChange={(e) => setMiplayer({ ...miplayer, apellido: e.target.value })} required placeholder='Apellido'  />
                        <input type="text" value={miplayer.edad} onChange={(e) => setMiplayer({ ...miplayer, edad: e.target.value })} required placeholder='Edad'  />
                        <input type="text" value={miplayer.estatura} onChange={(e) => setMiplayer({ ...miplayer, estatura: e.target.value })} required placeholder='Estatura'  />
                        <input type="email" value={miplayer.email} onChange={(e) => setMiplayer({ ...miplayer, email: e.target.value })} required placeholder='Email'  />
                        <label className='text-slate-50'>Club</label>
                        


                        <select
                           
                            value={miplayer?.club || null}
                            required
                            onChange={(e) => setMiplayer({ ...miplayer, club: e.target.value })}>
                            <option value={""}>Seleccione su club</option>
                            {equipos.map((e) => {

                                return <option key={e?._id} value={e?._id} >

                                    {e?.nombre}</option>




                            })}

                        </select>
                        <label className='text-slate-50'>Foto</label>
                       <input type="file" required accept='image/*' onChange={cargarImagen} placeholder='Cargar Imagen' />

                        <button type="submit"
                            disabled={loading}
                            className='bg-sky-500 w-full rounded-md px-8 py-3 hover:bg-sky-700 cursor-pointer' >{loading ? <CircularProgress size={24} color="inherit" /> : 'Actualizar'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Perfil
