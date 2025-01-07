import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

import { TextField, Typography } from '@mui/material';

import {  Torneos } from '@/infraestrcuture/entities/torneos';

interface Props {
  rows: Torneos[]
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
    <TableContainer component={Paper} style={{ width: '100%',background:'rgba(20,18,18,0.5)',borderWidth:1,color:'white', }}>
      {/* <FiltrosMercado /> */}
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='text-slate-50'></TableCell>
            <TableCell className='text-slate-50'>Equipo</TableCell>
            <TableCell  className='text-slate-50'align="left">Partidos</TableCell>
            <TableCell className='text-slate-50' align="left">Victorias</TableCell>
            <TableCell className='text-slate-50' align="left">Empates</TableCell>

            <TableCell className='text-slate-50' align="left">Derrotas</TableCell>
            <TableCell className='text-slate-50' align="left">GF</TableCell>
            <TableCell className='text-slate-50' align="left">GC</TableCell>
            <TableCell className='text-slate-50' align="left">DG</TableCell>
            <TableCell className='text-slate-50' align="left">Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index: number) => {

            const {goles_favor,asistencias,puntos,goles_contra,partidos_jugados,partidos_ganados,partidos_empatados,partidos_perdidos} = row.estadisticasTorneo.estadisticas
            return <TableRow
              key={row._id}
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-900 cursor-pointer'
            >
              <TableCell className='text-slate-50' align="left">{index + 1}</TableCell>



              <TableCell  className='text-slate-50' component="th" scope="row">
                <Typography className='flex gap-2 justify-start items-center'>
                  <Image src={row.logo} width={50} height={50} alt={row?.nombre}
                    className='rounded-full'
                  />
                  {row.nombre}
                </Typography>
              </TableCell>
              <TableCell className='text-slate-50'  align="left">{partidos_jugados}</TableCell>
              <TableCell  className='text-slate-50' align="left">{partidos_ganados}</TableCell>
              <TableCell  className='text-slate-50' align="left">{partidos_empatados}</TableCell>
              <TableCell  className='text-slate-50' align="left">{partidos_perdidos}</TableCell>
              <TableCell  className='text-slate-50' align="left">{goles_favor}</TableCell>
              <TableCell  className='text-slate-50' align="left">{goles_contra}</TableCell>
              <TableCell className='text-slate-50'  align="left">{goles_favor - goles_contra}</TableCell>
              <TableCell  className='text-slate-50' align="left">{puntos}</TableCell>




            </TableRow>
})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
