'use server'
import { signIn, signOut } from "@/auth"



export const loginAuth = async (credentials: any) => {
    try {
        const res = await signIn('credentials', {
            username: credentials.username,
            password: credentials.password,
            redirect: false,
        })

        return res
    } catch (error) {
        console.log(error)

    }

}
export const logoutAuth = async () => signOut({ redirectTo: '/auth/login', redirect: true })
   