import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Jugadores } from '@/infraestrcuture/entities/jugadores';
import Image from 'next/image';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useJugador } from '../hooks/useJugador';
import { JugadorStore } from '@/utils/zustand/jugador';
import Link from 'next/link';
import { Equipos } from '@/infraestrcuture/entities/equipos';

interface Props {
  rows: Equipos[]
}
const FiltrosMercado = () => {
  return (
    <div className='p-2'>
      <TextField type="text" placeholder='nombre' />
    </div>
  )
}


export default function TorneoTablePositioon({ rows }: Props) {




  return (
    <TableContainer component={Paper} style={{ maxWidth: '100%', margin: 'auto' }}>
      {/* <FiltrosMercado /> */}
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Equipo</TableCell>
            <TableCell align="left">Partidos</TableCell>
            <TableCell align="left">Victorias</TableCell>
            <TableCell align="left">Empates</TableCell>

            <TableCell align="left">Derrotas</TableCell>
            <TableCell align="left">GF</TableCell>
            <TableCell align="left">GC</TableCell>
            <TableCell align="left">DG</TableCell>
            <TableCell align="left">Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows[0]?.equipos?.map((row: Equipos, index: number) => (
            <TableRow
              key={row._id}
              onClick={() => handlerClickPlayer(row._id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-200 cursor-pointer'
            >
              <TableCell align="left">{index + 1}</TableCell>



              <TableCell component="th" scope="row">
                <Typography className='flex gap-2 justify-start items-center'>
                  <Image src={row.logo} width={50} height={50} alt={row?.nombre}
                    className='rounded-full'
                  />
                  {row.nombre}
                </Typography>
              </TableCell>
              <TableCell align="left">{row.partidos_jugados}</TableCell>
              <TableCell align="left">{row.partidos_ganados}</TableCell>
              <TableCell align="left">{row.partidos_empatados}</TableCell>
              <TableCell align="left">{row.partidos_perdidos}</TableCell>
              <TableCell align="left">{row.goles_favor}</TableCell>
              <TableCell align="left">{row.goles_contra}</TableCell>
              <TableCell align="left">{row.diferencia_goles}</TableCell>
              <TableCell align="left">{row.puntos}</TableCell>




            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
