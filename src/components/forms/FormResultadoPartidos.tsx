'use client'

import { Button, FormLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useEquipos } from "../hooks/useEquipos";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { JugadorStore } from "@/utils/zustand/jugador";
import { useTorneos } from "../hooks/useTorneos";
import { usePartidos } from "../hooks/usePartidos";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import { useJugador } from "../hooks/useJugador";

interface Props {
  jugadores: Jugadores;

}

export default function FormResultadoPartidos({ jugadores }: Props) {


  const { resultadoPartido, setResultadoPartido, getEquiposPorPartido, equiposByPartido, evaluarPartido } = usePartidos()
  const {getJugadoresByEquipos,jugadoresByEquipos} =useJugador()
  const search = useSearchParams()

  const local = search.get('idLocal')
  const visitante = search.get('idVisitante')


  const handleSubmit = async (e) => {
    e.preventDefault();
    evaluarPartido()

  };


  const handlerGoleadores = (e) => {

    const player = e.target.value
    
    setResultadoPartido((prevState) => {

      const { goleadores } = prevState

      const new_goleador = [...goleadores,  {ids:player._id,nombre:player.nombre + player.apellido}]

      return { ...prevState, goleadores: new_goleador }



    })
   

  }
  const handlerAsistentes = (e) => {


    const player = e.target.value


    setResultadoPartido((prevState) => {
      const { asistentes } = prevState

      const new_asistente = [...asistentes, {ids:player._id,nombre:player.nombre + player.apellido}]

      return { ...prevState, asistentes: new_asistente }






    })
  }


  useEffect(() => {
    getEquiposPorPartido(local, visitante)
    
  }, [])


  console.log(resultadoPartido)
  return (
    <form onSubmit={handleSubmit} className="w-[600px] h-[300px] bg-slate-200 p-2 m-auto overflow-y-scroll ">
      <div className="flex flex-col gap-4">
        <div >
          <FormLabel>Es Empate?</FormLabel>

          <Select
            fullWidth
            value={resultadoPartido.is_draw}

            onChange={(e) => setResultadoPartido({ ...resultadoPartido, is_draw: e.target.value })}>
            <MenuItem value={true} >Si</MenuItem>
            <MenuItem value={false} >No</MenuItem>





          </Select>
        </div>


        <div >
          <FormLabel>Goles Local</FormLabel>

          <TextField
            type="number"
            fullWidth
            value={resultadoPartido.goles_local}

            onChange={(e) => setResultadoPartido({ ...resultadoPartido, goles_local: parseInt(e.target.value) })} />


        </div>
        <div >
          <FormLabel>Goles Visitante</FormLabel>

          <TextField
            type="number"
            fullWidth
            value={resultadoPartido.goles_visitante}

            onChange={(e) => setResultadoPartido({ ...resultadoPartido, goles_visitante: parseInt(e.target.value) })} />


        </div>
        <div >
          <FormLabel>Asistencias Local</FormLabel>

          <TextField
            type="number"
            fullWidth
            value={resultadoPartido.asistencias_local}

            onChange={(e) => setResultadoPartido({ ...resultadoPartido, asistencias_local: parseInt(e.target.value) })} />


        </div>
        <div >
          <FormLabel>Asistencias Visitante</FormLabel>

          <TextField
            type="number"
            fullWidth
            value={resultadoPartido.asistencias_visitantes}

            onChange={(e) => setResultadoPartido({ ...resultadoPartido, asistencias_visitantes: parseInt(e.target.value) })} />


        </div>

        <div >
          <FormLabel>Goleadores</FormLabel>

          <Select
            fullWidth
            value={resultadoPartido.goleadores}

            onChange={handlerGoleadores}>

            {jugadores?.map(elem => {
              return <MenuItem key={elem._id} value={elem} >{elem.nombre + " " + elem.apellido}</MenuItem>

            })}





          </Select>
          {resultadoPartido.goleadores.map((e)=><Typography>{e.nombre}</Typography>)}
        </div>
        <div >
          <FormLabel>Asistentes</FormLabel>

          <Select
            fullWidth
            value={resultadoPartido.asistentes}

            onChange={handlerAsistentes}>

            {jugadores?.map(elem => {
              return <MenuItem key={elem._id} value={elem} >{elem.nombre + " " + elem.apellido}</MenuItem>

            })}





          </Select>
          {resultadoPartido.asistentes.map((e)=><Typography>{e.nombre}</Typography>)}

        </div>



        <div >
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            type="submit"
          >
            Crear
          </Button>

        </div>
      </div>





    </form >
  );
}
