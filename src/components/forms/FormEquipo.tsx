'use client'

import { Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUploadPicture } from "../hooks/useUploadFile";
import { useEquipos } from "../hooks/useEquipos";

export default function FormEquipo() {
  const { handleFileChange, imagen } = useUploadPicture();
  const { equipo, setEquipo, createEquipo } = useEquipos()

  const handleSubmit = async (e) => {
    e.preventDefault();
    createEquipo()
  };

  const handleChangePicture = async (e) => {
    await handleFileChange(e);
    setEquipo({ ...equipo, logo: imagen });
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
          <input
            type="file"
            onChange={handleChangePicture}
          />
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
