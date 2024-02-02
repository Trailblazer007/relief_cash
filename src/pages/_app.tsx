import { Toaster } from "@/components/ui/sonner";
import { AuthStateChanged } from "@/lib/auth/auth-state-changed";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Ubuntu } from "next/font/google";
import Head from "next/head";
import { Fragment } from "react";

const poppins = Ubuntu({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta name="title" content={`Relief | ${process.env.BASE_URL}`} />
        <link rel="icon" href="/logo.png" />

        <meta
          key="og:url"
          property="og:url"
          content={`${process.env.BASE_URL}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta
          key="og:description"
          property="og:description"
          content="Track your employees"
        />
        <meta
          key="og:image"
          property="og:image"
          content={`${process.env.BASE_URL}/logo.png`}
        />
        <meta property="og:URL" content={process.env.BASE_URL} />
        <meta property="og:type" content="website" />
      </Head>
      <SessionProvider session={session}>
        <AuthStateChanged>
          <main className={cn(poppins.className, "mx-auto w-full max-w-7xl")}>
            <Component {...pageProps} />

            <Toaster />
          </main>
        </AuthStateChanged>
      </SessionProvider>
    </Fragment>
  );
}
