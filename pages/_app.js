import { SidebarProvider } from "@/context/SidebarContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <SidebarProvider>
        <Head>
          <title>JKB Jobs</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </SidebarProvider>
    </SessionProvider>
  );
}
