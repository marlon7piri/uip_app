
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthWrapper from "./AuthWraper";
import FollowSession from "@/components/FollowSession";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Liga Total",
  description: "Ligas no profesionales de futbol en Panamá",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="es">

      <body
        className={`${poppins.className} antialiased`}
      >

        <AuthWrapper>
          {/* <FollowSession /> */}
          {children}

        </AuthWrapper>


      </body>

    </html>
  );
}
