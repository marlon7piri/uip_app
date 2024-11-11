import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";

export const useTorneos = () => {
  const { data: session } = useSession();
  const [torneos, setTorneos] = useState<Torneos[]>([]);

  useEffect(() => {
    getTorneos();
  }, []);

  const getTorneos = async () => {
    const res = await UseCases.getTorneosUseCases(fetcherDb, session?.token);
    setTorneos(res);
  };

  return { torneos };
};
