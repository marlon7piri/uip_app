'use client'

import { Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUploadPicture } from "../hooks/useUploadFile";
import axios from "axios";
import { useSession } from "next-auth/react";
import { TorneoStore } from "@/utils/zustand/torneos";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { useTorneos } from "../hooks/useTorneos";
import toast from "react-hot-toast";

export default function FormTorneos() {
  const saveImageTorneo = TorneoStore(state => state.saveImageTorneo)
  const currentImageTorneo = TorneoStore(state => state.currentImageTorneo)
  const { setTorneo, torneo, crearTorneo } = useTorneos()
  const { data: session } = useSession();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearTorneo()
    toast.success("Torneo creado")

  };



  return (
    <form onSubmit={handleSubmit} className="w-[600px] bg-slate-200 p-2 m-auto">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel>Nombre</FormLabel>
          <TextField
            size="small"
            name="namePlan"
            variant="outlined"
            fullWidth
            value={torneo.nombre}
            onChange={(e) => setTorneo({ ...torneo, nombre: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabel>Foto</FormLabel>
          <CustomInputFileFoto
            onChange={saveImageTorneo}
          />
          <img src={currentImageTorneo} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={'imagen del torneo'} />

        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            type="submit"
          >
            Guardar
          </Button>
          <Button variant="outlined" color="error">
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
