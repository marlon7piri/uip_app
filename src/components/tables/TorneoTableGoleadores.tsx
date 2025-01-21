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
import { TextField, Typography } from '@mui/material';
import styles from './styles.module.css'
import { useRouter } from 'next/navigation';


interface Props {
  rows: Jugadores[]
}



export default function TorneoTableGoleadores({ rows }: Props) {


  const router = useRouter()




  return (
    <TableContainer component={Paper} style={{ width: '100%', minHeight: '100vh', background: 'rgba(20,18,18,0.5)', borderWidth: 1, color: 'white' }}>

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.rows}></TableCell>
            <TableCell >
              <Typography className={styles.rows}>Nombre</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography className={styles.rows}>Cantidad</Typography>

            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <TableRow
              key={row._id}
              onClick={() => router.push(`/jugadores/${row.jugador?._id}`)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='hover:bg-slate-900 cursor-pointer'
            >
              <TableCell align="right" >
                <Typography className={styles.rows}>{index + 1}</Typography>
              </TableCell>

              <TableCell align="center"  >
                <div className='flex justify-center items-center gap-1'>
                  <Image src={row?.jugador?.foto} width={50} height={50} alt='una imagen del jugador'
                    className='rounded-full'
                  />
                  <Typography className={styles.rows}>{row.jugador?.nombre + " " + row.jugador?.apellido}</Typography>
                </div>



              </TableCell>


              <TableCell align="right" >
                <Typography className={styles.rows}>{row?.cantidad}</Typography>

              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
