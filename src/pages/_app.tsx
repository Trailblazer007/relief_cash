import { Toaster } from "@/components/ui/sonner";
import { AuthStateChanged } from "@/lib/auth/auth-state-changed";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Ubuntu } from "next/font/google";

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
    <SessionProvider session={session}>
      <AuthStateChanged>
        <main className={cn(poppins.className, "mx-auto w-full max-w-7xl")}>
          <Component {...pageProps} />

          <Toaster />
        </main>
      </AuthStateChanged>
    </SessionProvider>
  );
}
