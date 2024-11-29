'use client'

import { Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUploadPicture } from "../hooks/useUploadFile";
import { useEquipos } from "../hooks/useEquipos";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { EquipoStore } from "@/utils/zustand/equipos";
import toast from "react-hot-toast";

export default function FormEquipo() {
  const saveImageEquipo = EquipoStore(state => state.saveImageEquipo);
  const currentImageEquipo = EquipoStore(state => state.currentImageEquipo);
  const { equipo, setEquipo, createEquipo } = useEquipos()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEquipo()
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
            value={equipo.nombre}
            onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabel>Logo</FormLabel>
          <CustomInputFileFoto
            onChange={saveImageEquipo}
          />
          <img src={currentImageEquipo} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={'imagen de un equipo de futbol'} />

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
