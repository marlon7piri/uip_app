'use client'
import { useEquipos } from '@/components/hooks/useEquipos'
import { useJugador } from '@/components/hooks/useJugador'
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './form.css'
import styles from './styles.module.css'
import { Jugadores, JugadorWithVerification } from '@/infraestrcuture/entities/jugadores'
import CollectionsIcon from '@mui/icons-material/Collections';
import QuestionAnswer from '@mui/icons-material/QuestionMark';
import Link from 'next/link'
import { ShieldUser, CalendarClock } from 'lucide-react'

const Perfil = () => {
    const [imagenSelected, setImagenSelected] = useState("")
    const { getJugadorByUserId, setImage, editarPlayerByUserId } = useJugador()
    const [loading, setLoading] = useState(false)
    const [isloadingImage, setIsloadingImage] = useState(false)
    const { equipos } = useEquipos()
    const [miplayer, setMiplayer] = useState<Partial<JugadorWithVerification>>({

        nombre: "Cargando...",
        apellido: "Cargando...",
        edad: 0,
        estatura: 0,
        email: "Cargando...",
        club: {
            logo: "",
            nombre: "",

        },
        estadisticasGlobales: {
            valor_mercado: 0,
            posicion: "",
            velocidad: 0,
            ataque: 0,
            defensa: 0,
            regate: 0,
            goles: 0,
            asistencias: 0,
            tarjetas_amarillas: 0,
            tarjetas_rojas: 0,
        },
        posicion: "",
        foto: "",
        used_same_picture: false,

    })

    const cargarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setImage(file)

            setMiplayer({ ...miplayer, foto: URL.createObjectURL(file) })
        } else {
            setImagenSelected("")
            setMiplayer({ ...miplayer, foto: "" })
        }




    }

    useEffect(() => {
        const loadJugador = async () => {
            setIsloadingImage(true)
            const jugador: Jugadores = await getJugadorByUserId()

            if (jugador) {

                setMiplayer({ ...jugador, club: jugador?.club?._id })

                const file = await urlToFile(jugador.foto, 'jugador_foto.jpg')

                setImage(file)
            }


            setIsloadingImage(false)
        }
        loadJugador()
    }, [])


    const urlToFile = async (url: string, filename: string): Promise<File> => {
        const res = await fetch(url);
        const blob = await res.blob();
        const mime = blob.type || 'image/jpeg';
        return new File([blob], filename, { type: mime });
    };

    const onsubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await editarPlayerByUserId(miplayer)
        setLoading(false)
    }

    return (
        <div className={styles.container}>

            <div className='sm:w-[100%] lg:w-[calc(100%-200px)] m-auto py-10 h-auto bg-sky-900 rounded-md  grid  sm:grid-cols-1   lg:grid-cols-2  gap-4 items-center justify-center'>

                <div className='flex flex-col items-center gap-2 p-2 '>
                    <div className='flex flex-col gap-2  sm:flex-row'>
                        <Link href={`/perfil/nuevaCancha?userId=${miplayer._id}`} className='flex justify-center items-center gap-2 w-max bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-md'>
                            <ShieldUser size={16} color='white' /> Administrar Cancha
                        </Link>
                        <Link href={`/perfil/misCancha?userId=${miplayer?.userId}`} className='flex justify-center items-center gap-2 w-max bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-md'>
                            <CalendarClock size={16} color='white' /> Administrar Horarios
                        </Link>
                    </div>

                    <figure className=' flex h-[350px] justify-center items-center  '>
                        {isloadingImage ? <CircularProgress /> :
                            <img
                                src={miplayer?.foto || undefined}
                                alt={`imagen del jugador ${miplayer.nombre}`}
                                className='w-56 h-[350px] rounded-md  object-cover  mask-gradient ' />
                        }

                    </figure>

                    <div className='w-full flex justify-center items-center'>
                        <label htmlFor="upload-photo">
                            <input
                                style={{ display: 'none' }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                accept="image/*"
                                onChange={cargarImagen}
                                disabled={isloadingImage || miplayer.used_same_picture}
                            />
                            <IconButton disabled={isloadingImage || miplayer.used_same_picture} color="inherit" component="span" className='hover:bg-sky-800 hover:rotate-45 transition-transform ease-in-out duration-300'>
                                <CollectionsIcon />
                            </IconButton>
                        </label>
                    </div>

                    <Tooltip title="Si deseas quitarle el fondo a tu imagen" >
                        <div className='pl-10'>
                            <QuestionAnswer className="text-slate-50 text-md bg-slate-900 rounded-full p-1" />
                            <label htmlFor="" className='text-sm pl-2'>Visita <a href="https://www.pixelcut.ai/" target="_blank" className='text-sky-500 underline'>aqui</a> si deseas quitarle el fondo a tu imagen</label>
                        </div>
                    </Tooltip>



                </div>

                <div className='w-full p-2 flex justify-center items-center'>
                    <form className='flex flex-col gap-2 ' onSubmit={onsubmit}>
                        <input type="text" disabled value={miplayer.nombre} onChange={(e) => setMiplayer({ ...miplayer, nombre: e.target.value })} required placeholder='Nombre' />
                        <input type="text" disabled value={miplayer.apellido} onChange={(e) => setMiplayer({ ...miplayer, apellido: e.target.value })} required placeholder='Apellido' />
                        <input type="text" value={miplayer.edad} onChange={(e) => setMiplayer({ ...miplayer, edad: e.target.value })} required placeholder='Edad' />
                        <input type="text" value={miplayer.estatura} onChange={(e) => setMiplayer({ ...miplayer, estatura: e.target.value })} required placeholder='Estatura' />
                        <input type="email" disabled value={miplayer.email} onChange={(e) => setMiplayer({ ...miplayer, email: e.target.value })} required placeholder='Email' />
                        <label>Posicion</label>

                        <select

                            value={miplayer.posicion}
                            required
                            onChange={(e) => setMiplayer({
                                ...miplayer,
                                estadisticasGlobales: {
                                    ...miplayer.estadisticasGlobales,
                                    posicion: e.target.value
                                }
                            })}>
                            <option value={''} >

                                Seleccione
                            </option>
                            <option value={'Delantero'} >

                                Delantero
                            </option>
                            <option value={'Defensa'} >

                                Defensa
                            </option>
                            <option value={'Centro Campista'} >

                                Centro Campista
                            </option>
                            <option value={'Portero'} >

                                Portero
                            </option>

                        </select>
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
                        <FormGroup sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>

                            <FormControlLabel control={<Checkbox color='info' sx={{
                                color: '#f8fafc  '
                            }}
                                value={miplayer.used_same_picture}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setMiplayer({ ...miplayer, used_same_picture: true })
                                    } else {
                                        setMiplayer({ ...miplayer, used_same_picture: false })

                                    }
                                }} />} label="Quieres usar la foto actual?" />


                        </FormGroup>



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
