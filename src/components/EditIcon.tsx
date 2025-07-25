import React from 'react'
import EditNote from '@mui/icons-material/EditNote';
import Link from 'next/link';

interface Props {
  link: string
}
const EditIcon = ({ link }: Props) => {



  return (<Link href={link} className='z-10 absolute lg:top-2 right-2 sm:top-16 sm:right-4 bg-sky-500 p-1 rounded-md hover:bg-sky-900 cursor-pointer'>
    <EditNote />
  </Link>)
}

export default EditIcon
