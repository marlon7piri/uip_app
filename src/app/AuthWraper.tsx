
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast'

type Props = {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: Props) {
  return <SessionProvider>{children}
    <Toaster />
  </SessionProvider>;
}