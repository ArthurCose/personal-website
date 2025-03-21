import styles from "@/styles/Gallery.module.css";
import { PreviewComponent as LanguageDexPreviewComponent } from "./language-dex";
import { PreviewComponent as HubOsPreviewComponent } from "./honse-backgrounds";
import { PreviewComponent as BlissfulCowboyPreviewComponent } from "./blissful-cowboy";
import { PreviewComponent as ToweringRacePreviewComponent } from "./towering-race";
import { PreviewComponent as BlackFiskPreviewComponent } from "./blackfisk";
import Link from "next/link";

export default function () {
  return (
    <>
      <p>
        An archive for miscellaneous art I've made for various projects or
        personal purposes.
      </p>

      <br />

      <div className={styles.gallery}>
        <Link href="/artwork/language-dex">
          <LanguageDexPreviewComponent />
        </Link>

        <Link href="/artwork/honse-backgrounds">
          <HubOsPreviewComponent />
        </Link>

        <Link href="/artwork/blissful-cowboy">
          <BlissfulCowboyPreviewComponent />
        </Link>

        <Link href="/artwork/blackfisk">
          <BlackFiskPreviewComponent />
        </Link>

        <Link href="/artwork/towering-race">
          <ToweringRacePreviewComponent />
        </Link>
      </div>
    </>
  );
}
