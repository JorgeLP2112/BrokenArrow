import { SidebarProvider } from "@/context/SidebarContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </SessionProvider>
  )
}
