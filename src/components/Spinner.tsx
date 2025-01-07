import React from 'react'
import styles from './spiner.module.css'

const Spinner = () => {
  return (

    <div className='w-full h-screen flex justify-center items-center bg-transparent'>
    <div className={styles.loader}></div>

    </div>
  )
}

export default Spinner
