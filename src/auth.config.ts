import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import axios from "axios";

export default {
    providers: [


        Credentials({

            
            async authorize(credentials){
                try {
                    const response = await axios.post(
                        process.env.NEXT_PUBLIC_API_URL + "/users/login",
                        {
                            username: credentials.username,
                            password: credentials.password,
                        }
                    );


                    if (response.data.status === "success") {
                        const user = response.data.data;


                        return {
                            id: user._id,
                            name: user.nameUser,
                            email: user.email,
                            token: response.data.token,
                            rol: user.rol,
                        }

                    } else {
                        throw new Error(response?.data?.message || "Authentication failed");
                    }
                } catch (error) {
                    throw new Error("Error connecting to authentication server");
                }
            },
        })]
} satisfies NextAuthConfig