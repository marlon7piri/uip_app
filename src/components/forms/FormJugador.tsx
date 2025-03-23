'use client'

import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useJugador } from "../hooks/useJugador";
import { useEquipos } from "../hooks/useEquipos";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import './forms.css'

export default function FormJugador() {


  const { jugador, setJugador, createJugador, setImage, image, loading, getJugadorById } = useJugador()
  const { equipos } = useEquipos()
  const [imagePreview, setImagePreview] = useState('')
  const idPlayer = useSearchParams().get("idPlayer")

  useEffect(() => {


    const loadPlayer = async () => {
      const jugador = await getJugadorById(idPlayer)
      setJugador({ ...jugador })
    }

    if (idPlayer) {
      loadPlayer()
    }


  }, [idPlayer])






  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setImage(file);
    setImagePreview(URL.createObjectURL(file))

  };

  return (

    <>



      <form onSubmit={createJugador} >


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
          onChange={(e) => setJugador({ ...jugador, edad: parseInt(e.target.value) })}
        />
        <label>Estatura (cm)</label>
        <input
          type="number"

          name="estatura"


          value={jugador.estatura}
          onChange={(e) => setJugador({ ...jugador, estatura: parseInt(e.target.value) })}
        />

        <label>Foto</label>
        <input type="file" required accept='image/*' onChange={handleFileChange} />

        {imagePreview && <img src={imagePreview} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={jugador.nombre} />}



        <label>Email</label>
        <input
          type="email"

          name="email"


          value={jugador.email}
          onChange={(e) => setJugador({ ...jugador, email: e.target.value })}
        />
        {/*  
        
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
        /> */}

        <label>Posicion</label>

        <select

          value={jugador.posicion}
          required
          onChange={(e) => setJugador({ ...jugador, posicion: e.target.value })}>
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

        <label>Velocidad</label>
        <input
          type="number"

          name="velocidad"


          value={jugador.velocidad}
          onChange={(e) => setJugador({ ...jugador, velocidad: parseInt(e.target.value) })}
        />
        <label>Ataque</label>
        <input
          type="number"

          name="velocidad"


          value={jugador.ataque}
          onChange={(e) => setJugador({ ...jugador, ataque: parseInt(e.target.value) })}
        />
        <label>Defensa</label>
        <input
          type="number"

          name="defensa"


          value={jugador.defensa}
          onChange={(e) => setJugador({ ...jugador, defensa: parseInt(e.target.value) })}
        />
        <label>Regate</label>
        <input
          type="number"

          name="regate"


          value={jugador.regate}
          onChange={(e) => setJugador({ ...jugador, regate: parseInt(e.target.value) })}
        />

        <label>Club</label>


        <select

          value={jugador?.club || null}
          onChange={(e) => setJugador({ ...jugador, club: e.target.value })}>
          <option></option>
          {equipos.map((e) => {

            return <option key={e?._id} value={e?._id} >

              {e?.nombre}</option>




          })}

        </select>


        <label>Estado</label>

        <select

          value={jugador.status}

          onChange={(e) => setJugador({ ...jugador, status: e.target.value })}>
          <option value={''} >


          </option>
          <option value={'activo'} >

            Activo
          </option>
          <option value={'inactivo'} >

            Inactivo


          </option>

        </select>


        <button
          disabled={loading}
          type="submit"
        >
          {loading ? <CircularProgress color='inherit' size={18} /> : (idPlayer ? 'Editar' : 'Crear')}
        </button>


      </form >
    </>

  );
}
