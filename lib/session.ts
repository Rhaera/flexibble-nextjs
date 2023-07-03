import { getServerSession } from "next-auth/next"
import { NextAuthOptions, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import jsonwebtoken from "jsonwebtoken"
import { JWT } from "next-auth/jwt"
import { SessionInterface, UserProfile } from "@/common.types"
import { getUser, postUser } from "./actions"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_PROVIDER_ID!,
            clientSecret: process.env.GOOGLE_PROVIDER_SECRET!
        })
    ],
    jwt: {
        encode: ({ secret, token }) => {
            const encoded = jsonwebtoken.sign({
                ...token,
                iss: 'grafbase',
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            }, secret)
            return encoded
        },
        decode: async ({ secret, token }) => {
            const decoded = jsonwebtoken.verify(token!, secret) as JWT
            return decoded
        }
    },
    theme: {
        colorScheme: "light",
        logo: "/logo.svg"
    },
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string
            try {
                const data = await getUser(email) as { user?: UserProfile }
                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user
                    }
                }
                return newSession
            } catch (err: any) {
                console.log("Error retrieving user data.", err)
                return session
            }
        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                const userExists = await getUser(user?.email as string) as { user?: UserProfile }
                if (!userExists.user) {
                    await postUser(
                        user.name as string,
                        user.email as string,
                        user.image as string
                    )
                }
                return true
            } catch (err: any) {
                return false
            }
        }
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface
    return session
}
