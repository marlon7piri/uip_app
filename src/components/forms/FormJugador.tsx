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
import { JugadorStore } from "@/utils/zustand/jugador";
import { CustomInputFileFoto } from "../CustomInputFileFoto";

export default function FormJugador() {
  const saveImage = JugadorStore(state => state.saveImage)
  const currentImage = JugadorStore(state => state.currentImage)

  const { jugador, setJugador, createJugador } = useJugador()
  const { equipos } = useEquipos()
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    createJugador()
    toast.success('Jugador creado')
    router.push('/home/equipos')
  };





  return (
    <form onSubmit={handleSubmit} className="w-[600px] h-[600px] bg-slate-200 p-2 m-auto overflow-y-scroll ">
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
            name="estatura"
            variant="outlined"
            fullWidth
            value={jugador.estatura}
            onChange={(e) => setJugador({ ...jugador, estatura: e.target.value })}
          />
        </Grid2>
        <Grid2 item xs={12} display={'flex'} flexDirection={'column'}>
          <FormLabel>Foto</FormLabel>
          <CustomInputFileFoto
            onChange={saveImage}
          />
          <img src={currentImage} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={jugador.nombre} />

        </Grid2>
        <Grid2 xs={6} item>
          <FormLabel>Rol</FormLabel>

          <Select
            fullWidth
            value={jugador.rol}

            onChange={(e) => setJugador({ ...jugador, rol: e.target.value })}>

            <MenuItem value={'jugador'} >

              Jugador
            </MenuItem>
            <MenuItem value={'dt'} >

              Director
            </MenuItem>

          </Select>

        </Grid2>
        <Grid2 xs={6}>
          <FormLabel>Email</FormLabel>
          <TextField
            type="email"
            size="small"
            name="email"
            variant="outlined"
            fullWidth
            value={jugador.email}
            onChange={(e) => setJugador({ ...jugador, email: e.target.value })}
          />
        </Grid2>
        <Grid2 xs={6}>
          <FormLabel>Estudiante</FormLabel>

          <Select
            fullWidth
            value={jugador.estudiante}

            onChange={(e) => setJugador({ ...jugador, estudiante: e.target.value })}>

            <MenuItem value={'si'} >

              <Typography>Si</Typography>
            </MenuItem>
            <MenuItem value={'no'} >

              <Typography>No</Typography>
            </MenuItem>

          </Select>

        </Grid2>
        <Grid2 xs={6}>
          <FormLabel>Valor del mercado</FormLabel>
          <TextField
            type="number"
            size="small"
            name="namePlan"
            variant="outlined"
            fullWidth
            value={jugador.valor_mercado}
            onChange={(e) => setJugador({ ...jugador, valor_mercado:e.target.value  })}
          />
        </Grid2>

        <Grid2 xs={6}>
          <FormLabel>Posicion</FormLabel>

          <Select
            fullWidth
            value={jugador.posicion}

            onChange={(e) => setJugador({ ...jugador, posicion: e.target.value })}>

            <MenuItem value={'delantero'} >

              Delantero
            </MenuItem>
            <MenuItem value={'Defensa'} >

              Defensa
            </MenuItem>
            <MenuItem value={'Centro Campista'} >

              Centro Campista
            </MenuItem>
            <MenuItem value={'Portero'} >

              Portero
            </MenuItem>

          </Select>

        </Grid2>
        <Grid2 xs={6}>
          <FormLabel>Velocidad</FormLabel>
          <TextField
            type="number"
            size="small"
            name="velocidad"
            variant="outlined"
            fullWidth
            value={jugador.velocidad}
            onChange={(e) => setJugador({ ...jugador, velocidad: e.target.value })}
          />
        </Grid2>
        <Grid2 xs={6}>
          <FormLabel>Ataque</FormLabel>
          <TextField
            type="number"
            size="small"
            name="velocidad"
            variant="outlined"
            fullWidth
            value={jugador.ataque}
            onChange={(e) => setJugador({ ...jugador, ataque: e.target.value })}
          />
        </Grid2>
        <Grid2 xs={6}>
          <FormLabel>Defensa</FormLabel>
          <TextField
            type="number"
            size="small"
            name="defensa"
            variant="outlined"
            fullWidth
            value={jugador.defensa}
            onChange={(e) => setJugador({ ...jugador, defensa: e.target.value })}
          />
        </Grid2>
        <Grid2 xs={6}>
          <FormLabel>Regate</FormLabel>
          <TextField
            type="number"
            size="small"
            name="regate"
            variant="outlined"
            fullWidth
            value={jugador.regate}
            onChange={(e) => setJugador({ ...jugador, regate: e.target.value })}
          />
        </Grid2>

        <Grid2 xs={6}>
          <FormLabel>Club</FormLabel>

          <Select
            fullWidth
            value={jugador.club}

            onChange={(e) => setJugador({ ...jugador, club: e.target.value })}>
            {equipos.map((e) => {
              return <MenuItem key={e?._id} value={e?._id} >

                {e?.nombre}</MenuItem>



            })}

          </Select>

        </Grid2>

        <Grid2 xs={6} lg={12}>
          <FormLabel>Estado</FormLabel>

          <Select
            fullWidth
            value={jugador.status}

            onChange={(e) => setJugador({ ...jugador, status: e.target.value })}>

            <MenuItem value={'activo'} >

              <Typography>Activo</Typography>
            </MenuItem>
            <MenuItem value={'inactivo'} >

              <Typography>Inactivo</Typography>


            </MenuItem>

          </Select>

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

        </Grid2>
      </Grid2>
    </form >
  );
}
