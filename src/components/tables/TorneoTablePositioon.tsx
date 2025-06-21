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

import { Box, TextField, Typography } from '@mui/material';

import { Torneos } from '@/infraestrcuture/entities/torneos';
import { useRouter } from 'next/navigation';

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

  const router = useRouter()


  return (
    <TableContainer component={Paper} style={{ width: '100%', background: 'rgba(20,18,18,0.5)' }}>
      <Table aria-label="simple table" >
        <TableHead >
          <TableRow>
            <TableCell>

              <Typography ></Typography>
            </TableCell>
            <TableCell >
              <Typography className={styles.rows}>Equipo</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography className={styles.rows}>PJ</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography className={styles.rows}>V</Typography>

            </TableCell>
            <TableCell align="left">
              <Typography className={styles.rows}>E</Typography>

            </TableCell>

            <TableCell align="left">
              <Typography className={styles.rows}>D</Typography>

            </TableCell>
            <TableCell align="left">
              <Typography className={styles.rows}>PT</Typography>

            </TableCell>
            <TableCell align="left">
              <Typography className={styles.rows}>GF</Typography>

            </TableCell>
            <TableCell align="left">
              <Typography className={styles.rows}>GC</Typography>

            </TableCell>
            <TableCell align="left">
              <Typography className={styles.rows}>DG</Typography>

            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index: number) => {

            const { goles_favor, asistencias, puntos, goles_contra, partidos_jugados, partidos_ganados, partidos_empatados, partidos_perdidos } = row.estadisticasTorneo.estadisticas
            return <TableRow
              key={row._id}
              onClick={() => router.push(`/equipos/${row._id}`)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-900 cursor-pointer'
            >
              <TableCell align="left">
                <Typography className={styles.rows}>{index + 1}</Typography>

              </TableCell>



              <TableCell component="th"  >
                <div className='flex flex-col sm:flex-col md:flex-row  justify-start items-center  gap-2 '>
                  <Image src={row.logo} width={45} height={45} alt={row?.nombre} decoding='async'
                    className='object-cover'
                  />
                  <Typography className={styles.rows}>{row.nombre}</Typography>


                </div>
              </TableCell>
              <TableCell align="left">
                <Typography className={styles.rows}>{partidos_jugados}</Typography>

              </TableCell>
              <TableCell align="left">
                <Typography className={styles.rows}>  {partidos_ganados}</Typography>

              </TableCell>
              <TableCell align="left">
                <Typography className={styles.rows}> {partidos_empatados}</Typography>

              </TableCell>
              <TableCell align="left">
                <Typography className={styles.rows}>{partidos_perdidos}</Typography>

              </TableCell>
              <TableCell align="left">
                <Typography className={styles.rows_point}>  {puntos}</Typography>

              </TableCell>
              <TableCell align="left">
                <Typography className={styles.rows}>  {goles_favor}</Typography>

              </TableCell>
              <TableCell align="left">
                <Typography className={styles.rows}>{goles_contra}</Typography>

              </TableCell>
              <TableCell align="left">
                <Typography className={styles.rows}> {goles_favor - goles_contra}</Typography>

              </TableCell>





            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
