import Link from "next/link";
import styles from "@/styles/TopBar.module.css";
import { Rubik_Marker_Hatch as TitleFont } from "next/font/google";
import classNames from "classnames";

// Alata
// Anek_Latin
// Archivo
// Alexandria
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
        <Link
          title="GitHub"
          className={styles.github}
          href="https://github.com/ArthurCose"
        />
      </div>
    </div>
  );
}
