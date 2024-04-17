import { AppProps } from "next/app";
import Layout from "@/app/layout";
import RootLayout from "@/app/layout";
import { useEffect, useState } from "react";
import { SessionProvider, getSession } from "next-auth/react";
import { Session } from "next-auth";

function MyApp({ Component, pageProps }: AppProps) {

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            setSession(session);
        };

        fetchData();
    }, []);
    return (
        <SessionProvider session={session}>
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        </SessionProvider>
    );
}

export default MyApp;