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
import { CircularProgress, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useJugador } from '../hooks/useJugador';
import { JugadorStore } from '@/utils/zustand/jugador';
import Link from 'next/link';
import styles from './styles.module.css'
import Spinner from '../Spinner';


interface Props {
  rows: Jugadores[]
}


export default function MercadoTable({ rows }: Props) {



  



  return (
    <TableContainer component={Paper} style={{ maxWidth: '100%', background: 'rgba(20,18,18,0.5)', borderWidth: 1, color: 'white', }}>
      <Table sx={{ minWidth: 490, }} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell >

              <Typography className={styles.rows}>Foto</Typography></TableCell>
            <TableCell >
              <Typography className={styles.rows}>Nombre</Typography>

            </TableCell>
            <TableCell align="right">
              <Typography className={styles.rows}>Edad</Typography>

            </TableCell>
            <TableCell align="right">
              <Typography className={styles.rows}>Club</Typography>

            </TableCell>

            <TableCell align="right">
              <Typography className={styles.rows}>Valor de mercado</Typography>

            </TableCell>
            <TableCell align="right">
              <Typography className={styles.rows}>Oferta</Typography>

            </TableCell>
            <TableCell align="right">
              <Typography className={styles.rows}>Ver</Typography>

            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='w-full text-center'>
          { rows?.map((row) => (
            <TableRow
              key={row._id}

              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-900 cursor-pointer transition duration-300'
            >
              <TableCell align="right">
                <Image src={row.foto} width={80} height={80} alt={row.club?.nombre}
                  className='object-contain'
                />
              </TableCell>

              <TableCell component="th" scope="row">
                <Typography className={styles.rows}>{row.nombre + " " + row.apellido}</Typography>

              </TableCell>
              <TableCell align="right">
                <Typography className={styles.rows}>{row.edad}</Typography>

              </TableCell>
              <TableCell align="right">
                <Image src={row.club?.logo} width={50} height={50} alt={row.club?.nombre}
                  className='object-cover'
                />
              </TableCell>


              <TableCell align="right">
                <Typography className={styles.rows}>${row.estadisticasGlobales
                  ?.valor_mercado}</Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <Tooltip title='hacer oferta'>
                    <Link href={`/mercado/ofertas/${row?._id}`} className={styles.rows}>
                      <CurrencyExchangeIcon size={20} color='inherit' />

                    </Link>


                  </Tooltip>
                </IconButton>

              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <Tooltip title='Ver detalles'>
                    <Link href={`/jugadores/${row?._id}`} className={styles.rows}>
                      <Typography>Ver</Typography>

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
