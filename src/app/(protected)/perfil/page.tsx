'use client'
import React, { useState } from 'react'

const Perfil = () => {
    const [imagenSelected, setImagenSelected] = useState("")

    const cargarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            const imagen = URL.createObjectURL(file)
            setImagenSelected(imagen)
        }else{
            setImagenSelected("")
        }


    }
    return (
        <div className='p-24 min-h-screen'>
            <h1 className='text-slate-50 text-2xl font-semibold'>Perfil del Jugador</h1>

            <div className='max-w-4xl lg:h-[500px] sm:h-full bg-sky-900 grid  grid-cols-2   gap-4 items-center justify-center'>

                <div className='flex flex-col gap-2 p-2 '>
                    <figure>
                        {imagenSelected == ""
                            ? <img
                                src="/avatares\avatar.png"
                                alt="avatar de jugador"
                                className='w-80 h-80 rounded-md aspect-video' />
                            : <img
                                src={imagenSelected}
                                alt="avatar de jugador"
                                className='w-80 h-80 rounded-md aspect-video' />}
                    </figure>

                        <input type="file" name="" id="" onChange={cargarImagen} placeholder='Cargar Imagen' />

                </div>

                <div className='w-80 p-2'>
                    <form action="" className='flex flex-col gap-2 '>
                        <input type="text" placeholder='Nombre' className='p-2 rounded-md outline-none' />
                        <input type="text" placeholder='Apellido' className='p-2 rounded-md outline-none' />
                        <input type="text" placeholder='Edad' className='p-2 rounded-md outline-none' />
                        <input type="text" placeholder='Estatura' className='p-2 rounded-md outline-none' />
                        <input type="text" placeholder='Club' className='p-2 rounded-md outline-none' />
                        <input type="submit" placeholder='Enviar'
                            className='bg-sky-500 w-full rounded-md px-8 py-3 hover:bg-sky-700 cursor-pointer' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Perfil
