import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const login = async (credentials) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: credentials.username
            }
        })
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordCorrect) {
            throw new Error("Invalid password");
        }

        return user
    }
    catch (err) {
        console.error(err)
        throw new Error("An error occurred while logging in");
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                }
                catch (err) {
                    console.error(err)
                    return null;
                }
            },
        }),
    ],
});