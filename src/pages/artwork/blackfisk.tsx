import { useState } from "react";
import styles from "@/styles/Gallery.module.css";
import GalleryFullscreen from "@/components/gallery_fullscreen";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece src={"/art/blackfisk/icon.ico"} />;
}

const pieceList = [
  { src: "/art/blackfisk/Squid.png", wide: true },
  { src: "/art/blackfisk/Cat.png" },
  { src: "/art/blackfisk/Dori.png" },
  { src: "/art/blackfisk/Ebola.png" },
  { src: "/art/blackfisk/Cube.png" },
  { src: "/art/blackfisk/Player.png" },
  { src: "/art/blackfisk/PlayerSmall.png" },
  { src: "/art/blackfisk/Fisk.png" },
  { src: "/art/blackfisk/Background.png", wide: true },
  { src: "/art/blackfisk/Explosion.png", wide: true },
  { src: "/art/blackfisk/BlackFisk.png", wide: true },
  { src: "/art/blackfisk/TeamProva.png", wide: true },
  { src: "/art/blackfisk/icon.ico" },
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
        I participated in Ludum Dare 34 with a friend. We divided up the
        workload so that I'd be on art duty and debug help, while he handled
        most of the programming. The source code for this project is lost, but
        you can still download the game from{" "}
        <a href="https://acerio.itch.io/blackfisk">itch.io</a>.
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
