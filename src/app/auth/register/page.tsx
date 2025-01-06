"use client";

import { FormRegister } from "@/components/forms/FormRegister";
import styles from '../login/login.module.css'
import Image from "next/image";



export default function Register() {
  
  return (
     <main className={styles.containerLogin}>
         <FormRegister/>
      <Image src={require('../../../../public/imagenes/logouipApp.png')} alt='logo' width={400} height={580} className='object-cover' />


    </main>
  );
}