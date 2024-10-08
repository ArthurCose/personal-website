import type { AppProps } from "next/app";
import { useState } from "react";
import Head from "next/head";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import Depth from "@/components/designs/depth";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>ArthurCose</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <TopBar sidebarOpen={open} setSidebarOpen={setOpen} />

      <div id="app-container">
        <Sidebar open={open} setOpen={setOpen} />

        <div id="main-content" onClick={() => setOpen(false)}>
          <Component {...pageProps} />
        </div>
      </div>

      <Depth />
    </>
  );
}
