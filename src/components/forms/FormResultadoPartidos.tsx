'use client'

import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEquipos } from "../hooks/useEquipos";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { JugadorStore } from "@/utils/zustand/jugador";
import { useTorneos } from "../hooks/useTorneos";
import { usePartidos } from "../hooks/usePartidos";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";

interface Props{
  jugadores:Jugadores
}

export default function FormResultadoPartidos({ jugadores }:Props) {


  const { partido, setPartido, createPartido, resultadoPartido, setResultadoPartido } = usePartidos()
  const { torneos } = useTorneos()
  const { equipos } = useEquipos()
  const router = useRouter();
  const [jugadoresSelected, setJugadoresSelected] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(resultadoPartido)

  };


  const handlerGoleadores = (e) => {

    const idPlayer = e.target.value
    setResultadoPartido((prevState) => {

      const { goleadores } = prevState

      const new_goleador = goleadores.includes(idPlayer) ? goleadores.filter(item => item !== idPlayer) : [...goleadores, idPlayer]

      return { ...prevState, goleadores: new_goleador }



    })
  }
  const handlerAsistentes = (e) => {

    const idPlayer = e.target.value

    setResultadoPartido((prevState) => {
      const { asistentes } = prevState

      const new_asistente = asistentes.includes(idPlayer) ? asistentes.filter(item => item !== idPlayer) : [...asistentes, idPlayer]

      return { ...prevState, asistentes: new_asistente }






    })
  }


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
        {!resultadoPartido.is_draw ? <div >
          <FormLabel>Ganador</FormLabel>

          <Select
            fullWidth
            value={resultadoPartido.ganador_id}
            onChange={(e) => setResultadoPartido({ ...resultadoPartido, ganador_id: e.target.value })}>

            {equipos.map((e) => {
              return <MenuItem key={e?._id} value={e?._id} >

                {e?.nombre}</MenuItem>



            })}

          </Select>
        </div> : ''}
        {!resultadoPartido.is_draw ? <div >
          <FormLabel>Perdedor</FormLabel>

          <Select
            fullWidth
            value={resultadoPartido.perdedor_id}

            onChange={(e) => setResultadoPartido({ ...resultadoPartido, perdedor_id: e.target.value })}>
            {equipos.map((e) => {
              return <MenuItem key={e?._id} value={e?._id} >

                {e?.nombre}</MenuItem>



            })}

          </Select>
        </div> : ''}
        <div >
          <FormLabel>Goles</FormLabel>

          <TextField
            type="number"
            fullWidth
            value={resultadoPartido.goles_anotados}

            onChange={(e) => setResultadoPartido({ ...resultadoPartido, goles_anotados: parseInt(e.target.value) })} />


        </div>
        <div >
          <FormLabel>Asistencias</FormLabel>

          <TextField
            type="number"
            fullWidth
            value={resultadoPartido.asistencias}

            onChange={(e) => setResultadoPartido({ ...resultadoPartido, asistencias: parseInt(e.target.value) })} />


        </div>
        
        <div >
          <FormLabel>Goleadores</FormLabel>

          <Select
            fullWidth
            value={resultadoPartido.goleadores}

            onChange={handlerGoleadores}>

            {jugadores?.map(elem => {
              return <MenuItem key={elem._id} value={elem._id} >{elem.nombre + " " + elem.apellido}</MenuItem>

            })}





          </Select>
        </div>
        <div >
          <FormLabel>Asistentes</FormLabel>

          <Select
            fullWidth
            value={resultadoPartido.asistentes}

            onChange={handlerAsistentes}>

            {jugadores?.map(elem => {
              return <MenuItem key={elem._id} value={elem._id} >{elem.nombre + " " + elem.apellido}</MenuItem>

            })}





          </Select>
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
