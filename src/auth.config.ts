import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import axios from "axios";

export default {
    providers: [


        Credentials({

            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log(credentials)
                try {
                    const response = await axios.post(
                        process.env.NEXT_PUBLIC_API_URL + "/users/login",
                        {
                            username: credentials.username,
                            password: credentials.password,
                        }
                    );

                    console.log(response)

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
                    console.error("Authorize Error:", error.message || error.response?.data);
                    throw new Error("Error connecting to authentication server");
                }
            },
        })]
} satisfies NextAuthConfig