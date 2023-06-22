import Link from "next/link";
import styles from "@/styles/TopBar.module.css";
import { Carter_One as TitleFont } from "next/font/google";
import classNames from "classnames";
import { useState } from "react";

// Alata
// Anek_Latin
// Archivo
// Alexandria
// Carter_One
// Doppio_One
// Mina
// Trade_Winds
// Rubik_Marker_Hatch
// Rubik_Glitch

const titleFont = TitleFont({ weight: "400", subsets: ["latin"] });

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function TopBar({ sidebarOpen, setSidebarOpen }: Props) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  return (
    <div className={styles.topbar}>
      <button
        id="hamburger"
        onClick={(e) => {
          e.preventDefault();
          setSidebarOpen(!sidebarOpen);
        }}
      />

      <Link
        className={classNames(styles.homelink, titleFont.className)}
        href="/"
      >
        ArthurCose
      </Link>

      <div className={styles.externalLinks}>
        <a
          title="Copy email"
          className={styles.email}
          href="#!"
          onClick={(e) => {
            e.preventDefault();

            navigator.clipboard.writeText("arthurcose@gmail.com").then(() => {
              setCopiedEmail(true);
              setTimeout(() => setCopiedEmail(false), 2000);
            });
          }}
        >
          <div
            className={styles.copied}
            style={copiedEmail ? { display: "block" } : undefined}
          >
            Copied to clipboard!
          </div>
        </a>

        <Link
          title="LinkedIn"
          className={styles.linkedIn}
          href="https://www.linkedin.com/in/arthurcose/"
        />

        <Link
          title="GitHub"
          className={styles.github}
          href="https://github.com/ArthurCose"
        />
      </div>
    </div>
  );
}
