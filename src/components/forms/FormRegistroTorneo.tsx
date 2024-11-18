'use client'

import { Button, FormLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUploadPicture } from "../hooks/useUploadFile";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useJugador } from "../hooks/useJugador";
import { useEquipos } from "../hooks/useEquipos";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { JugadorStore } from "@/utils/zustand/jugador";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { useTorneos } from "../hooks/useTorneos";
import { usePartidos } from "../hooks/usePartidos";

export default function FormRegistroTorneo() {

  const { partido, setPartido, createPartido } = usePartidos()
  const { equiposRegistrados, setEquiposRegistrados, registrarEquiposTorneos } = useTorneos()
  const { equipos } = useEquipos()
  const router = useRouter();
  const search = useSearchParams()
  const idTorneo = search.get('idTorneo')

  const handleSubmit = async (e) => {
    e.preventDefault();


    await registrarEquiposTorneos(idTorneo)

    toast.success('Registro creado')
    router.back()
  };

  const registrarEquipos = (e) => {

    setEquiposRegistrados([...equiposRegistrados, e.target.value])
  }




  return (
    <form onSubmit={handleSubmit} className="w-[600px] h-[300px] bg-slate-200 p-2 m-auto overflow-y-scroll ">
      <div className="flex flex-col gap-4">
        <div >
          <FormLabel>Equipos</FormLabel>

          <Select
            fullWidth

            onChange={(e) => registrarEquipos(e)}>
            {equipos.map((e) => {
              return <MenuItem key={e?._id} value={e} >

                {e?.nombre}</MenuItem>



            })}

          </Select>
        </div>
        <div>
          {equiposRegistrados.length == 0 ? <p>No hay equipos registrados</p> : equiposRegistrados.map((e) => {
            return <p>{e.nombre}</p>
          })}
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
