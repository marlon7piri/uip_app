'use client'

import { Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUploadPicture } from "../hooks/useUploadFile";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function FormEquipo() {
  const { handleFileChange, imagen } = useUploadPicture();
  const { data: session } = useSession();
  const [torneo, setTorneo] = useState({
    nombre: '',
    foto: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL + '/torneos/create'}`, torneo, {
      headers: {
        token: session?.token
      }
    });
  };

  const handleChangePicture = async (e) => {
    await handleFileChange(e);
    setTorneo({ ...torneo, foto: imagen });
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
          <input
            type="file"
            onChange={handleChangePicture}
          />
          {/* <img src={imagen} alt="" className="w-[100px] h-[100px] rounded-full" /> */}
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
