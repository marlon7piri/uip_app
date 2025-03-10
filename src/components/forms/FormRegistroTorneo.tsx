'use client'

import { Button, CircularProgress, FormLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
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
import './forms.css'

export default function FormRegistroTorneo() {

  const { partido, setPartido, createPartido } = usePartidos()
  const { equiposRegistrados, setEquiposRegistrados, registrarEquiposTorneos, loading } = useTorneos()
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

    const { _id, nombre } = e.target.value
    setEquiposRegistrados((prevState) => {
      const exist = prevState.find(item => item._id === _id)

      if (!exist) {
        return [...prevState, e.target.value]
      }


      return [...prevState]

    })


  }




  return (
    <form onSubmit={handleSubmit} >
      <div className="flex flex-col gap-4">

        <label className="text-2xl font-bold text-slate-50">Equipos</label>

        <Select
          fullWidth
          defaultValue={""}
          className="border border-slate-50"
          onChange={(e) => registrarEquipos(e)}>
          {equipos.map((e) => {
            return <MenuItem key={e?._id} value={e} >

              {e?.nombre}</MenuItem>



          })}

        </Select>

        {equiposRegistrados.length == 0 ? <p className="text-white">No hay equipos registrados</p> : equiposRegistrados.map((e) => {
          return <p key={e._id} className="text-slate-50">{e.nombre}</p>
        })}



        <div >
          <button>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear'}
          </button>

        </div>
      </div>





    </form >
  );
}
