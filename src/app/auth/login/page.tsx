"use client";

import { FormLogin } from "@/components/forms/FormLogin";
import styles from './login.module.css'
import Image from "next/image";


export default function Login() {

  return (
    <main className={styles.containerLogin}>
      <div className="w-2/4 bg-yellow-300 p-4 mt-10">
        <p className="w-auto">
          La página está en mantenimiento, disculpen
          las molestias que puede ocasionar,
          estamos trabajando en activarla lo mas pronto posible

        </p>
      </div>
      <FormLogin />
      <div className={styles.image} />



    </main>
  );
}