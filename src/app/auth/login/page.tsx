"use client";

import { FormLogin } from "@/components/forms/FormLogin";
import styles from './login.module.css'


export default function Login() {
  
  return (
    <section className={styles.containerLogin}>
     <FormLogin/>

    </section>
  );
}