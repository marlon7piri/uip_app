"use client";

import { FormRegister } from "@/components/forms/FormRegister";
import styles from '../login/login.module.css'
import Image from "next/image";



export default function Register() {
  
  return (
     <main className={styles.containerLogin}>
         <FormRegister/>
      <div className={styles.image}/>


    </main>
  );
}