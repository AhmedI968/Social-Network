import {AppProps} from "next/app";
import Layout from "@/app/layout";



function MyApp({ Component, pageProps }: MyAppProps) {
    const { session } = pageProps;
    return (
        <Layout session={session}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
