'use server'
import { signIn, signOut } from "@/auth"
import { DefaultLoginRedirect } from "@/routes"
import { AuthError } from "next-auth"



export const loginAuth = async (credentials: any) => {
    try {
        const res = await signIn('credentials', {
            username: credentials.username,
            password: credentials.password,
            redirectTo: DefaultLoginRedirect,
        })

        return res
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Credenciales invalidas' }
                default:
                    return { error: 'Algo ha pasado, intente de nuevo' }
            }
        }
        throw error

    }

}
export const logoutAuth = async () => signOut({ redirectTo: '/auth/login', redirect: true })
