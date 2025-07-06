"use client";

import { FormLogin } from "@/components/forms/FormLogin";
import styles from './login.module.css'
import Image from "next/image";


export default function Login() {

  return (
    <main className={styles.containerLogin}>

      <FormLogin />
      <div className={styles.image} />



    </main>
  );
}