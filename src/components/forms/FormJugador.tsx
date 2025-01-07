'use client'

import { Typography } from "@mui/material";
import React from "react";

import { useJugador } from "../hooks/useJugador";
import { useEquipos } from "../hooks/useEquipos";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { JugadorStore } from "@/utils/zustand/jugador";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import './forms.css'

export default function FormJugador() {
  const saveImage = JugadorStore(state => state.saveImage)
  const currentImage = JugadorStore(state => state.currentImage)

  const { jugador, setJugador, createJugador } = useJugador()
  const { equipos } = useEquipos()
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    createJugador()
    toast.success('Jugador creado')
    router.push('/mercado')
  };





  return (
    <form onSubmit={handleSubmit} >
      <label>Nombre</label>
      <input
        name="namePlan"
        value={jugador.nombre}
        onChange={(e) => setJugador({ ...jugador, nombre: e.target.value })}
      />
      <label>Apellido</label>
      <input

        name="namePlan"


        value={jugador.apellido}
        onChange={(e) => setJugador({ ...jugador, apellido: e.target.value })}
      />
      <label>Edad</label>
      <input
        type="number"

        name="namePlan"


        value={jugador.edad}
        onChange={(e) => setJugador({ ...jugador, edad: e.target.value })}
      />
      <label>Estatura</label>
      <input
        type="number"

        name="estatura"


        value={jugador.estatura}
        onChange={(e) => setJugador({ ...jugador, estatura: e.target.value })}
      />
      <label>Foto</label>
      <CustomInputFileFoto
        onChange={saveImage}
      />
      <img src={currentImage} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={jugador.nombre} />

      <label>Rol</label>

      <select

        value={jugador.rol}

        onChange={(e) => setJugador({ ...jugador, rol: e.target.value })}>

        <option value={'jugador'} >

          Jugador
        </option>
        <option value={'dt'} >

          Director
        </option>

      </select>

      <label>Email</label>
      <input
        type="email"

        name="email"


        value={jugador.email}
        onChange={(e) => setJugador({ ...jugador, email: e.target.value })}
      />
      <label>Estudiante</label>

      <select

        value={jugador.estudiante}

        onChange={(e) => setJugador({ ...jugador, estudiante: e.target.value })}>

        <option value={'si'} >

          Si
        </option>
        <option value={'no'} >

         No
        </option>

      </select>

      <label>Valor del mercado</label>
      <input
        type="number"

        name="namePlan"


        value={jugador.valor_mercado}
        onChange={(e) => setJugador({ ...jugador, valor_mercado: e.target.value })}
      />

      <label>Posicion</label>

      <select

        value={jugador.posicion}

        onChange={(e) => setJugador({ ...jugador, posicion: e.target.value })}>

        <option value={'delantero'} >

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

      <label>Velocidad</label>
      <input
        type="number"

        name="velocidad"


        value={jugador.velocidad}
        onChange={(e) => setJugador({ ...jugador, velocidad: e.target.value })}
      />
      <label>Ataque</label>
      <input
        type="number"

        name="velocidad"


        value={jugador.ataque}
        onChange={(e) => setJugador({ ...jugador, ataque: e.target.value })}
      />
      <label>Defensa</label>
      <input
        type="number"

        name="defensa"


        value={jugador.defensa}
        onChange={(e) => setJugador({ ...jugador, defensa: e.target.value })}
      />
      <label>Regate</label>
      <input
        type="number"

        name="regate"


        value={jugador.regate}
        onChange={(e) => setJugador({ ...jugador, regate: e.target.value })}
      />

      <label>Club</label>

      <select

        value={jugador.club}

        onChange={(e) => setJugador({ ...jugador, club: e.target.value })}>
        {equipos.map((e) => {
          return <option key={e?._id} value={e?._id} >

            {e?.nombre}</option>



        })}

      </select>


      <label>Estado</label>

      <select

        value={jugador.status}

        onChange={(e) => setJugador({ ...jugador, status: e.target.value })}>

        <option value={'activo'} >

          Activo
        </option>
        <option value={'inactivo'} >

          Inactivo


        </option>

      </select>


      <button

        type="submit"
      >
        Crear
      </button>

    </form >
  );
}
