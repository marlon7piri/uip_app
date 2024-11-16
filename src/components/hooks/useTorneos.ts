import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";

export const useTorneos = () => {
  const { data: session } = useSession();
  const [torneos, setTorneos] = useState<Torneos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const loadTorenos = async () => {
      await getTorneos();
    };
    loadTorenos();
  }, []);

  const getTorneos = async () => {
    setLoading(true);
    const res = await UseCases.getTorneosUseCases(fetcherDb, session?.token);
    setTorneos(res);
    setLoading(false);
  };

  return { torneos, loading };
};
