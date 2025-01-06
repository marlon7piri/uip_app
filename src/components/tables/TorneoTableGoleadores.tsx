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
import { IconButton, TextField, Tooltip } from '@mui/material';
import { useJugador } from '../hooks/useJugador';
import { JugadorStore } from '@/utils/zustand/jugador';
import Link from 'next/link';

interface Props {
  rows: Jugadores[]
}
const FiltrosMercado = () => {
  return (
    <div className='p-2'>
      <TextField type="text" placeholder='nombre' />
    </div>
  )
}


export default function TorneoTableGoleadores({ rows }: Props) {
  const { handlerPlayer } = useJugador()


  const handlerClickPlayer = (e: string) => {
    handlerPlayer(e)
  }




  return (
    <TableContainer component={Paper} >
      {/* <FiltrosMercado /> */}
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Goles</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row,index) => (
            <TableRow
              key={row._id}
              onClick={() => handlerClickPlayer(row._id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-200 cursor-pointer'
            >
              <TableCell align="right">{index +1}</TableCell>

              <TableCell align="center" style={{display:'flex',justifyContent:'left',alignItems:'center',gap:1}}>
                <Image src={row.jugador?.foto} width={50} height={50} alt='una imagen del jugador'
                  className='rounded-full'
                />
                 {row.jugador?.nombre + " " + row.jugador?.apellido}
              </TableCell>

             
              <TableCell align="right">{row?.cantidad}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
