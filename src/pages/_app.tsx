import type { AppProps } from "next/app";
import { useState } from "react";
import Head from "next/head";
import { NavigationGuardProvider } from "next-navigation-guard";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import BSOD from "@/components/designs/bsod";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);
  const [reduceAnimations, setReduceAnimations] = useState(false);

  return (
    <NavigationGuardProvider>
      <Head>
        <title>ArthurCose</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <TopBar sidebarOpen={open} setSidebarOpen={setOpen} />

      <div id="app-container">
        <Sidebar
          open={open}
          setOpen={setOpen}
          reduceAnimations={reduceAnimations}
          setReduceAnimations={setReduceAnimations}
        />

        <div id="main-content" onClick={() => setOpen(false)}>
          <Component {...pageProps} />
        </div>
      </div>

      <BSOD reduceAnimations={reduceAnimations} />
    </NavigationGuardProvider>
  );
}
