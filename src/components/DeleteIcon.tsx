import React from 'react'
import DeleteOutline from '@mui/icons-material/DeleteOutline';

interface Props{
    onClick:()=>void
}
const DeleteIcon = ({onClick}:Props) => {
  return <button onClick={onClick} className='z-10 absolute lg:top-2 right-10 sm:top-16 sm:right-16 bg-red-500 p-1 rounded-md hover:bg-red-900 cursor-pointer'><DeleteOutline /></button>
}

export default DeleteIcon
