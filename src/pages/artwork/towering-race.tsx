import { useState } from "react";
import styles from "@/styles/Gallery.module.css";
import GalleryFullscreen from "@/components/gallery_fullscreen";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece src={"/art/towering-race/screenshot-2.png"} />;
}

const pieceList = [
  { src: "/art/towering-race/screenshot-1.png", wide: true },
  { src: "/art/towering-race/screenshot-2.png", wide: true },
  { src: "/art/towering-race/spritesheet.png" },
];

type PieceProps = {
  src: any;
  wide?: boolean;
  onClick?: () => void;
};

function Piece({ src, wide, onClick }: PieceProps) {
  return (
    <div className={styles.item_container}>
      <img
        onClick={onClick}
        className={classNames(
          styles.item,
          wide ? styles.wide_item : styles.tall_item,
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
        Some screenshots and art from a game I made in class around 2014. It's
        not online anywhere since... It's not that good. I might put it up
        somewhere eventually for the sake of preserving my own history and to
        showcase my progress, but for now this page will suffice.
      </p>

      <br />

      <div className={styles.gallery}>
        {pieceList.map((data, i) => (
          <Piece key={i} {...data} onClick={() => setIndex(i)} />
        ))}
      </div>

      <GalleryFullscreen
        index={index}
        setIndex={setIndex}
        totalItems={pieceList.length}
        renderItem={(i) => (
          <Piece key={i} {...pieceList[i]} onClick={() => setIndex(i)} />
        )}
      />
    </>
  );
}
