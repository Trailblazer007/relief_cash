import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Ubuntu } from "next/font/google";

const poppins = Ubuntu({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={cn(poppins.className, "mx-auto w-full max-w-7xl")}>
      <Component {...pageProps} />
    </main>
  );
}
