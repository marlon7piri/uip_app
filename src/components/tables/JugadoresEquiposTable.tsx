
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


export default function JugadoresEquiposTable({ rows }: Props) {
  const { handlerPlayer } = useJugador()
  const jugadores = JugadorStore(state => state.jugadores)


  const handlerClickPlayer = (e: string) => {
    handlerPlayer(e)
  }



  return (
    <TableContainer component={Paper} style={{ maxWidth: '100%', margin: 'auto' }}>
      {/* <FiltrosMercado /> */}
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Foto</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Edad</TableCell>
            <TableCell align="right">Nacionalidad</TableCell>

            <TableCell align="right">Valor de mercado</TableCell>
            <TableCell align="right">Oferta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              onClick={() => handlerClickPlayer(row._id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-200 cursor-pointer'
            >
              <TableCell align="right">
                <Image src={row.foto ? row.foto : ''} width={50} height={50} alt={row.club?.nombre ? row.club?.nombre : 'foto del club'}
                  className='rounded-full'
                />
              </TableCell>

              <TableCell component="th" scope="row">

                {row.nombre + " " + row.apellido}
              </TableCell>
              <TableCell align="right">{row.edad}</TableCell>
              <TableCell align="right">nacionalidad</TableCell>



              <TableCell align="right">${row.valor_mercado}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Tooltip title='hacer oferta'>
                    <Link href={`/mercado/ofertas/${row?._id}`}>
                      <CurrencyExchangeIcon size={20} />

                    </Link>


                  </Tooltip>
                </IconButton>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
