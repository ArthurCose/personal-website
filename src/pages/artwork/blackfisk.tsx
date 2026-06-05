import { MouseEventHandler } from "react";
import styles from "@/styles/Gallery.module.css";
import Gallery from "@/components/gallery";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece src={"/art/blackfisk/icon.ico"} />;
}

const pieceList = [
  { src: "/art/blackfisk/Squid.png" },
  { src: "/art/blackfisk/Cat.png" },
  { src: "/art/blackfisk/Dori.png" },
  { src: "/art/blackfisk/Ebola.png" },
  { src: "/art/blackfisk/Cube.png" },
  { src: "/art/blackfisk/Player.png" },
  { src: "/art/blackfisk/PlayerSmall.png" },
  { src: "/art/blackfisk/Fisk.png" },
  { src: "/art/blackfisk/Background.png" },
  { src: "/art/blackfisk/Explosion.png" },
  { src: "/art/blackfisk/icon.ico" },
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
        className={classNames(styles.item, styles.language_dex_bg)}
        src={src}
      />
    </div>
  );
}

export default function () {
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

      <Gallery
        totalItems={pieceList.length}
        renderListItem={(i, onClick) => (
          <Piece key={i} {...pieceList[i]} onClick={onClick} />
        )}
        renderFullscreenItem={(i) => <Piece key={i} {...pieceList[i]} />}
      />
    </>
  );
}
