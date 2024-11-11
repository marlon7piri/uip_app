'use client'

import { Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUploadPicture } from "../hooks/useUploadFile";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function FormOferta() {
  const { data: session } = useSession();
  const params = useParams()


  console.log(session?.user?.id)
  const [oferta, setOferta] = useState({
    descripcion: '',
    monto: '',
    author: session?.user?.id,
    jugador: params?.idPlayer
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL + '/ofertas/create'}`, oferta, {
      headers: {
        token: session?.token
      }
    });
  };



  return (
    <form onSubmit={handleSubmit} className="w-[600px] bg-slate-200 p-2 m-auto">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel>Descripcion</FormLabel>
          <TextField
            size="small"
            name="namePlan"
            variant="outlined"
            fullWidth
            value={oferta.descripcion}
            onChange={(e) => setOferta({ ...oferta, descripcion: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>Monto</FormLabel>
          <TextField
            type='number'
            size="small"
            name="namePlan"
            variant="outlined"
            fullWidth
            value={oferta.monto}
            onChange={(e) => setOferta({ ...oferta, monto: e.target.value })}
          />
        </Grid>



        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            type="submit"
          >
            Hacer Oferta
          </Button>

        </Grid>
      </Grid>
    </form>
  );
}
