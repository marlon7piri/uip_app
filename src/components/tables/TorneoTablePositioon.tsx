import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import styles from './styles.module.css'

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
            <TableCell className={styles.rows}></TableCell>
            <TableCell className={styles.rows}>Equipo</TableCell>
            <TableCell  className={styles.rows}align="left">Partidos</TableCell>
            <TableCell className={styles.rows} align="left">Victorias</TableCell>
            <TableCell className={styles.rows} align="left">Empates</TableCell>

            <TableCell className={styles.rows} align="left">Derrotas</TableCell>
            <TableCell className={styles.rows} align="left">GF</TableCell>
            <TableCell className={styles.rows} align="left">GC</TableCell>
            <TableCell className={styles.rows} align="left">DG</TableCell>
            <TableCell className={styles.rows} align="left">Puntos</TableCell>
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
              <TableCell className={styles.rows} align="left">{index + 1}</TableCell>



              <TableCell  className={styles.rows} component="th" scope="row">
                <Typography className='flex gap-2 justify-start items-center'>
                  <Image src={row.logo} width={50} height={50} alt={row?.nombre}
                    className='object-cover'
                  />
                  {row.nombre}
                </Typography>
              </TableCell>
              <TableCell className={styles.rows}  align="left">{partidos_jugados}</TableCell>
              <TableCell  className={styles.rows} align="left">{partidos_ganados}</TableCell>
              <TableCell  className={styles.rows} align="left">{partidos_empatados}</TableCell>
              <TableCell  className={styles.rows} align="left">{partidos_perdidos}</TableCell>
              <TableCell  className={styles.rows} align="left">{goles_favor}</TableCell>
              <TableCell  className={styles.rows} align="left">{goles_contra}</TableCell>
              <TableCell className={styles.rows}  align="left">{goles_favor - goles_contra}</TableCell>
              <TableCell  className={styles.rows} align="left">{puntos}</TableCell>




            </TableRow>
})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
