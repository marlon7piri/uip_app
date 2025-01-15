import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Ofertas } from "@/infraestrcuture/entities/ofertas";
import { getSession } from "@/actions/get-session";

export const useOfertas = () => {
  const [ofertas, setOfertas] = useState<Ofertas[]>([]);

  useEffect(() => {
    getOfertas();
  }, []);

  const getOfertas = async () => {
    const session = await getSession()
    const res = await UseCases.getOfertasUseCases(fetcherDb, session?.token);
    setOfertas(res);
  };

  return { ofertas };
};
