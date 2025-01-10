
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
import Link from 'next/link';
import styles from './styles.module.css'

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


  const handlerClickPlayer = (e: string) => {
    handlerPlayer(e)
  }



  return (
    <TableContainer component={Paper} style={{ maxWidth: '62%',background:'rgba(20,18,18,0.5)',borderWidth:1,color:'white', }}>
      {/* <FiltrosMercado /> */}
      <Table sx={{ minWidth: 490,}} aria-label="simple table">
        <TableHead >
          <TableRow> 
            <TableCell className={styles.rows}>Foto</TableCell>
            <TableCell className={styles.rows}>Nombre</TableCell>
            <TableCell className={styles.rows}>Posicion</TableCell>
            <TableCell className={styles.rows}  align="right">Edad</TableCell>
            <TableCell  className={styles.rows} align="right">Nacionalidad</TableCell>

            <TableCell className={styles.rows} align="right">Valor de mercado</TableCell>
            <TableCell className={styles.rows} align="right">Oferta</TableCell>
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
                <Image src={row ? row?.foto : ''} width={50} height={50} alt={row ? row.nombre : 'logo del jugador'}
                  className='rounded-full object-cover'
                />
              </TableCell>

              <TableCell className={styles.rows} component="th" scope="row">

                {row.nombre + " " + row.apellido}
              </TableCell>
              <TableCell  className={styles.rows}  align="right">{row.estadisticasGlobales?.posicion}</TableCell>
              <TableCell  className={styles.rows}  align="right">{row.edad}</TableCell>
              <TableCell  className={styles.rows} align="right">nacionalidad</TableCell>
              


              <TableCell  className={styles.rows} align="right">${row.estadisticasGlobales
                ?.valor_mercado}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Tooltip title='hacer oferta'>
                    <Link href={`/mercado/ofertas/${row?._id}`} className={styles.rows}>
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
