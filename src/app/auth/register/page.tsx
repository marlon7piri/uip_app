"use client";

import { FormRegister } from "@/components/forms/FormRegister";
import styles from '../login/login.module.css'



export default function Register() {

  return (
    <main className={styles.containerLogin}>

      <FormRegister />
      <div className={styles.image} />


    </main>
  );
}