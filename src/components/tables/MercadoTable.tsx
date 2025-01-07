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
import Spinner from '../Spinner';

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


export default function MercadoTable({ rows }: Props) {
  const { handlerPlayer } = useJugador()


  const handlerClickPlayer = (e: string) => {
    handlerPlayer(e)
  }




  return (
    <TableContainer component={Paper} style={{ maxWidth: '60%',background:'rgba(20,18,18,0.5)',borderWidth:1,color:'white', }}>
      {/* <FiltrosMercado /> */}
      <Table sx={{ minWidth: 490,}} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell className='text-slate-50 font-semibold'>Foto</TableCell>
            <TableCell className='text-slate-50 font-semibold'>Nombre</TableCell>
            <TableCell className='text-slate-50 font-semibold' align="right">Edad</TableCell>
            <TableCell className='text-slate-50 font-semibold' align="right">Club</TableCell>

            <TableCell className='text-slate-50 font-semibold' align="right">Valor de mercado</TableCell>
            <TableCell className='text-slate-50 font-semibold' align="right">Oferta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='w-full text-center'>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              onClick={() => handlerClickPlayer(row._id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-900 cursor-pointer transition duration-300'
            >
              <TableCell align="right">
                <Image src={row.foto} width={80} height={80} alt={row.club?.nombre}
                  className='object-contain'
                />
              </TableCell>

              <TableCell className='text-slate-50 font-bold' component="th" scope="row">

                {row.nombre + " " + row.apellido}
              </TableCell>
              <TableCell  className='text-slate-50 font-bold'  align="right">{row.edad}</TableCell>
              <TableCell  className='text-slate-50 font-bold' align="right">
                <Image src={row.club?.logo} width={50} height={50} alt={row.club?.nombre}
                  className='object-cover'
                />
              </TableCell>


              <TableCell  className='text-slate-50 font-bold' align="right">${row.estadisticasGlobales
                ?.valor_mercado}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Tooltip title='hacer oferta'>
                    <Link href={`/mercado/ofertas/${row?._id}`} className='text-slate-50 font-bold'>
                      <CurrencyExchangeIcon size={20} color='inherit' />

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
