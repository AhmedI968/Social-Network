import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/script";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username as string
                    }
                });
                if (user && bcrypt.compareSync(credentials.password as string, user.password)) {
                    return { id: user.user_id, name: user.username };
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.name;
            }
            return token;
        },
        async session({session, token}: { session: any, token: JWT}) {
            if (session.user) {
                session.user.name = token.username;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
    },
    secret: process.env.SECRET,
});
