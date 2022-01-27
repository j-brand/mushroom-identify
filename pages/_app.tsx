import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import Head from "next/head";
import { HistoryContextProvider } from "../store/history-context";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import AuthGuard from "../components/authGuard";
import { NotificationContextProvider } from "../store/notification-context";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === "/login") {
    return (
      <SessionProvider>
        <NotificationContextProvider>
          <Head>
            <meta httpEquiv="Content-Language" content="de" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>

          <Component {...pageProps} />
        </NotificationContextProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <AuthGuard>
        <HistoryContextProvider>
          <Layout>
            <Head>
              <meta httpEquiv="Content-Language" content="de" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </HistoryContextProvider>
      </AuthGuard>
    </SessionProvider>
  );
}

export default App;
