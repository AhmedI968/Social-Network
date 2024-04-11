import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './authconfig';
import { prisma } from '../lib/script';
import bcrypt from 'bcrypt';

const login = async (credentials) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: credentials.username
            }
        })
        if (!user) {
            throw new Error('No user found')
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
            throw new Error('Invalid credentials')
        }

        return user
    } catch (err) {
        console.error(err);
        throw new Error('Invalid credentials');
    }
}


export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                }
                catch (err) {
                    return null;

                }
            },
        }),
    ],
})
