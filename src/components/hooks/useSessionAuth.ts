import { getSession } from "@/actions/get-session"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export const useSessionAuth = ()=>{
    const [session, setSession] = useState(null)
    useEffect(() => {
  
      const loadSession = async()=>{
        const sessionresponse = await getSession()
        setSession(sessionresponse)
  
      }
      loadSession()
    }, [])


    return {
        session
    }
}