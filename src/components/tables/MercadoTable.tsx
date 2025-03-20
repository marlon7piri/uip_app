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
import { useRouter, useSearchParams } from 'next/navigation';


interface Props {
  rows: Jugadores[]
}


export default function MercadoTable({ rows }: Props) {

  const router = useRouter()
  const search = useSearchParams()


  if (rows?.length == 0 && !search.get("query")) {
    return <Spinner/>
  }

  if (!rows) {
    return <h1 className="text-4xl text-slate-50">No hay jugadores</h1>
  }


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
            <TableCell align="center">
              <Typography className={styles.rows}>Edad</Typography>

            </TableCell>


            <TableCell align="center">
              <Typography className={styles.rows}>Estatura</Typography>

            </TableCell>
            <TableCell align="center">
              <Typography className={styles.rows}>Club</Typography>

            </TableCell>
            {/* <TableCell align="center">
              <Typography className={styles.rows}>Oferta</Typography>

            </TableCell> */}

          </TableRow>
        </TableHead>
        <TableBody className='w-full '>
          {rows?.map((row) => (
            <TableRow
              key={row._id}
              onClick={() => router.push(`/jugadores/${row._id}`)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-900 cursor-pointer transition duration-300'
            >
              <TableCell align="center">
                <Image src={row.foto} width={80} height={80} alt={row.club?.nombre}
                  className='object-contain'
                />
              </TableCell>

              <TableCell component="th" scope="row">
                <Typography className={styles.rows}>{row.nombre + " " + row.apellido}</Typography>

              </TableCell>
              <TableCell align="center">
                <Typography className={styles.rows}>{row.edad}</Typography>

              </TableCell>
              <TableCell align="center">
                <Typography className={styles.rows}>{row.estatura} cm</Typography>
              </TableCell>
              <TableCell align="center" >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={row.club?.logo} width={50} height={50} alt={row.club?.nombre}
                    className='object-cover '
                  />
                </div>

              </TableCell>



              {/* <TableCell align="center">
                <IconButton>
                  <Tooltip title='hacer oferta'>
                    <Link href={`/mercado/ofertas/${row?._id}`} className={styles.rows}>
                      <CurrencyExchangeIcon size={20} color='inherit' />

                    </Link>


                  </Tooltip>
                </IconButton>

              </TableCell> */}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
