import { useState } from "react";
import styles from "@/styles/Gallery.module.css";
import GalleryFullscreen from "@/components/gallery_fullscreen";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece src={"/art/language-dex/icon.svg"} />;
}

const pieceList = [
  "/art/language-dex/icon.svg",
  "/art/language-dex/adaptive-icon.svg",
  "/art/language-dex/Results-4.svg",
  "/art/language-dex/Results-3.svg",
  "/art/language-dex/Results-2.svg",
  "/art/language-dex/Results-1.svg",
  "/art/language-dex/Read.svg",
  "/art/language-dex/Read-o.svg",
  "/art/language-dex/Practice.svg",
  "/art/language-dex/Practice-Drafts.svg",
  "/art/language-dex/Definition-Editor.svg",
  "/art/language-dex/Definition-Editor-o.svg",
  "/art/language-dex/Statistics.svg",
  "/art/language-dex/Cozy.svg",
  "/art/language-dex/Spooky.svg",
  "/art/language-dex/cat-concept.png",
  "/art/language-dex/feature-graphic.png",
  "/art/language-dex/store-icon.png",
  "/art/language-dex/favicon.png",
];

type PieceProps = {
  src: any;
  onClick?: () => void;
};

function Piece({ src, onClick }: PieceProps) {
  return (
    <div className={styles.item_container}>
      <img
        onClick={onClick}
        className={classNames(
          styles.item,
          styles.wide_item,
          styles.language_dex_bg
        )}
        src={src}
      />
    </div>
  );
}

export default function () {
  const [index, setIndex] = useState<number | undefined>(undefined);

  return (
    <>
      <p>
        Drafts and final art for Language Dex. After finding the app was too
        bland and empty, I decided to figure out how to create SVGs using Krita
        to create this cat mascot. She is the "Language Cat", a possible
        alternative name for the app when treated as a pun on Cat-alog.
      </p>

      <br />

      <div className={styles.gallery}>
        {pieceList.map((src, i) => (
          <Piece key={i} src={src} onClick={() => setIndex(i)} />
        ))}
      </div>

      <GalleryFullscreen
        index={index}
        setIndex={setIndex}
        totalItems={pieceList.length}
        renderItem={(i) => (
          <Piece key={i} src={pieceList[i]} onClick={() => setIndex(i)} />
        )}
      />
    </>
  );
}
