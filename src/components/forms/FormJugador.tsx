'use client'

import { Button, FormLabel, Grid, Grid2, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUploadPicture } from "../hooks/useUploadFile";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useJugador } from "../hooks/useJugador";
import { useEquipos } from "../hooks/useEquipos";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FormJugador() {
  const { handleFileChange, imagen } = useUploadPicture();
  const { jugador, setJugador, createJugador } = useJugador()
  const { equipos } = useEquipos()
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    createJugador()
    toast.success('Jugador creado')
    router.push('/home/equipos')
  };

  const handleChangePicture = async (e) => {
    await handleFileChange(e);
    setJugador({ ...jugador, foto: imagen });
  };



  return (
    <form onSubmit={handleSubmit} className="w-[600px] bg-slate-200 p-2 m-auto">
      <Grid2 container spacing={3}>
        <Grid2 xs={12}>
          <FormLabel>Nombre</FormLabel>
          <TextField
            size="small"
            name="namePlan"
            variant="outlined"
            fullWidth
            value={jugador.nombre}
            onChange={(e) => setJugador({ ...jugador, nombre: e.target.value })}
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel>Apellido</FormLabel>
          <TextField
            size="small"
            name="namePlan"
            variant="outlined"
            fullWidth
            value={jugador.apellido}
            onChange={(e) => setJugador({ ...jugador, apellido: e.target.value })}
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel>Edad</FormLabel>
          <TextField
            type="number"
            size="small"
            name="namePlan"
            variant="outlined"
            fullWidth
            value={jugador.edad}
            onChange={(e) => setJugador({ ...jugador, edad: e.target.value })}
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel>Estatura</FormLabel>
          <TextField
            type="number"
            size="small"
            name="namePlan"
            variant="outlined"
            fullWidth
            value={jugador.estatura}
            onChange={(e) => setJugador({ ...jugador, estatura: e.target.value })}
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel>Club</FormLabel>

          <Select
            fullWidth
            value={jugador.club}

            onChange={(e) => setJugador({ ...jugador, club: e.target.value })}>
            {equipos.map((e) => {
              return <div key={e?._id}>
                <MenuItem value={e?._id} >

                  <Typography>{e?.nombre}</Typography></MenuItem>
              </div>


            })}

          </Select>

        </Grid2>

        <Grid2 item xs={12}>
          <FormLabel>Foto</FormLabel>
          <input
            type="file"
            onChange={handleChangePicture}
          />
          <img src={jugador?.foto} className='w-[100px] h-[100px] rounded-full bg-cover' alt={jugador.nombre} />

        </Grid2>

        <Grid2 item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            type="submit"
          >
            Crear
          </Button>
          <Button variant="outlined" color="error">
            Cancelar
          </Button>
        </Grid2>
      </Grid2>
    </form >
  );
}
