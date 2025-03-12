import { useState } from "react";
import styles from "@/styles/Gallery.module.css";
import GalleryFullscreen from "@/components/gallery_fullscreen";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece svg={"/art/language-dex/Read.svg"} />;
}

const pieceList = [
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
];

type PieceProps = {
  svg: any;
  onClick?: () => void;
};

function Piece({ svg, onClick }: PieceProps) {
  return (
    <div className={styles.item_container}>
      <img
        onClick={onClick}
        className={classNames(
          styles.item,
          styles.wide_item,
          styles.language_dex_bg
        )}
        src={svg}
      />
    </div>
  );
}

export default function HubOsBackgrounds() {
  const [index, setIndex] = useState<number | undefined>(undefined);

  return (
    <>
      <p>
        Drafts and final custom art for Language Dex. After finding the app was
        too bland and empty, I decided to figure out how to create SVGs using
        Krita to create this cat mascot. She is the "Language Cat", a pun on
        Cat-alog and a possible alternative name for the app.
      </p>

      <br />

      <div className={styles.gallery}>
        {pieceList.map((svg, i) => (
          <Piece key={i} svg={svg} onClick={() => setIndex(i)} />
        ))}
      </div>

      <GalleryFullscreen
        index={index}
        setIndex={setIndex}
        totalItems={pieceList.length}
        renderItem={(i) => (
          <Piece key={i} svg={pieceList[i]} onClick={() => setIndex(i)} />
        )}
      />
    </>
  );
}
