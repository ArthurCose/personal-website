import { useState } from "react";
import styles from "@/styles/Gallery.module.css";
import GalleryFullscreen from "@/components/gallery_fullscreen";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece src={"/art/blissful-cowboy/icon.png"} />;
}

const pieceList = [
  { src: "/art/blissful-cowboy/cowboy.png" },
  { src: "/art/blissful-cowboy/cactus1.png" },
  { src: "/art/blissful-cowboy/cactus2.png" },
  { src: "/art/blissful-cowboy/cactus3.png" },
  { src: "/art/blissful-cowboy/scorpion.png", wide: true },
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
        Art for a game that never came to be. This was something I worked on for
        the fun of making a game with a friend, but life got in the way for the
        both of us. The project was named "BlissfulCowboy".
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
