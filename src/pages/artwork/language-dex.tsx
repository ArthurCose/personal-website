import { MouseEventHandler } from "react";
import styles from "@/styles/Gallery.module.css";
import Gallery from "@/components/gallery";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece src={"/art/language-dex/icon.svg"} />;
}

const pieceList = [
  "/art/language-dex/Statistics-Practice.svg",
  "/art/language-dex/Statistics-Read.svg",
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
  onClick?: MouseEventHandler;
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
  return (
    <>
      <p>
        Final art and drafts for Language Dex. After finding the app was too
        bland and empty, I decided to learn how to create SVGs in Krita to
        create this mascot. She is the "Language Cat", which can also be an
        alternative name for the app when treated as a pun on Cat-alog.
      </p>

      <br />

      <Gallery
        totalItems={pieceList.length}
        renderListItem={(i, onClick) => (
          <Piece key={i} src={pieceList[i]} onClick={onClick} />
        )}
        renderFullscreenItem={(i) => <Piece key={i} src={pieceList[i]} />}
      />
    </>
  );
}
