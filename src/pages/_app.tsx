import type { AppProps } from "next/app";
import { useState } from "react";
import Head from "next/head";
import { NavigationGuardProvider } from "next-navigation-guard";
import { AnimatePresence, motion } from "motion/react";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import BSOD from "@/components/designs/bsod";
import "@/styles/globals.css";

// temp fix for https://github.com/vercel/next.js/issues/49279
import "@/styles/Project.module.css";
import "@/styles/Gallery.module.css";
import "@/styles/Licenses.module.css";

const pageTransitions = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, position: "absolute" },
};

export default function App({ Component, pageProps, router }: AppProps) {
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
          <AnimatePresence>
            <motion.div
              key={router.pathname}
              {...(reduceAnimations ? undefined : pageTransitions)}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <BSOD reduceAnimations={reduceAnimations} />
    </NavigationGuardProvider>
  );
}
