import { getSession } from "@/actions/get-session";
import { useEffect, useState } from "react";

export const useGrupos = () => {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const getGrupos = async () => {
      const session = await getSession();
      const res = await fetch(`http://localhost:3003/api/v1/grupo/list`, {
        headers: {
          token: session?.token,
        },
      });
      const { data } = await res.json();

      setGrupos(data);
    };

    getGrupos();
  }, []);

  return { grupos };
};
