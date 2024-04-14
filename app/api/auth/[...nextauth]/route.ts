import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = { user_id: 1, username: 'test', email: 'test@test.com' }
                return user
            }
        })
    ]
}

const handler = NextAuth({
    ...authOptions,
    session: {
        strategy: "jwt",
    },
});
export { handler as GET, handler as POSTs }
