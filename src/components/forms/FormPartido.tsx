'use client'

import { Button, FormLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUploadPicture } from "../hooks/useUploadFile";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useJugador } from "../hooks/useJugador";
import { useEquipos } from "../hooks/useEquipos";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { JugadorStore } from "@/utils/zustand/jugador";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { useTorneos } from "../hooks/useTorneos";
import { usePartidos } from "../hooks/usePartidos";


interface Props{
  equiposParticipantes:any[]
}

export default function FormPartido({equiposParticipantes}:Props) {
  

  const { partido, setPartido, createPartido } = usePartidos()
  const { torneos } = useTorneos()
  const { equipos } = useEquipos()
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    createPartido()
    toast.success('Partido creado')
    router.push('/home/torneos')
  };





  return (
    <form onSubmit={handleSubmit} className="w-[600px] h-[300px] bg-slate-200 p-2 m-auto overflow-y-scroll ">
      <div className="flex flex-col gap-4">
        
        <div >
          <FormLabel>Club Local</FormLabel>

          <Select
            fullWidth
            value={partido.local}

            onChange={(e) => setPartido({ ...partido, local: e.target.value })}>
            {equiposParticipantes.map((e) => {
              return <MenuItem key={e?._id} value={e?._id} >

                {e?.nombre}</MenuItem>



            })}

          </Select>
        </div>
        <div >
          <FormLabel>Club Visitante</FormLabel>

          <Select
            fullWidth
            value={partido.visitante}

            onChange={(e) => setPartido({ ...partido, visitante: e.target.value })}>
            {equiposParticipantes.map((e) => {
              return <MenuItem key={e?._id} value={e?._id} >

                {e?.nombre}</MenuItem>



            })}

          </Select>
        </div>
       
        <div >
          <FormLabel>Estadio</FormLabel>

          <TextField
            fullWidth
            value={partido.estadio}

            onChange={(e) => setPartido({ ...partido, estadio: e.target.value })} />

        </div>
        <div >
          <FormLabel>Fecha</FormLabel>

          <TextField
            type="date"
            fullWidth
            value={partido.fecha}

            onChange={(e) => setPartido({ ...partido, fecha: e.target.value })} />

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
