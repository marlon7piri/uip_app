"use client";

import { FormLogin } from "@/components/forms/FormLogin";
import styles from './login.module.css'
import Image from "next/image";


export default function Login() {

  return (
    <main className={styles.containerLogin}>
      <FormLogin />
      <Image src={require('../../../../public/imagenes/logouipApp.png')} alt='logo' width={400} height={580} className='object-cover' />


    </main>
  );
}